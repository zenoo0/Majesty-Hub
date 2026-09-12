import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "./Icon";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "All Departments", to: "/" },
  { label: "Groceries", to: "/category/grocery" },
  { label: "Electronics", to: "/category/electronics" },
  { label: "Clothing & Apparel", to: "/category/fashion" },
  { label: "Home & Garden", to: "/category/home-kitchen" },
  { label: "Flash Deals", to: "/", accent: true },
];

export default function Header() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl transition-shadow ${
        scrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.08)]" : "shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      }`}
    >
      <div className="bg-primary text-on-primary px-4 md:px-gutter py-space-xs text-xs flex justify-between items-center">
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-space-xs">
            <Icon name="location_on" className="text-sm" /> Deliver to{" "}
            <strong>New York 10001</strong>
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">Store: Majestic Supercenter #492</span>
        </div>
        <div className="flex items-center gap-space-md">
          <Link to="/brand/techhub" className="hover:underline hidden sm:inline">
            Brand Themes
          </Link>
          <a href="#" className="hover:underline">
            My Account
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-gutter h-20 flex items-center justify-between gap-space-lg">
        <Link to="/" className="flex items-center gap-space-md shrink-0">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-sm">
            MH
          </div>
          <span className="font-headline text-lg md:text-xl font-bold tracking-tight text-primary hidden sm:inline">
            Majestic Hub
          </span>
        </Link>

        <div className="flex-1 max-w-2xl relative hidden md:block">
          <input
            className="w-full bg-surface-container-high rounded-full py-space-sm pl-space-lg pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search everything at Majestic Hub online & in store..."
            type="text"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-on-primary p-space-sm rounded-full">
            <Icon name="search" className="text-sm" />
          </button>
        </div>

        <div className="flex items-center gap-space-sm md:gap-space-lg">
          <a
            href="#"
            className="hidden sm:flex flex-col items-center text-on-surface-variant hover:text-on-surface"
          >
            <Icon name="favorite" />
            <span className="text-[11px]">Wishlist</span>
          </a>
          <Link
            to="/cart"
            className="flex items-center gap-space-xs bg-secondary-container text-on-secondary-container px-space-md py-space-sm rounded-full font-medium text-sm relative"
          >
            <Icon name="shopping_cart" />
            <motion.span
              key={itemCount}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              className="bg-primary text-on-primary text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
            >
              {itemCount}
            </motion.span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-xs font-bold overflow-hidden">
            JS
          </div>
          <button
            className="md:hidden text-on-surface"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        className={`bg-surface-container-low px-4 md:px-gutter py-space-sm border-t border-surface-variant items-center gap-space-lg overflow-x-auto ${
          mobileOpen ? "flex flex-col items-start gap-space-sm md:flex-row md:items-center" : "hidden md:flex"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.to === "/"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `px-space-md py-space-xs transition-colors whitespace-nowrap rounded-lg text-sm ${
                isActive
                  ? "bg-primary text-on-primary font-bold"
                  : link.accent
                  ? "text-secondary font-bold hover:bg-surface-container"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
