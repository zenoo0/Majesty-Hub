import {
  Smartphone,
  Shirt,
  ChefHat,
  Wrench,
  Dumbbell,
  Sparkles,
  Gamepad2,
  Car,
  BookOpen,
  ShoppingBasket,
  PawPrint,
  Baby,
  HeartPulse,
  Briefcase,
  Flower2,
  Gem,
} from "lucide-react";

export const categories = [
  { slug: "electronics", name: "Electronics", icon: Smartphone, color: "#4f46e5" },
  { slug: "fashion", name: "Fashion & Apparel", icon: Shirt, color: "#db2777" },
  { slug: "home-kitchen", name: "Home & Kitchen", icon: ChefHat, color: "#d97706" },
  { slug: "tools-home-improvement", name: "Tools & Home Improvement", icon: Wrench, color: "#57534e" },
  { slug: "sports-outdoors", name: "Sports & Outdoors", icon: Dumbbell, color: "#0891b2" },
  { slug: "beauty", name: "Beauty & Personal Care", icon: Sparkles, color: "#c026d3" },
  { slug: "toys-games", name: "Toys & Games", icon: Gamepad2, color: "#16a34a" },
  { slug: "automotive", name: "Automotive", icon: Car, color: "#1e293b" },
  { slug: "books", name: "Books", icon: BookOpen, color: "#92400e" },
  { slug: "grocery", name: "Grocery", icon: ShoppingBasket, color: "#65a30d" },
  { slug: "pet-supplies", name: "Pet Supplies", icon: PawPrint, color: "#ea580c" },
  { slug: "baby", name: "Baby", icon: Baby, color: "#0ea5e9" },
  { slug: "health-household", name: "Health & Household", icon: HeartPulse, color: "#e11d48" },
  { slug: "office", name: "Office Products", icon: Briefcase, color: "#334155" },
  { slug: "garden-outdoor", name: "Garden & Outdoor", icon: Flower2, color: "#15803d" },
  { slug: "jewelry-watches", name: "Jewelry & Watches", icon: Gem, color: "#a16207" },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getCategorySlugByName(name) {
  return categories.find((c) => c.name === name)?.slug;
}
