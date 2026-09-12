import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import AnimatedSection from "../components/AnimatedSection";
import { categories, getCategory } from "../data/categories";
import { getProductsByCategory } from "../data/products";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);
  const [sortBy, setSortBy] = useState("featured");

  const products = useMemo(() => {
    if (!category) return [];
    const list = [...getProductsByCategory(category.name)];
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, sortBy]);

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-space-xl text-center flex flex-col items-center gap-space-md">
        <Icon name="search_off" className="text-6xl text-on-surface-variant" />
        <h1 className="font-headline text-2xl font-bold text-on-surface">Category not found</h1>
        <Link to="/" className="bg-primary text-on-primary px-space-lg py-space-sm rounded-full font-medium">
          Back to Home
        </Link>
      </div>
    );
  }

  const CatIcon = category.icon;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-surface-container-low border-b border-surface-variant">
        <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-xl flex items-center gap-space-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${category.color}1a`, color: category.color }}
          >
            <CatIcon size={32} strokeWidth={1.75} />
          </motion.div>
          <div>
            <p className="text-sm text-on-surface-variant">
              <Link to="/" className="hover:underline">Home</Link> › {category.name}
            </p>
            <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
              {category.name}
            </h1>
            <p className="text-sm text-on-surface-variant mt-space-xs">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      </div>

      {/* Other departments quick nav */}
      <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-md w-full overflow-x-auto">
        <div className="flex items-center gap-space-sm">
          {categories.map((c) => {
            const Icn = c.icon;
            const active = c.slug === slug;
            return (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full text-sm whitespace-nowrap transition-colors ${
                  active
                    ? "bg-primary text-on-primary font-semibold"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                <Icn size={16} /> {c.name}
              </Link>
            );
          })}
        </div>
      </div>

      <AnimatedSection className="max-w-7xl mx-auto px-4 md:px-gutter py-space-lg w-full flex flex-col gap-space-lg">
        {products.length > 0 && (
          <div className="flex justify-end">
            <div className="flex items-center bg-surface-container-low px-space-md py-space-sm rounded-lg text-sm">
              <span className="text-on-surface-variant mr-space-xs">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-on-surface focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
            </div>
          </div>
        )}

        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-space-md py-space-xl text-center">
            <Icon name="inventory_2" className="text-6xl text-on-surface-variant" />
            <p className="text-on-surface-variant">No products in this department yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
