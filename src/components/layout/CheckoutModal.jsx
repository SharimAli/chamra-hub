import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { IconX, IconCheck, IconTruck, IconCreditCard, IconShoppingBag } from '@tabler/icons-react';
import './CheckoutModal.css';

const steps = [
  { icon: IconTruck, label: 'Shipping' },
  { icon: IconCreditCard, label: 'Payment' },
  { icon: IconCheck, label: 'Confirmation' },
];

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartItems, subtotal, discount, shipping, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderNumber] = useState(() => `CH-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);

  const [shippingData, setShippingData] = useState({
    name: '', email: '', phone: '', address: '', city: '', country: 'Pakistan', zip: '',
  });

  const [cardData, setCardData] = useState({
    number: '', expiry: '', cvv: '', holder: '',
  });

  const handleShippingChange = (e) => {
    setShippingData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCardChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'number') {
      val = val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }
    if (e.target.name === 'expiry') {
      val = val.replace(/\D/g, '').slice(0, 4);
      if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
    }
    if (e.target.name === 'cvv') {
      val = val.replace(/\D/g, '').slice(0, 3);
    }
    setCardData(prev => ({ ...prev, [e.target.name]: val }));
  };

  const goStep2 = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const goStep3 = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handleFinish = () => {
    clearCart();
    setStep(1);
    setShippingData({ name: '', email: '', phone: '', address: '', city: '', country: 'Pakistan', zip: '' });
    setCardData({ number: '', expiry: '', cvv: '', holder: '' });
    onClose();
  };

  const cardType = cardData.number.startsWith('4') ? 'VISA' : cardData.number.startsWith('5') ? 'MC' : '';

  if (!isOpen) return null;

  return (
    <>
      <motion.div className="co-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <div className="co-modal-wrap">
        <motion.div className="co-modal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.35 }}>
        <button className="co-close" onClick={step === 3 ? handleFinish : onClose}><IconX size={20} /></button>

        {/* Steps indicator */}
        <div className="co-steps">
          {steps.map((s, i) => (
            <div key={i} className={`co-step ${step > i ? 'co-step--done' : ''} ${step === i + 1 ? 'co-step--active' : ''}`}>
              <div className="co-step__circle">
                {step > i + 1 ? <IconCheck size={16} /> : <s.icon size={16} />}
              </div>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Shipping */}
        {step === 1 && (
          <form className="co-form" onSubmit={goStep2}>
            <h2>Shipping Details</h2>
            <div className="co-row">
              <div className="co-field"><label>Full Name *</label><input className="input" name="name" value={shippingData.name} onChange={handleShippingChange} required /></div>
              <div className="co-field"><label>Email *</label><input className="input" name="email" type="email" value={shippingData.email} onChange={handleShippingChange} required /></div>
            </div>
            <div className="co-row">
              <div className="co-field"><label>Phone</label><input className="input" name="phone" value={shippingData.phone} onChange={handleShippingChange} /></div>
              <div className="co-field"><label>ZIP Code</label><input className="input" name="zip" value={shippingData.zip} onChange={handleShippingChange} /></div>
            </div>
            <div className="co-field"><label>Address *</label><input className="input" name="address" value={shippingData.address} onChange={handleShippingChange} required /></div>
            <div className="co-row">
              <div className="co-field"><label>City *</label><input className="input" name="city" value={shippingData.city} onChange={handleShippingChange} required /></div>
              <div className="co-field">
                <label>Country</label>
                <select className="input" name="country" value={shippingData.country} onChange={handleShippingChange}>
                  <option>Pakistan</option><option>UAE</option><option>UK</option><option>USA</option><option>Saudi Arabia</option><option>Canada</option><option>Australia</option><option>Other</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-gold btn-full btn-lg">Continue to Payment →</button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <form className="co-form" onSubmit={goStep3}>
            <h2>Payment Details</h2>
            {/* Card Preview */}
            <div className="credit-card-preview">
              <div className="cc-top">
                <IconCreditCard size={28} />
                {cardType && <span className="cc-type">{cardType}</span>}
              </div>
              <div className="cc-number">{cardData.number || '•••• •••• •••• ••••'}</div>
              <div className="cc-bottom">
                <div><span className="cc-label">CARDHOLDER</span><span className="cc-val">{cardData.holder || 'YOUR NAME'}</span></div>
                <div><span className="cc-label">EXPIRES</span><span className="cc-val">{cardData.expiry || 'MM/YY'}</span></div>
              </div>
            </div>
            <div className="co-row">
              <div className="co-field co-field--full"><label>Card Number *</label><input className="input font-mono" name="number" value={cardData.number} onChange={handleCardChange} placeholder="0000 0000 0000 0000" required /></div>
            </div>
            <div className="co-row">
              <div className="co-field"><label>Expiry *</label><input className="input" name="expiry" value={cardData.expiry} onChange={handleCardChange} placeholder="MM/YY" required /></div>
              <div className="co-field"><label>CVV *</label><input className="input" name="cvv" type="password" value={cardData.cvv} onChange={handleCardChange} placeholder="•••" required /></div>
            </div>
            <div className="co-field"><label>Cardholder Name *</label><input className="input" name="holder" value={cardData.holder} onChange={handleCardChange} required /></div>
            <p className="co-sim-note">🔒 This is a simulation. No real payment is processed.</p>
            <div className="co-row">
              <button type="button" className="btn btn-outline btn-full" onClick={() => setStep(1)}>← Back</button>
              <button type="submit" className="btn btn-gold btn-full btn-lg" disabled={loading}>
                {loading ? <><span className="spinner" /> Processing...</> : 'Place Order →'}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="co-confirmation">
            <motion.div
              className="co-checkmark"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <IconCheck size={48} />
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Order Placed Successfully!
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="co-order-num">
              Order #{orderNumber}
            </motion.p>
            <motion.div className="co-summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              {cartItems.map(item => (
                <div key={item.id} className="co-summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="co-summary-total">
                <span>Total Paid</span>
                <span className="text-gold">${cartTotal.toFixed(2)}</span>
              </div>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
              A confirmation email has been sent to {shippingData.email || 'your email'}.
            </motion.p>
            <motion.button
              className="btn btn-gold btn-lg mt-3"
              onClick={handleFinish}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <IconShoppingBag size={18} /> Continue Shopping
            </motion.button>
          </div>
        )}
      </motion.div>
      </div>
    </>
  );
};

export default CheckoutModal;
