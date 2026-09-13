import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../components/Icon";
import HeroCarousel from "../components/HeroCarousel";
import ProductCard from "../components/ProductCard";
import AnimatedSection from "../components/AnimatedSection";
import { categories } from "../data/categories";
import {
  flashDeals,
  featuredProducts,
  partnerBrands,
  dealOfDay,
} from "../data/products";

function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : initialSeconds));
    }, 1000);
    return () => clearInterval(timer);
  }, [initialSeconds]);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return { h, m, s };
}

const BRAND_STYLES = {
  "primary-fixed": "bg-primary-fixed text-on-primary-fixed",
  "secondary-fixed": "bg-secondary-fixed text-on-secondary-fixed",
  "surface-container-highest": "bg-surface-container-highest text-on-surface",
  "primary-container": "bg-primary-container text-on-primary",
  "tertiary-fixed": "bg-tertiary-fixed text-on-tertiary-fixed",
};

export default function Home() {
  const countdown = useCountdown(2 * 3600 + 45 * 60 + 30);
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("All Categories");

  const sortedFeatured = useMemo(() => {
    const list = [...featuredProducts];
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [sortBy]);

  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />

      {/* Great Sales Promo Banner */}
      <AnimatedSection className="w-full">
        <div className="w-full bg-gradient-to-r from-error via-error to-secondary text-on-error relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg relative z-10">
            <div className="flex flex-col gap-space-sm text-center lg:text-left">
              <span className="inline-flex items-center gap-space-xs self-center lg:self-start bg-surface/20 backdrop-blur-sm px-space-md py-space-xs rounded-full text-xs font-bold uppercase tracking-wider w-max mx-auto lg:mx-0">
                <Icon name="sell" className="text-sm" /> Storewide Event
              </span>
              <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                The Great Sales by Majesty Hub
              </h2>
              <p className="text-sm md:text-base text-on-error/90 max-w-xl">
                Doorbuster prices across electronics, home, apparel & more — the more you shop, the more you save. Limited-time storewide markdowns, refreshed daily.
              </p>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <div className="hidden sm:flex flex-col items-center bg-surface/15 backdrop-blur-sm rounded-xl px-space-lg py-space-md">
                <span className="font-headline text-3xl md:text-4xl font-black">70%</span>
                <span className="text-xs uppercase tracking-wide">Up To Off</span>
              </div>
              <a
                href="#flash-deals"
                className="bg-surface text-on-surface px-space-lg py-space-md rounded-full font-bold hover:brightness-95 transition-all shadow-lg whitespace-nowrap"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Shop by department */}
      <AnimatedSection className="w-full max-w-7xl mx-auto px-4 md:px-gutter py-space-lg">
        <div className="flex justify-between items-center mb-space-md">
          <h2 className="font-headline text-xl font-semibold text-on-surface">
            Shop By Department
          </h2>
          <a className="text-secondary font-medium text-sm hover:underline" href="#">
            View All Departments
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-space-md">
          {categories.map((cat, i) => {
            const CatIcon = cat.icon;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex flex-col items-center p-space-md bg-surface-container-lowest hover:bg-surface-container rounded-xl transition-colors shadow-sm hover:shadow-md group h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 4 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-space-sm transition-transform"
                    style={{ backgroundColor: `${cat.color}1a`, color: cat.color }}
                  >
                    <CatIcon size={26} strokeWidth={1.75} />
                  </motion.div>
                  <span className="text-sm font-medium text-center text-on-surface">{cat.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* Flash Deals */}
      <AnimatedSection className="w-full max-w-7xl mx-auto px-4 md:px-gutter py-space-lg" id="flash-deals">
        <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-space-lg gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="bg-error text-on-error p-space-sm rounded-xl">
                <Icon name="bolt" />
              </div>
              <div>
                <h2 className="font-headline text-xl font-semibold text-on-surface">Flash Deals</h2>
                <p className="text-sm text-on-surface-variant">Limited quantities, rapid savings</p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm bg-surface px-space-md py-space-sm rounded-xl shadow-sm">
              <span className="text-sm font-medium text-on-surface-variant">Ends in:</span>
              <div className="flex gap-space-xs font-mono font-bold text-error tabular-nums">
                <span className="bg-error-container px-space-xs py-0.5 rounded">{countdown.h}</span>:
                <span className="bg-error-container px-space-xs py-0.5 rounded">{countdown.m}</span>:
                <span className="bg-error-container px-space-xs py-0.5 rounded">{countdown.s}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {flashDeals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Deal of the Day */}
      <AnimatedSection className="w-full max-w-7xl mx-auto px-4 md:px-gutter py-space-lg">
        <div className="bg-primary text-on-primary rounded-2xl p-6 md:p-space-xl flex flex-col lg:flex-row items-center gap-space-xl overflow-hidden relative shadow-xl">
          <div
            className="absolute right-0 top-0 w-1/2 h-full opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: `url('${dealOfDay.image}')` }}
          />
          <div className="flex-1 flex flex-col gap-space-md relative z-10">
            <span className="bg-secondary text-on-secondary px-space-md py-space-xs rounded-full text-xs uppercase tracking-wider font-bold w-max">
              Deal of the Day
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-primary">
              {dealOfDay.title}
            </h2>
            <p className="text-base text-primary-fixed-dim">{dealOfDay.text}</p>
            <div className="flex items-center gap-space-lg my-space-sm tabular-nums">
              <div>
                <span className="text-sm text-primary-fixed-dim block">Special Price</span>
                <span className="font-headline text-2xl md:text-3xl text-secondary">
                  ${dealOfDay.price.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-sm text-primary-fixed-dim block">List Price</span>
                <span className="font-headline text-xl text-on-primary line-through">
                  ${dealOfDay.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-space-md">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="bg-secondary text-on-secondary px-space-lg py-space-md rounded-full font-medium hover:brightness-110 transition-all shadow-lg flex items-center gap-space-xs"
              >
                <Icon name="shopping_cart" /> Claim This Deal
              </motion.button>
              <span className="text-sm text-tertiary-fixed-dim font-medium flex items-center gap-space-xs">
                <Icon name="local_shipping" className="text-sm" /> Free Express Delivery
              </span>
            </div>
          </div>
          <div className="flex-1 relative z-10 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full aspect-square md:h-80 rounded-xl overflow-hidden shadow-2xl"
            >
              <img src={dealOfDay.image} alt={dealOfDay.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Top Brands */}
      <AnimatedSection className="w-full max-w-7xl mx-auto px-4 md:px-gutter py-space-lg">
        <div className="flex justify-between items-center mb-space-md">
          <h2 className="font-headline text-xl font-semibold text-on-surface">
            Featured Partner Brands
          </h2>
          <a className="text-secondary font-medium text-sm hover:underline" href="#">
            View All Brands
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
          {partnerBrands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-surface-container-lowest p-space-lg rounded-xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-xl mb-space-md font-headline font-bold ${BRAND_STYLES[brand.style]}`}
              >
                {brand.initials}
              </div>
              <h3 className="font-headline text-base font-semibold text-on-surface">{brand.name}</h3>
              <p className="text-sm text-on-surface-variant mb-space-md">
                {brand.followers} Followers • {brand.rating.toFixed(1)} ★
              </p>
              <Link
                to={brand.id === "th" ? "/brand/techhub" : "#"}
                className="w-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface py-space-sm rounded-lg text-sm transition-colors font-medium"
              >
                Follow Brand
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Featured Products */}
      <AnimatedSection className="w-full max-w-7xl mx-auto px-4 md:px-gutter py-space-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-space-lg gap-space-md">
          <h2 className="font-headline text-xl font-semibold text-on-surface">Featured Products</h2>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center bg-surface-container-low px-space-md py-space-sm rounded-lg text-sm">
              <span className="text-on-surface-variant mr-space-xs">Filter:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent font-medium text-on-surface focus:outline-none"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Apparel</option>
                <option>Home</option>
              </select>
            </div>
            <div className="flex items-center bg-surface-container-low px-space-md py-space-sm rounded-lg text-sm">
              <span className="text-on-surface-variant mr-space-xs">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-on-surface focus:outline-none"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {sortedFeatured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
