import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../../assets/logo.png';

const PageLoader = ({ onComplete }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.0 }}
        onAnimationComplete={() => onComplete && onComplete()}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#1A0E00',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <motion.img
          src={logoUrl}
          alt="Chamra Hub"
          style={{ width: '100px', height: 'auto' }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Brand Name */}
        <motion.h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            color: '#C9973F',
            letterSpacing: '4px',
            fontWeight: 600,
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          CHAMRA HUB
        </motion.h1>

        {/* Tagline */}
        <motion.p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.1rem',
            color: '#C4A882',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Premium Leather, Timeless Style
        </motion.p>

        {/* Progress Bar */}
        <div
          style={{
            width: '200px',
            height: '2px',
            backgroundColor: 'rgba(61, 37, 16, 0.8)',
            borderRadius: '999px',
            overflow: 'hidden',
            marginTop: '0.5rem',
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #a67c2e, #C9973F, #E8C87A)',
              borderRadius: '999px',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
