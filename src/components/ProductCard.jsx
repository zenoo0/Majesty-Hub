import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import StarRating from "./StarRating";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: product.id,
        brand: product.brand,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
      },
      1
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  const discount =
    product.discount ||
    (product.originalPrice
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between relative shadow-sm hover:shadow-lg transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
        {discount ? (
          <span className="absolute top-4 left-4 bg-error text-on-error px-space-sm py-0.5 rounded-full text-xs font-bold z-10">
            -{discount}%
          </span>
        ) : product.badge ? (
          <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-space-sm py-0.5 rounded-full text-xs font-bold z-10">
            {product.badge}
          </span>
        ) : null}
        <div className="w-full aspect-square rounded-lg mb-space-md overflow-hidden bg-surface-container">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div>
          <span className="text-xs text-on-surface-variant uppercase tracking-wide">
            {product.brand}
          </span>
          <h3 className="font-headline text-base font-semibold text-on-surface line-clamp-1 mt-0.5 hover:underline">
            {product.title}
          </h3>
          <div className="mt-space-xs">
            <StarRating rating={product.rating} showCount count={product.reviews} />
          </div>
          <div className="flex items-baseline gap-space-sm mt-space-sm tabular-nums">
            <span className="font-headline text-lg font-bold text-on-surface">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-body-sm text-on-surface-variant line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setWishlisted((v) => !v);
        }}
        className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors z-10"
        aria-label="Add to wishlist"
      >
        <Icon name="favorite" fill={wishlisted} className={wishlisted ? "text-error" : ""} />
      </button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAdd}
        className={`w-full mt-space-md py-space-sm rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-space-xs ${
          justAdded
            ? "bg-tertiary-container text-on-tertiary-container"
            : "bg-primary text-on-primary hover:bg-primary/90"
        }`}
      >
        <Icon name={justAdded ? "check" : "shopping_cart"} className="text-base" />
        {justAdded ? "Added!" : "Add to Cart"}
      </motion.button>
    </motion.div>
  );
}
