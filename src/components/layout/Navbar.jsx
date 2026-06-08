import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { IconMenu2, IconX, IconSearch, IconHeart, IconShoppingBag, IconChevronDown } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../../assets/logo.png';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  {
    path: '/products', label: 'Products', dropdown: [
      { path: '/products?cat=Belts', label: 'Leather Belts' },
      { path: '/products?cat=Wallets', label: 'Wallets' },
      { path: '/products?cat=Handbags', label: 'Handbags' },
      { path: '/products?cat=Travel Bags', label: 'Travel Bags' },
    ]
  },
  { path: '/customize', label: 'Customize' },
  { path: '/about', label: 'Our Story' },
  { path: '/verify', label: 'QR Verify' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled || !isHome ? 'navbar--solid' : ''}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src={logoUrl} alt="Chamra Hub" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">Chamra Hub</span>
              <span className="navbar__tagline">Premium Leather, Timeless Style</span>
            </div>
          </Link>

          <nav className="navbar__links">
            {navLinks.map(link => (
              <div key={link.path} className={`navbar__item ${link.dropdown ? 'has-dropdown' : ''}`}>
                <Link
                  to={link.path}
                  className={`navbar__link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.label}
                  {link.dropdown && <IconChevronDown size={14} className="dropdown-arrow" />}
                </Link>
                {link.dropdown && (
                  <div className="navbar__dropdown">
                    {link.dropdown.map(sub => (
                      <Link key={sub.path} to={sub.path} className="dropdown__link">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="navbar__actions">
            <button className="nav-icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
              <IconSearch size={20} stroke={1.5} />
            </button>
            <Link to="/products" className="nav-icon-btn" aria-label="Wishlist">
              <IconHeart size={20} stroke={1.5} />
              {wishlist.length > 0 && <span className="icon-badge">{wishlist.length}</span>}
            </Link>
            <button className="nav-icon-btn" onClick={() => setIsCartOpen(true)} aria-label="Cart">
              <IconShoppingBag size={20} stroke={1.5} />
              {cartCount > 0 && <span className="icon-badge icon-badge--gold">{cartCount}</span>}
            </button>
            <Link to="/customize" className="btn btn-outline btn-sm btn-pill show-desktop-only">
              Customize
            </Link>
            <button
              className="nav-icon-btn show-mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <IconX size={22} stroke={1.5} /> : <IconMenu2 size={22} stroke={1.5} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="search-overlay"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <form className="search-form" onSubmit={handleSearch}>
                <IconSearch size={20} className="search-form__icon" />
                <input
                  type="text"
                  className="search-form__input"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" className="search-form__close" onClick={() => setSearchOpen(false)}>
                  <IconX size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-menu__nav">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={link.path} className="mobile-menu__link">{link.label}</Link>
                  {link.dropdown && (
                    <div className="mobile-menu__sub">
                      {link.dropdown.map(sub => (
                        <Link key={sub.path} to={sub.path} className="mobile-menu__sublink">{sub.label}</Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
