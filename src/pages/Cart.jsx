import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../components/Icon";
import { useCart } from "../context/CartContext";

const STEPS = [
  { id: 1, label: "Shopping Cart" },
  { id: 2, label: "Shipping & Payment" },
  { id: 3, label: "Review & Place" },
];

export default function Cart() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  function applyPromo(e) {
    e.preventDefault();
    if (promo.trim()) setPromoApplied(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-gutter py-space-xl w-full">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-space-md md:gap-space-lg mb-space-xl flex-wrap">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-space-md md:gap-space-lg">
            <div className={`flex items-center gap-space-sm ${step.id !== 1 ? "opacity-50" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.id === 1
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-highest text-on-surface"
                }`}
              >
                {step.id}
              </div>
              <span className="font-headline text-sm font-bold text-on-surface hidden sm:inline">
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="w-8 md:w-12 h-0.5 bg-surface-container-highest" />}
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-space-md py-space-xl text-center">
          <Icon name="shopping_cart" className="text-6xl text-on-surface-variant" />
          <h2 className="font-headline text-xl font-bold text-on-surface">Your cart is empty</h2>
          <p className="text-sm text-on-surface-variant">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="bg-primary text-on-primary px-space-lg py-space-sm rounded-full font-medium mt-space-sm"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Cart items */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="bg-surface-container-low p-space-lg rounded-xl flex items-center justify-between shadow-sm flex-wrap gap-space-sm">
              <div className="flex items-center gap-space-md">
                <Icon name="local_shipping" fill className="text-secondary text-2xl" />
                <div>
                  <h3 className="font-headline text-base font-semibold text-on-surface">
                    Free Shipping Unlocked!
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    Your order qualifies for complimentary express delivery.
                  </p>
                </div>
              </div>
              <span className="bg-secondary-container text-on-secondary-container px-space-md py-space-xs rounded-full text-xs font-bold">
                Majestic Pass
              </span>
            </div>

            <div className="flex flex-col gap-space-md">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                    className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-space-lg transition-shadow hover:shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded-lg bg-surface-container shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-space-xs text-center md:text-left">
                      <span className="text-xs text-on-surface-variant uppercase tracking-wider">
                        {item.brand}
                      </span>
                      <h4 className="font-headline text-base font-semibold text-on-surface">
                        {item.title}
                      </h4>
                      {item.variant && (
                        <p className="text-sm text-on-surface-variant">{item.variant}</p>
                      )}
                      <div className="flex items-center justify-center md:justify-start gap-space-md mt-space-sm tabular-nums">
                        <span className="font-headline text-lg text-primary">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-on-surface-variant line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-between gap-space-md">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-space-xs text-sm"
                      >
                        <Icon name="delete" className="text-sm" /> Remove
                      </button>
                      <div className="flex items-center bg-surface-container-low rounded-lg p-space-xs">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface rounded"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-sm">{item.qty}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface rounded"
                          onClick={() => updateQty(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Promo code */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col sm:flex-row gap-space-md items-center">
              <div className="flex items-center gap-space-md flex-1 w-full">
                <Icon name="local_offer" className="text-on-surface-variant" />
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="w-full bg-surface-container-high px-space-md py-space-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter promo code (e.g. MAJESTIC10)"
                  type="text"
                />
              </div>
              <button
                onClick={applyPromo}
                className="w-full sm:w-auto bg-surface-container text-on-surface px-space-lg py-space-sm rounded-lg font-medium hover:bg-surface-container-high transition-colors"
              >
                Apply Code
              </button>
            </div>
            <AnimatePresence>
              {promoApplied && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-tertiary flex items-center gap-space-xs -mt-space-sm"
                >
                  <Icon name="check_circle" fill className="text-sm" /> Promo code applied — happy shopping!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-xl flex flex-col gap-space-lg">
              <h3 className="font-headline text-lg font-semibold text-on-surface">Order Summary</h3>
              <div className="flex flex-col gap-space-md text-sm text-on-surface-variant tabular-nums">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="font-bold text-on-surface">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-tertiary font-bold flex items-center gap-space-xs">
                    <Icon name="check_circle" fill className="text-sm" /> FREE
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-on-surface">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-space-md border-t border-surface-variant">
                  <span className="font-headline text-base text-on-surface">Grand Total</span>
                  <span className="font-headline text-xl text-secondary">${total.toFixed(2)}</span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => alert("Proceeding to Secure Checkout & Payment...")}
                className="w-full bg-secondary-container text-on-secondary-container py-space-md rounded-xl font-headline font-semibold hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-space-sm"
              >
                <Icon name="lock" /> Proceed to Secure Checkout
              </motion.button>
              <div className="flex flex-col gap-space-sm pt-space-md border-t border-surface-variant text-sm text-on-surface-variant">
                <div className="flex items-center gap-space-sm">
                  <Icon name="verified_user" className="text-secondary" />
                  <span>256-Bit Bank-Grade Secure Encryption</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <Icon name="autorenew" className="text-secondary" />
                  <span>30-Day Hassle-Free Return Policy</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <Icon name="support_agent" className="text-secondary" />
                  <span>24/7 Dedicated Concierge Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
