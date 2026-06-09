import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { IconX, IconTrash, IconPlus, IconMinus, IconTag } from '@tabler/icons-react';
import CheckoutModal from './CheckoutModal';
import './CartDrawer.css';

const CartDrawer = () => {
  const {
    isCartOpen, setIsCartOpen, cartItems, removeFromCart,
    updateQuantity, subtotal, discount, shipping, cartTotal,
    promoCode, applyPromoCode, removePromoCode, addToCart,
  } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (!success) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 1500);
    } else {
      setPromoInput('');
    }
  };

  const handleAddConditioner = () => {
    addToCart({
      id: 'conditioner-001',
      name: 'Chamra Care Conditioner',
      price: 12.99,
      image: null,
      variant: 'Leather Revival',
    });
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={`cart-drawer ${isCartOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h2>Your Cart <span>({cartItems.length} items)</span></h2>
          <button className="cart-drawer__close" onClick={() => setIsCartOpen(false)}>
            <IconX size={22} />
          </button>
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">🛒</div>
              <p>Your cart is currently empty.</p>
              <button className="btn btn-gold mt-3" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="cart-item__img">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="cart-item__placeholder">CH</div>
                      )}
                    </div>
                    <div className="cart-item__info">
                      <h4>{item.name}</h4>
                      <p className="cart-item__variant">{item.variant || 'Standard'}</p>
                      <div className="cart-item__row">
                        <div className="qty-stepper">
                          <button onClick={() => updateQuantity(item.id, -1)}><IconMinus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><IconPlus size={14} /></button>
                        </div>
                        <span className="cart-item__price">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                      <IconTrash size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            {/* Promo Code */}
            <div className="promo-section">
              {!promoCode ? (
                <div className={`promo-input-row ${promoError ? 'promo-error' : ''}`}>
                  <IconTag size={16} className="text-gold" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <button onClick={handleApplyPromo}>Apply</button>
                </div>
              ) : (
                <div className="promo-applied">
                  <span className="badge badge-success">
                    ✓ {promoCode.code} — {promoCode.label}
                  </span>
                  <button onClick={removePromoCode}><IconX size={14} /></button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="cart-total-row cart-total-row--discount">
                  <span>Discount</span>
                  <span>-Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="cart-total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
              </div>
              <div className="cart-total-row cart-total-row--total">
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Upsell */}
            <div className="cart-upsell" onClick={handleAddConditioner}>
              <span>🧴 Add leather conditioner for only Rs. 2,499</span>
              <span className="cart-upsell__add">+ Add</span>
            </div>

            <button className="btn btn-gold btn-full btn-lg" onClick={() => { setIsCartOpen(false); setCheckoutOpen(true); }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
};

export default CartDrawer;
