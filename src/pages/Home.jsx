import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconStar, IconChevronLeft, IconChevronRight, IconMinus } from '@tabler/icons-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import beltImg from '../assets/belt.png';
import walletImg from '../assets/wallet.png';
import handbagImg from '../assets/handbag.png';
import travelbagImg from '../assets/travelbag.png';
import iconPremium from '../assets/icon-premium.png';
import iconHandcraft from '../assets/icon-handcraft.png';
import iconCustom from '../assets/icon-custom.png';
import iconQr from '../assets/icon-qr.png';
import iconAfford from '../assets/icon-afford.png';
import './Home.css';

/* ---- Data ---- */
const heroProducts = [
  { id: 1, name: "Classic Dress Belt", price: "$34.99", img: beltImg, badge: "Best Seller" },
  { id: 2, name: "Vintage Bifold Wallet", price: "$39.99", img: walletImg, badge: "New Arrival" },
  { id: 3, name: "Structured Tote", price: "$89.99", img: handbagImg, badge: "Premium" },
];

const features = [
  { img: iconPremium, title: "100% Premium Leather", desc: "Only the finest full-grain and top-grain leather from trusted tanneries." },
  { img: iconHandcraft, title: "Handcrafted Excellence", desc: "Each piece made by skilled artisans in Karachi with generations of expertise." },
  { img: iconCustom, title: "Custom Designs", desc: "Personalize with colors, engraving, signatures, and hardware finishes." },
  { img: iconQr, title: "QR Authenticated", desc: "Every product verified with our unique authentication system." },
  { img: iconAfford, title: "Affordable Luxury", desc: "Premium quality at prices that make sense — no luxury markup." },
];

const featuredProducts = [
  { id: 1, name: "Classic Dress Belt", category: "Belts", price: 34.99, img: beltImg },
  { id: 2, name: "Vintage Bifold Wallet", category: "Wallets", price: 39.99, img: walletImg },
  { id: 3, name: "Structured Tote", category: "Handbags", price: 89.99, img: handbagImg },
  { id: 4, name: "Weekend Duffel", category: "Travel Bags", price: 119.99, img: travelbagImg },
];

const stats = [
  { value: 2500, suffix: "+", label: "Happy Customers" },
  { value: 10000, suffix: "+", label: "Products Sold" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimal: true },
  { value: 15, suffix: "+", label: "Countries Shipped" },
  { value: 100, suffix: "%", label: "Genuine Leather" },
  { value: 2024, suffix: "", label: "Crafting Since", noAnimate: true },
];

const testimonials = [
  { name: "Zain Mirza", city: "Karachi", text: "I bought the vintage tan wallet for my father's birthday and he absolutely loved it. The leather quality is stunning and the stitching is incredibly precise." },
  { name: "Ayesha Noor", city: "Lahore", text: "The handbag I ordered looks exactly like the product images — even better in person! The customization with my initials was a lovely touch." },
  { name: "Bilal Ahmed", city: "Islamabad", text: "Exceptional quality at a very fair price. I've tried other leather brands and nothing comes close. The QR verification card was a great bonus." },
  { name: "Fatima Siddiqui", city: "Dubai, UAE", text: "Ordered the travel duffel bag and it survived three international flights without a scratch. It gets better-looking with age." },
  { name: "Omar Sheikh", city: "London, UK", text: "The personalization option is brilliant. I designed my own belt with my name engraved and it arrived perfectly done." },
  { name: "Sara Tariq", city: "Karachi", text: "Absolutely gorgeous wallet. Slim, classy, and holds everything I need. The dark espresso color looks incredibly rich." },
  { name: "Hassan Raza", city: "Rawalpindi", text: "I was skeptical about ordering online but the QR authentication system completely convinced me. Zero regrets." },
  { name: "Maria Khalid", city: "Faisalabad", text: "The crossbody satchel is my daily companion now. Lightweight, spacious, and the burgundy color is simply stunning." },
];

const faqs = [
  { q: "Are Chamra Hub products made from real leather?", a: "Yes — all products are made from 100% genuine full-grain or top-grain leather. Each product includes a QR authentication card verifying the leather grade and manufacturing details." },
  { q: "Can I customize any product with my name or signature?", a: "Absolutely. Our Customization Studio lets you choose leather color, texture, hardware finish, stitching color, and add your name engraving or hand-drawn signature. A live preview updates in real time." },
  { q: "How do I use the QR authentication card?", a: "Scan the QR code on your product tag using any smartphone camera. Enter the product code on our /verify page to see full leather grade, batch info, and lab testing details." },
  { q: "What is the Chamra Care Leather Conditioner?", a: "It's our specially formulated conditioner that restores natural oils and shine to your leather products. Apply every 3–6 months to prevent cracking and maintain that rich, brand-new look." },
  { q: "Do you ship internationally?", a: "Yes, we ship to 15+ countries. Orders over $50 receive free shipping within Pakistan. International shipping rates apply at checkout." },
  { q: "What is your return policy?", a: "We offer a 14-day return window for unused, non-customized products. Customized items are non-refundable as they are made to order." },
  { q: "How long does a customized order take?", a: "Standard customized orders take 5–7 business days to produce and ship. Rush processing (2–3 days) is available for an additional $15." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, bank transfers, and EasyPaisa/JazzCash for Pakistan-based customers." },
];

/* ---- Animated Counter ---- */
const AnimatedCounter = ({ target, suffix = '', decimal = false, noAnimate = false }) => {
  const [count, setCount] = useState(noAnimate ? target : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (noAnimate) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(decimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimal, noAnimate]);

  return <span ref={ref}>{decimal ? count.toFixed(1) : count.toLocaleString()}{suffix}</span>;
};

/* ---- Home Component ---- */
const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Hero auto-rotate
  useEffect(() => {
    const iv = setInterval(() => setActiveSlide(p => (p + 1) % heroProducts.length), 3500);
    return () => clearInterval(iv);
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const iv = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        {/* Floating decorations */}
        <div className="hero__decor hero__decor--1" />
        <div className="hero__decor hero__decor--2" />
        <div className="hero__decor hero__decor--3" />

        <div className="hero__inner">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hero__tag">✦ SINCE 2024 — KARACHI, PAKISTAN</span>
            <h1 className="hero__title">
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
                Premium{' '}
              </motion.span>
              <motion.span className="text-gold-gradient" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}>
                Leather
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}>
                ,
              </motion.span>
              <br />
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
                Timeless{' '}
              </motion.span>
              <motion.span className="text-gold-gradient" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}>
                Style
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}>
                .
              </motion.span>
            </h1>
            <motion.p className="hero__subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
              Luxury handcrafted leather goods — belts, wallets, handbags, and travel bags — made for those who value quality above all.
            </motion.p>
            <motion.div className="hero__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
              <Link to="/products" className="btn btn-gold btn-lg btn-pill">Shop Collection</Link>
              <Link to="/customize" className="btn btn-outline btn-lg btn-pill">Customize Yours →</Link>
            </motion.div>
            <motion.div className="hero__trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
              <span>🏆 100% Genuine Leather</span>
              <span>✦ Handcrafted</span>
              <span>🔐 QR Authenticated</span>
              <span className="hide-mobile">🚚 Free Shipping Over $50</span>
            </motion.div>
          </motion.div>

          <div className="hero__showcase">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                className="showcase__item"
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="showcase__badge badge badge-gold">{heroProducts[activeSlide].badge}</div>
                <img src={heroProducts[activeSlide].img} alt={heroProducts[activeSlide].name} className="showcase__img" />
                <div className="showcase__card">
                  <h4>{heroProducts[activeSlide].name}</h4>
                  <p>{heroProducts[activeSlide].price}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="showcase__dots">
              {heroProducts.map((_, i) => (
                <button key={i} className={`dot ${i === activeSlide ? 'dot--active' : ''}`} onClick={() => setActiveSlide(i)} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <IconChevronDown size={28} className="hero__scroll-icon" />
        </motion.div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section features-section">
        <ScrollReveal>
          <div className="section-header">
            <h2>Why Choose <span className="text-gold">Chamra Hub</span></h2>
            <div className="ornament" />
            <p>What sets us apart from the rest</p>
          </div>
        </ScrollReveal>
        <div className="features__grid">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 100} direction={i % 2 === 0 ? 'up' : 'scale'}>
              <div className="feature-card card">
                <div className="feature-card__icon"><img src={f.img} alt={f.title} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section featured-section">
        <ScrollReveal>
          <div className="section-header">
            <h2>Featured <span className="text-gold">Collections</span></h2>
            <div className="ornament" />
            <p>Our most loved products, handpicked for you</p>
          </div>
        </ScrollReveal>
        <div className="featured__grid">
          {featuredProducts.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 120} direction={i % 2 === 0 ? 'left' : 'right'}>
              <Link to="/products" className="featured-card card">
                <div className="featured-card__img">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="featured-card__info">
                  <span className="featured-card__cat">{p.category.toUpperCase()}</span>
                  <h3>{p.name}</h3>
                  <div className="featured-card__bottom">
                    <span className="featured-card__price">${p.price.toFixed(2)}</span>
                    <span className="featured-card__link">Shop Now →</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-outline btn-pill">View All Products →</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section">
        <div className="stats__grid">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="stat-card">
                <h2 className="stat-card__value">
                  <AnimatedCounter target={s.value} suffix={s.suffix} decimal={s.decimal} noAnimate={s.noAnimate} />
                </h2>
                <p>{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials-section">
        <ScrollReveal>
          <div className="section-header">
            <div className="testimonials__stars">★★★★★</div>
            <h2>What Our <span className="text-gold">Customers</span> Say</h2>
            <div className="ornament" />
          </div>
        </ScrollReveal>
        <div className="testimonials__carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="testimonial-card"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
            >
              <div className="testimonial-card__quote">"</div>
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__text">"{testimonials[activeTestimonial].text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {testimonials[activeTestimonial].name[0]}
                </div>
                <div className="testimonial-card__author-info">
                  <h4>{testimonials[activeTestimonial].name}</h4>
                  <span className="testimonial-card__city">{testimonials[activeTestimonial].city}</span>
                  <span className="badge badge-success">Verified Buyer</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="testimonials__nav">
            <button onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}>
              <IconChevronLeft size={20} />
            </button>
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`dot ${i === activeTestimonial ? 'dot--active' : ''}`} onClick={() => setActiveTestimonial(i)} />
              ))}
            </div>
            <button onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}>
              <IconChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section faq-section">
        <ScrollReveal>
          <div className="section-header">
            <h2>Frequently Asked <span className="text-gold">Questions</span></h2>
            <div className="ornament" />
          </div>
        </ScrollReveal>
        <div className="faq__list">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className={`faq-item ${activeFaq === i ? 'faq-item--open' : ''}`}>
                <button className="faq-item__q" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <IconChevronDown size={20} className="faq-item__chevron" />
                </button>
                <div className="faq-item__a">
                  <p>{faq.a}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <ScrollReveal direction="scale">
          <div className="cta-banner__inner">
            <h2>Ready to Experience Premium Leather?</h2>
            <p>Discover our handcrafted collections or design your own custom piece.</p>
            <div className="cta-banner__actions">
              <Link to="/products" className="btn btn-dark btn-lg btn-pill">Shop Now</Link>
              <Link to="/customize" className="btn btn-outline btn-lg btn-pill" style={{borderColor:'var(--bg-primary)',color:'var(--bg-primary)'}}>Customize Yours</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
