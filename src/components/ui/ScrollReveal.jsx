import React, { useEffect, useRef } from 'react';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 600, 
  threshold = 0.15,
  className = '',
  once = true,
  ...props 
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('visible');
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  const directionClass = {
    up: '',
    left: 'from-left',
    right: 'from-right',
    scale: 'scale-in',
  }[direction] || '';

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${directionClass} ${className}`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
