import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Icon from "./Icon";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast, dismissToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, 2600);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="bg-primary text-on-primary px-space-lg py-space-md rounded-xl shadow-2xl flex items-center gap-space-md max-w-xs"
          >
            <Icon name="check_circle" fill className="text-secondary-container text-2xl" />
            <div>
              <h4 className="font-headline text-sm font-bold text-on-primary">Added to Cart!</h4>
              <p className="text-xs text-primary-fixed-dim">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
