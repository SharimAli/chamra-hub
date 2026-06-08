import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp, IconBrandYoutube } from '@tabler/icons-react';
import logoUrl from '../../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Strip */}
      <div className="newsletter">
        <div className="newsletter__inner">
          <div className="newsletter__text">
            <h3>Get 10% off your first order</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates.</p>
          </div>
          {!subscribed ? (
            <form className="newsletter__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
              <button type="submit" className="btn btn-dark">Subscribe</button>
            </form>
          ) : (
            <div className="newsletter__success">
              <span>✓</span> Thank you! Check your inbox for your discount code.
            </div>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        {/* Brand Column */}
        <div className="footer__col footer__brand">
          <img src={logoUrl} alt="Chamra Hub" className="footer__logo" />
          <p className="footer__tagline">Premium Leather, Timeless Style.</p>
          <p className="footer__bio">
            Handcrafted leather goods made in Karachi, Pakistan. Built to last a lifetime.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram"><IconBrandInstagram size={20} /></a>
            <a href="#" aria-label="Facebook"><IconBrandFacebook size={20} /></a>
            <a href="#" aria-label="WhatsApp"><IconBrandWhatsapp size={20} /></a>
            <a href="#" aria-label="YouTube"><IconBrandYoutube size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/customize">Customize</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Categories */}
        <div className="footer__col">
          <h4>Categories</h4>
          <Link to="/products?cat=Belts">Leather Belts</Link>
          <Link to="/products?cat=Wallets">Wallets</Link>
          <Link to="/products?cat=Handbags">Handbags</Link>
          <Link to="/products?cat=Travel Bags">Travel Bags</Link>
        </div>

        {/* Support */}
        <div className="footer__col">
          <h4>Customer Support</h4>
          <Link to="/contact">Track My Order</Link>
          <Link to="/contact">Return Policy</Link>
          <Link to="/contact">FAQ</Link>
          <Link to="/verify">QR Verify</Link>
          <Link to="/contact">Shipping Info</Link>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="footer__bottom">
        <p>© 2026 Chamra Hub. All Rights Reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
