import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { heroSlides } from "../data/products";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  function go(next) {
    setDirection(next > index || (index === heroSlides.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  }

  const slide = heroSlides[index];
  const isInternalLink = slide.link?.startsWith("/");
  const SlideLink = isInternalLink ? Link : "a";
  const linkProps = isInternalLink ? { to: slide.link } : { href: slide.link || "#" };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-gutter py-space-md">
      <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden bg-primary-container text-on-primary flex items-center shadow-xl">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <SlideLink {...linkProps} className="block w-full h-full">
              <img
                src={slide.image}
                alt={slide.alt || ""}
                className="w-full h-full object-cover"
              />
            </SlideLink>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => go((index - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface/20 hover:bg-surface/40 text-on-primary p-space-sm rounded-full backdrop-blur-md transition-colors z-20"
          aria-label="Previous slide"
        >
          <Icon name="chevron_left" />
        </button>
        <button
          onClick={() => go((index + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface/20 hover:bg-surface/40 text-on-primary p-space-sm rounded-full backdrop-blur-md transition-colors z-20"
          aria-label="Next slide"
        >
          <Icon name="chevron_right" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-space-xs z-20">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-secondary" : "w-2 bg-surface/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
