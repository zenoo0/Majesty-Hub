import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import AnimatedSection from "../components/AnimatedSection";
import { techHubProducts } from "../data/products";

const INITIAL_VISIBLE = 6;

const TABS = [
  { id: "all", label: "All Products (248)" },
  { id: "new", label: "New Arrivals" },
  { id: "bestsellers", label: "Best Sellers" },
  { id: "sale", label: "Flash Sale (-35%)" },
];

const BANNER_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYrR9YwpTQD2czd-v_3DPRvYUb7MwIjY87J1drh_mnpOdMgfJE1lWvSSECU3aBBottDWdZedUQoD1r6kIIbka5iTRaSHJGoqCUYl7XtY45XaIdmLj-PtJg8bjwknQv3RWC-yasWewewuMiZ0V2l3QCyh3kqS6GLjS-UWf48jlXmoETWW3meY3B5vhuWLZI6J1FuxeQN6YoCGV9M-t8Oy3cnT5lJvJxXI7NOjAL1YazGU_E_kAYXuKmww";

export default function BrandStore() {
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [filters, setFilters] = useState({
    audio: true,
    smartHome: true,
    desktop: false,
    power: false,
  });

  function toggleFilter(key) {
    setFilters((f) => ({ ...f, [key]: !f[key] }));
  }

  return (
    <div className="flex flex-col w-full">
      {/* Brand banner */}
      <div
        className="relative w-full h-[340px] md:h-[420px] bg-cover bg-center overflow-hidden flex items-end"
        style={{ backgroundImage: `url('${BANNER_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        <div className="max-w-7xl mx-auto w-full px-4 md:px-gutter pb-space-lg relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-space-lg">
          <div className="flex items-end gap-space-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-20 h-20 md:w-28 md:h-28 bg-surface rounded-xl p-2 shadow-2xl flex items-center justify-center -mb-2 md:mb-0"
            >
              <div className="w-full h-full bg-primary-container rounded-lg flex items-center justify-center text-on-primary font-headline text-xl font-bold">
                TH
              </div>
            </motion.div>
            <div className="flex flex-col text-on-primary">
              <div className="flex items-center gap-space-sm">
                <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
                  TechHub Official Store
                </h1>
                <Icon name="verified" fill className="text-secondary-container text-xl" />
              </div>
              <p className="text-sm text-primary-fixed-dim mt-space-xs max-w-md">
                Next-gen consumer electronics, smart home ecosystems, and precision audio.
              </p>
              <div className="flex flex-wrap items-center gap-space-md mt-space-sm text-sm">
                <span className="flex items-center gap-1 text-secondary-container font-bold">
                  <Icon name="star" fill className="text-sm" /> 4.9 (48.2k reviews)
                </span>
                <span>•</span>
                <span>1.2M Followers</span>
                <span>•</span>
                <span className="text-tertiary-fixed-dim">99.4% Positive Feedback</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFollowing((v) => !v)}
              className={`px-space-lg py-space-sm rounded-full font-medium transition-colors flex items-center gap-space-xs shadow-lg ${
                following
                  ? "bg-primary text-on-primary"
                  : "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed"
              }`}
            >
              <Icon name={following ? "check" : "add"} className="text-sm" />
              {following ? "Following" : "Follow Brand"}
            </motion.button>
            <button className="bg-surface/10 backdrop-blur-md text-on-primary border border-white/20 p-space-sm rounded-full hover:bg-surface/20 transition-colors">
              <Icon name="share" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-32 z-40 bg-surface/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-gutter flex items-center gap-space-lg overflow-x-auto py-space-md">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-space-md py-space-sm rounded-full font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-xl grid grid-cols-1 lg:grid-cols-4 gap-space-xl">
        {/* Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-space-xl">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
            <h3 className="font-headline text-base font-bold text-on-surface">About TechHub</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Founded in Silicon Valley, TechHub engineers uncompromising audio gear, spatial
              computing accessories, and minimalist desktop setups designed for modern creators and
              professionals.
            </p>
            <a className="text-sm font-medium text-primary hover:underline flex items-center gap-1" href="#">
              Read full brand manifesto <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>

          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
            <h3 className="font-headline text-base font-bold text-on-surface">Store Policies</h3>
            <div className="flex flex-col gap-space-md text-sm text-on-surface-variant">
              {[
                ["local_shipping", "Free Express Delivery", "Guaranteed 2-day delivery on orders over $50 fulfilled by Majestic Hub."],
                ["assignment_return", "30-Day Hassle-Free Returns", "Full refunds with free drop-off at any Majestic Supercenter location."],
                ["shield", "2-Year Warranty", "Direct manufacturer replacement coverage included with every purchase."],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex items-start gap-space-sm">
                  <Icon name={icon} className="text-secondary mt-0.5" />
                  <div>
                    <strong className="text-on-surface block">{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
            <h3 className="font-headline text-base font-bold text-on-surface">Filter Categories</h3>
            <div className="flex flex-col gap-space-xs text-sm text-on-surface-variant">
              {[
                ["audio", "Audio & Headphones (94)"],
                ["smartHome", "Smart Home & Hubs (62)"],
                ["desktop", "Desktop & Peripherals (45)"],
                ["power", "Power & Charging (47)"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-space-sm cursor-pointer hover:text-on-surface">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => toggleFilter(key)}
                    className="accent-primary rounded"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="lg:col-span-3 flex flex-col gap-space-lg">
          <div className="flex justify-between items-center flex-wrap gap-space-sm">
            <p className="text-sm text-on-surface-variant">
              Showing <strong className="text-on-surface">1–{showMore ? techHubProducts.length : Math.min(INITIAL_VISIBLE, techHubProducts.length)}</strong> of {techHubProducts.length} products
            </p>
            <div className="flex items-center gap-space-sm">
              <span className="text-sm text-on-surface-variant">Sort by:</span>
              <select className="bg-surface-container-low text-on-surface text-sm px-space-md py-space-xs rounded-lg focus:outline-none">
                <option>Featured Recommendations</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Customer Rating</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
            {(showMore ? techHubProducts : techHubProducts.slice(0, INITIAL_VISIBLE)).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <div className="flex justify-center items-center py-space-lg">
            {!showMore && techHubProducts.length > INITIAL_VISIBLE && (
              <button
                onClick={() => setShowMore(true)}
                className="bg-surface-container-low text-on-surface hover:bg-surface-container-high px-space-xl py-space-md rounded-full font-medium transition-colors shadow-sm"
              >
                Load More Products
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
