import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { initialCartItems } from "../data/products";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialCartItems);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const addItem = useCallback(
    (product, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            brand: product.brand,
            title: product.title,
            variant: product.variant,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            qty,
          },
        ];
      });
      showToast(`${product.title} added to cart!`);
    },
    [showToast]
  );

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    itemCount,
    subtotal,
    toast,
    showToast,
    dismissToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
