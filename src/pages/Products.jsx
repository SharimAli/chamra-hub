import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { IconShoppingCart, IconHeart, IconHeartFilled, IconX, IconPlus, IconMinus, IconStar, IconStarFilled } from '@tabler/icons-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import beltImg from '../assets/belt.png';
import walletImg from '../assets/wallet.png';
import handbagImg from '../assets/handbag.png';
import travelbagImg from '../assets/travelbag.png';
import braidedBeltImg from '../assets/braided-belt.png';
import cardHolderImg from '../assets/card-holder.png';
import crossbodySatchelImg from '../assets/crossbody-satchel.png';
import laptopBriefcaseImg from '../assets/laptop-briefcase.png';
import reversibleBeltImg from '../assets/reversible-belt.png';
import monogramWalletImg from '../assets/monogram-wallet.png';
import { useSearchParams } from 'react-router-dom';
import './Products.css';

const products = [
  { id: 1, name: "Classic Dress Belt", category: "Belts", price: 4999, img: beltImg, desc: "Smooth black full-grain leather with polished buckle", rating: 4.5, reviews: 48 },
  { id: 2, name: "Vintage Bifold Wallet", category: "Wallets", price: 5499, img: walletImg, desc: "Tobacco brown with fine hand-stitching detail", rating: 5, reviews: 62 },
  { id: 3, name: "Structured Tote", category: "Handbags", price: 12999, img: handbagImg, desc: "Chestnut brown with gold-plated hardware", rating: 4.5, reviews: 35 },
  { id: 4, name: "Weekend Duffel", category: "Travel Bags", price: 17999, img: travelbagImg, desc: "Dark espresso leather, spacious interior", rating: 5, reviews: 29 },
  { id: 5, name: "Braided Leather Belt", category: "Belts", price: 5999, img: braidedBeltImg, desc: "Intricate dark brown braided design", rating: 4, reviews: 31 },
  { id: 6, name: "RFID Card Holder", category: "Wallets", price: 3499, img: cardHolderImg, desc: "Minimalist dark brown with RFID blocking", rating: 4.5, reviews: 55 },
  { id: 7, name: "Crossbody Satchel", category: "Handbags", price: 10999, img: crossbodySatchelImg, desc: "Burgundy with adjustable shoulder strap", rating: 5, reviews: 41 },
  { id: 8, name: "Laptop Briefcase", category: "Travel Bags", price: 19999, img: laptopBriefcaseImg, desc: "Espresso brown, padded laptop compartment", rating: 4.5, reviews: 22 },
  { id: 9, name: "Reversible Business Belt", category: "Belts", price: 6999, img: reversibleBeltImg, desc: "Black/brown reversible with rotating buckle", rating: 4.5, reviews: 37 },
  { id: 10, name: "Monogram Bifold", category: "Wallets", price: 5499, img: monogramWalletImg, desc: "Black leather with gold monogram accent", rating: 5, reviews: 44 },
];

const categories = ['All', 'Belts', 'Wallets', 'Handbags', 'Travel Bags'];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < full ? 'star-filled' : (i === full && half) ? 'star-half' : 'star-empty'}>★</span>
      ))}
    </span>
  );
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'All';
  const [filter, setFilter] = useState(catParam);
  const [quickView, setQuickView] = useState(null);
  const [qvQty, setQvQty] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Sync filter with URL params when navigating from dropdown
  React.useEffect(() => {
    setFilter(catParam);
  }, [catParam]);

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  const openQuickView = (product) => {
    setQuickView(product);
    setQvQty(1);
  };

  return (
    <div className="products-page">
      <ScrollReveal>
        <div className="products-page__header section-header">
          <h1>Our <span className="text-gold">Collections</span></h1>
          <div className="ornament" />
          <p>Crafted with precision. Built to last a lifetime.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <motion.div className="product-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((prod, i) => (
            <motion.div
              key={prod.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <div className="product-card card">
                <div className="product-card__img-wrap">
                  <img src={prod.img} alt={prod.name} className="product-card__img" />
                  <div className="product-card__overlay">
                    <button className="btn btn-outline btn-sm" onClick={() => openQuickView(prod)}>Quick View</button>
                    <button
                      className={`wishlist-btn ${isInWishlist(prod.id) ? 'wishlisted' : ''}`}
                      onClick={() => toggleWishlist(prod.id)}
                    >
                      {isInWishlist(prod.id) ? <IconHeartFilled size={20} /> : <IconHeart size={20} />}
                    </button>
                  </div>
                </div>
                <div className="product-card__body">
                  <span className="product-card__cat">{prod.category.toUpperCase()}</span>
                  <h3 className="product-card__name">{prod.name}</h3>
                  <p className="product-card__desc">{prod.desc}</p>
                  <div className="product-card__rating">
                    <StarRating rating={prod.rating} />
                    <span className="product-card__reviews">({prod.reviews})</span>
                  </div>
                  <div className="product-card__footer">
                    <span className="product-card__price">Rs. {prod.price.toLocaleString()}</span>
                    <button className="btn btn-outline btn-sm" onClick={() => addToCart(prod)}>
                      <IconShoppingCart size={16} /> Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <>
            <motion.div
              className="qv-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickView(null)}
            />
            <div className="qv-wrap">
            <motion.div
              className="qv-modal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <button className="qv-close" onClick={() => setQuickView(null)}><IconX size={22} /></button>
              <div className="qv-content">
                <div className="qv-image">
                  <img src={quickView.img} alt={quickView.name} />
                </div>
                <div className="qv-info">
                  <span className="product-card__cat">{quickView.category.toUpperCase()}</span>
                  <h2>{quickView.name}</h2>
                  <p className="qv-desc">{quickView.desc}</p>
                  <div className="product-card__rating" style={{ marginBottom: '1rem' }}>
                    <StarRating rating={quickView.rating} />
                    <span className="product-card__reviews">({quickView.reviews} reviews)</span>
                  </div>
                  <div className="qv-price">Rs. {quickView.price.toLocaleString()}</div>
                  <div className="qv-qty">
                    <span>Quantity:</span>
                    <div className="qty-stepper">
                      <button onClick={() => setQvQty(Math.max(1, qvQty - 1))}><IconMinus size={14} /></button>
                      <span>{qvQty}</span>
                      <button onClick={() => setQvQty(qvQty + 1)}><IconPlus size={14} /></button>
                    </div>
                  </div>
                  <div className="qv-actions">
                    <button className="btn btn-gold btn-full" onClick={() => { addToCart({ ...quickView, quantity: qvQty }); setQuickView(null); }}>
                      <IconShoppingCart size={18} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
