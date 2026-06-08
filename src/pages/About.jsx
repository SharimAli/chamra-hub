import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ui/ScrollReveal';
import travelbagImg from '../assets/travelbag.png';
import logoUrl from '../assets/logo.png';
import './About.css';

const values = [
  { icon: '🏆', title: 'Quality First', desc: 'Every product passes rigorous quality checks before reaching your hands.' },
  { icon: '✦', title: 'Authenticity', desc: 'QR-verified leather with full traceability from tannery to product.' },
  { icon: '🌿', title: 'Sustainability', desc: 'Chrome-free vegetable tanning and responsibly sourced materials.' },
];

const whyUs = [
  { num: '01', title: 'Premium Materials', text: 'We source only the finest full-grain and top-grain leather from trusted tanneries. Every hide is hand-selected for durability, texture, and natural beauty.' },
  { num: '02', title: 'Artisan Craftsmanship', text: 'Each product is handcrafted by skilled artisans in Karachi who bring generations of leatherworking expertise to every stitch, cut, and finish.' },
  { num: '03', title: 'Custom Design Studio', text: 'Our online Customization Studio lets you choose leather color, texture, hardware, stitching, and even add your name engraving or signature — all with a live preview.' },
  { num: '04', title: 'QR Authentication', text: 'Every product comes with a unique QR code that verifies its authenticity, leather grade, tanning method, and lab test results. No guesswork, just genuine quality.' },
  { num: '05', title: 'Fair Pricing', text: 'By selling directly to you, we eliminate middlemen and pass the savings on. Premium quality at prices that make sense — no luxury markup.' },
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <ScrollReveal direction="scale">
          <div className="about-hero__inner">
            <img src={logoUrl} alt="Chamra Hub" className="about-hero__logo" />
            <h1>Our <span className="text-gold">Story</span></h1>
            <p className="font-script about-hero__tagline">Chamra Hub — Where Quality Meets Style</p>
          </div>
        </ScrollReveal>
      </section>

      {/* Mission */}
      <section className="section about-mission">
        <div className="about-mission__grid">
          <ScrollReveal direction="left">
            <div className="about-mission__text">
              <h2>Our <span className="text-gold">Mission</span></h2>
              <div className="ornament" style={{ margin: '1.5rem 0' }} />
              <p>
                Founded in Karachi in 2024, Chamra Hub was born from a simple belief: everyone deserves access to premium leather goods without the luxury markup.
              </p>
              <p>
                Our artisans combine generations of leatherworking expertise with modern design sensibilities to create products that are both timeless and contemporary. From sourcing the finest full-grain leather to the final hand-stitched seam, every step reflects our commitment to quality, authenticity, and craftsmanship.
              </p>
              <p>
                We believe that premium quality doesn't have to come with a premium price tag. By selling directly to our customers and eliminating middlemen, we offer genuine luxury at prices that make sense.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="about-mission__image">
              <img src={travelbagImg} alt="Chamra Hub Products" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section about-why">
        <ScrollReveal>
          <div className="section-header">
            <h2>Why Choose <span className="text-gold">Chamra Hub</span></h2>
            <div className="ornament" />
          </div>
        </ScrollReveal>
        <div className="why-list">
          {whyUs.map((item, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 80}>
              <div className="why-item">
                <div className="why-item__num">{item.num}</div>
                <div className="why-item__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section about-values" style={{ background: 'var(--bg-secondary)' }}>
        <ScrollReveal>
          <div className="section-header">
            <h2>Our <span className="text-gold">Values</span></h2>
            <div className="ornament" />
          </div>
        </ScrollReveal>
        <div className="values-grid">
          {values.map((v, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="value-card card">
                <div className="value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="about-quote">
        <ScrollReveal direction="scale">
          <div className="about-quote__inner">
            <p className="font-script">"At Chamra Hub, we don't just sell leather products, we deliver trust, quality and style."</p>
            <span>— The Chamra Hub Team</span>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="section text-center">
        <ScrollReveal>
          <h2 style={{ marginBottom: '1.5rem' }}>Ready to <span className="text-gold">Experience</span> Premium Leather?</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-gold btn-lg btn-pill">Shop Collection</Link>
            <Link to="/customize" className="btn btn-outline btn-lg btn-pill">Customize Yours</Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default About;
