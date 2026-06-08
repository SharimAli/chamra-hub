import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const PROMO_CODES = {
  'CHAMRA10': { type: 'percent', value: 10, label: '10% off' },
  'LEATHER20': { type: 'percent', value: 20, label: '20% off' },
  'NEWCLIENT': { type: 'fixed', value: 5, label: '$5 off' },
  'BUNDLE15': { type: 'percent', value: 15, label: '15% off bundle' },
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('chamra_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('chamra_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [promoCode, setPromoCode] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('chamra_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('chamra_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    setIsCartOpen(true);
    addToast(`${product.name} added to cart ✓`);
  }, [addToast]);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    addToast('Item removed from cart', 'info');
  }, [addToast]);

  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setPromoCode(null);
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      }
      addToast('Added to wishlist ♥', 'success');
      return [...prev, productId];
    });
  }, [addToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const applyPromoCode = useCallback((code) => {
    const upperCode = code.toUpperCase().trim();
    const promo = PROMO_CODES[upperCode];
    if (promo) {
      setPromoCode({ code: upperCode, ...promo });
      addToast(`Promo "${upperCode}" applied — ${promo.label}! ✓`, 'success');
      return true;
    }
    addToast('Invalid promo code', 'error');
    return false;
  }, [addToast]);

  const removePromoCode = useCallback(() => {
    setPromoCode(null);
    addToast('Promo code removed', 'info');
  }, [addToast]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const discount = promoCode
    ? promoCode.type === 'percent'
      ? subtotal * (promoCode.value / 100)
      : promoCode.value
    : 0;

  const shipping = subtotal > 50 ? 0 : 8.99;
  const cartTotal = Math.max(0, subtotal - discount + shipping);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlist,
      toggleWishlist,
      isInWishlist,
      promoCode,
      applyPromoCode,
      removePromoCode,
      subtotal,
      discount,
      shipping,
      cartTotal,
      cartCount,
      toasts,
      addToast,
      removeToast,
    }}>
      {children}
    </CartContext.Provider>
  );
};
