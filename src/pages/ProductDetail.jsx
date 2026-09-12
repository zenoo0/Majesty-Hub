import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../components/Icon";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";
import AnimatedSection from "../components/AnimatedSection";
import { useCart } from "../context/CartContext";
import { getProductById, getRelatedProducts } from "../data/products";
import { getCategorySlugByName } from "../data/categories";

function formatDeliveryDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = useMemo(() => getProductById(id), [id]);
  const related = useMemo(() => getRelatedProducts(product, 4), [product]);

  const [mainImage, setMainImage] = useState(0);
  const [color, setColor] = useState(product?.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-space-xl text-center flex flex-col items-center gap-space-md">
        <Icon name="search_off" className="text-6xl text-on-surface-variant" />
        <h1 className="font-headline text-2xl font-bold text-on-surface">Product not found</h1>
        <p className="text-on-surface-variant">
          We couldn't find that product. It may have sold out or moved.
        </p>
        <Link to="/" className="bg-primary text-on-primary px-space-lg py-space-sm rounded-full font-medium">
          Back to Home
        </Link>
      </div>
    );
  }

  const discount =
    product.discount ||
    (product.originalPrice
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : null);

  const images = product.images?.length ? product.images : [product.image];
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.reviewsList?.length || 0})` },
    { id: "qa", label: `Q&A (${product.qa?.length || 0})` },
  ];

  function handleCartItem() {
    return {
      id: product.id,
      brand: product.brand,
      title: product.title,
      variant: color ? `Color: ${color}` : undefined,
      price: product.price,
      originalPrice: product.originalPrice,
      image: images[0],
    };
  }

  function handleAddToCart() {
    addItem(handleCartItem(), qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleBuyNow() {
    addItem(handleCartItem(), qty);
    navigate("/cart");
  }

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-md w-full flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm text-sm text-on-surface-variant">
        <div className="flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:underline">Home</Link>
          {product.category.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-outline">›</span>
              {i === product.category.length - 1 ? (
                <span className="text-on-surface font-medium">{crumb}</span>
              ) : i === 0 && getCategorySlugByName(crumb) ? (
                <Link to={`/category/${getCategorySlugByName(crumb)}`} className="hover:underline">
                  {crumb}
                </Link>
              ) : (
                <span>{crumb}</span>
              )}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-space-md shrink-0">
          <button className="flex items-center gap-space-xs hover:text-on-surface transition-colors">
            <Icon name="share" className="text-sm" /> Share
          </button>
          <button
            onClick={() => setWishlisted((v) => !v)}
            className="flex items-center gap-space-xs hover:text-on-surface transition-colors"
          >
            <Icon name="favorite" fill={wishlisted} className={`text-sm ${wishlisted ? "text-error" : ""}`} />
            {wishlisted ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 md:px-gutter pb-space-xl w-full grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Gallery */}
        <div className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-36">
          <motion.div
            layout
            className="relative w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden group shadow-sm"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={images[mainImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 origin-center cursor-crosshair"
              />
            </AnimatePresence>
            {discount ? (
              <div className="absolute top-space-md left-space-md bg-secondary text-on-secondary px-space-md py-space-xs rounded-full text-xs font-bold">
                {discount}% OFF
              </div>
            ) : null}
          </motion.div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-space-md">
              {images.map((image, i) => (
                <button
                  key={image + i}
                  onClick={() => setMainImage(i)}
                  className={`aspect-square bg-surface-container-low rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === i
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-outline"
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: title, bullets, description */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="text-sm text-secondary font-bold hover:underline w-max cursor-pointer">
              {product.brand}
            </span>
            <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface leading-snug">
              {product.title}
            </h1>
            <div className="flex items-center gap-space-sm mt-space-xs">
              <StarRating rating={product.rating} />
              <span className="text-base font-bold text-on-surface">{product.rating}</span>
              <a href="#reviews" className="text-sm text-on-surface-variant hover:underline">
                ({product.reviews.toLocaleString()} ratings)
              </a>
            </div>
          </div>

          <div className="border-t border-b border-surface-variant py-space-md flex items-baseline gap-space-md tabular-nums">
            <span className="font-headline text-2xl md:text-3xl text-on-surface">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-on-surface-variant line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount ? (
              <span className="bg-error-container text-on-error-container px-space-sm py-0.5 rounded text-xs font-bold">
                Save {discount}%
              </span>
            ) : null}
          </div>

          {product.colors?.length ? (
            <div className="flex flex-col gap-space-sm">
              <label className="text-sm font-bold text-on-surface">
                Color: <span className="font-normal text-on-surface-variant">{color}</span>
              </label>
              <div className="flex items-center gap-space-sm flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-space-md py-space-xs rounded-lg text-sm border transition-all ${
                      color === c
                        ? "border-primary bg-primary text-on-primary"
                        : "border-outline-variant text-on-surface hover:border-outline"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h3 className="font-headline text-base font-bold text-on-surface mb-space-sm">About this item</h3>
            <ul className="flex flex-col gap-space-sm text-sm text-on-surface-variant list-disc pl-5">
              {product.bullets?.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Buy box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-3 flex flex-col gap-space-md bg-surface-container-lowest border border-surface-variant rounded-xl p-space-lg shadow-sm lg:sticky lg:top-36"
        >
          <div className="flex items-baseline gap-space-sm tabular-nums">
            <span className="font-headline text-2xl text-primary">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex items-start gap-space-xs text-xs text-on-surface-variant">
            <Icon name="local_shipping" className="text-sm mt-0.5" />
            <span>
              FREE Shipping on orders over $35. Delivery{" "}
              <strong className="text-on-surface">{formatDeliveryDate(5)}</strong>.
            </span>
          </div>
          <div className="flex items-center gap-space-xs text-xs text-on-surface-variant">
            <Icon name="location_on" className="text-sm" />
            <span>
              Deliver to <strong className="text-on-surface">New York 10001</strong>
            </span>
          </div>

          <div className="flex items-center gap-space-xs text-on-tertiary-container font-medium text-sm">
            <Icon name="check_circle" className="text-sm" />
            <span>In Stock</span>
          </div>

          <div className="flex items-center gap-space-md">
            <span className="text-sm text-on-surface-variant">Quantity:</span>
            <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
              <button
                className="px-space-md py-space-xs text-on-surface hover:bg-surface-container transition-colors"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-space-md font-bold text-sm">{qty}</span>
              <button
                className="px-space-md py-space-xs text-on-surface hover:bg-surface-container transition-colors"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`w-full py-space-sm px-space-lg rounded-full font-bold transition-colors flex items-center justify-center gap-space-sm ${
              added
                ? "bg-tertiary-container text-on-tertiary-container"
                : "bg-secondary-container text-on-secondary-container hover:brightness-105"
            }`}
          >
            <Icon name={added ? "check" : "shopping_cart"} />
            {added ? "Added to Cart!" : "Add to Cart"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleBuyNow}
            className="w-full bg-primary text-on-primary py-space-sm px-space-lg rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-space-sm"
          >
            <Icon name="bolt" /> Buy Now
          </motion.button>

          <div className="flex flex-col gap-space-sm pt-space-md border-t border-surface-variant text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Ships from</span>
              <span className="text-on-surface font-medium">{product.shipsFrom || "Amazon"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Sold by</span>
              <span className="text-on-surface font-medium">{product.soldBy || product.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Returns</span>
              <span className="text-on-surface font-medium text-right">30-day refund / replacement</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Payment</span>
              <span className="text-on-surface font-medium">Secure transaction</span>
            </div>
          </div>

          <button
            onClick={() => setWishlisted((v) => !v)}
            className="w-full border border-outline-variant text-on-surface py-space-sm rounded-full text-sm font-medium hover:bg-surface-container transition-colors flex items-center justify-center gap-space-xs"
          >
            <Icon name="favorite" fill={wishlisted} className={wishlisted ? "text-error" : ""} />
            {wishlisted ? "Added to List" : "Add to List"}
          </button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="w-full bg-surface-container-low py-space-xl" id="reviews">
        <div className="max-w-7xl mx-auto px-4 md:px-gutter flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-lg border-b border-surface-variant overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-space-md font-headline text-sm md:text-base font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-on-surface-variant border-transparent hover:text-on-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "description" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl items-center">
                  <div className="flex flex-col gap-space-md">
                    <h3 className="font-headline text-lg font-semibold text-on-surface">
                      Product Overview
                    </h3>
                    <p className="text-base text-on-surface-variant">{product.description}</p>
                  </div>
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-surface-container">
                    <img
                      src={images[1] || images[0]}
                      alt="Product detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="flex flex-col gap-space-md">
                  <h3 className="font-headline text-lg font-semibold text-on-surface">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md bg-surface p-space-lg rounded-xl shadow-sm">
                    {product.specs?.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between py-space-sm border-b border-surface-variant gap-space-md"
                      >
                        <span className="font-bold text-on-surface-variant text-sm">{label}</span>
                        <span className="text-on-surface text-sm text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="flex flex-col gap-space-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline text-lg font-semibold text-on-surface">
                      Customer Reviews
                    </h3>
                    <button className="bg-primary text-on-primary px-space-md py-space-sm rounded-lg text-sm font-bold">
                      Write a Review
                    </button>
                  </div>
                  {product.reviewsList?.length ? (
                    <div className="flex flex-col gap-space-md">
                      {product.reviewsList.map((r) => (
                        <div
                          key={r.name}
                          className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col gap-space-xs"
                        >
                          <div className="flex items-center justify-between">
                            <StarRating rating={r.rating} />
                            <span className="text-sm text-on-surface-variant">{r.time}</span>
                          </div>
                          <h4 className="font-headline text-base font-semibold text-on-surface">
                            {r.title}
                          </h4>
                          <p className="text-sm text-on-surface-variant">{r.text}</p>
                          <span className="text-xs text-on-surface-variant font-medium mt-space-xs">
                            — {r.name} (Verified Buyer)
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-on-surface-variant">No reviews yet — be the first to review this product.</p>
                  )}
                </div>
              )}

              {activeTab === "qa" && (
                <div className="flex flex-col gap-space-lg">
                  <h3 className="font-headline text-lg font-semibold text-on-surface">
                    Questions & Answers
                  </h3>
                  {product.qa?.length ? (
                    <div className="flex flex-col gap-space-md">
                      {product.qa.map((item) => (
                        <div
                          key={item.q}
                          className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col gap-space-xs"
                        >
                          <span className="text-sm font-bold text-secondary">Q: {item.q}</span>
                          <p className="text-sm text-on-surface-variant">A: {item.a}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-on-surface-variant">No questions yet — ask the first one.</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <AnimatedSection className="max-w-7xl mx-auto px-4 md:px-gutter py-space-xl w-full flex flex-col gap-space-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
              Related Products
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
