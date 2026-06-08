import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconMail, IconPhone, IconBrandInstagram, IconClock, IconMapPin, IconSend, IconCheck } from '@tabler/icons-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import './Contact.css';

const contactInfo = [
  { icon: IconMail, label: 'Email', value: 'info@chamrahub.com' },
  { icon: IconPhone, label: 'Phone', value: '+92-300-0000000' },
  { icon: IconBrandInstagram, label: 'Instagram', value: '@chamrahub' },
  { icon: IconClock, label: 'Hours', value: 'Mon–Sat, 10am–7pm PKT' },
  { icon: IconMapPin, label: 'Location', value: 'Karachi, Sindh, Pakistan' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <ScrollReveal>
        <div className="contact-page__header section-header">
          <h1>Get In <span className="text-gold">Touch</span></h1>
          <div className="ornament" />
          <p>Have a question, custom order, or just want to say hello? We'd love to hear from you.</p>
        </div>
      </ScrollReveal>

      <div className="contact-grid">
        {/* Form */}
        <ScrollReveal direction="left">
          <div className="contact-form-card card" style={{ padding: '2.5rem' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" className="input" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" className="input" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" className="input" placeholder="+92-xxx-xxxxxxx" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select name="subject" className="input" value={form.subject} onChange={handleChange}>
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Issue</option>
                      <option value="custom">Customization</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" className="input" rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-gold btn-full btn-lg">
                  <IconSend size={18} /> Send Message
                </button>
              </form>
            ) : (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="contact-success__icon">
                  <IconCheck size={40} />
                </div>
                <h2>Message Received!</h2>
                <p>We'll respond within 24 hours. Thank you for reaching out.</p>
                <button className="btn btn-outline mt-3" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </motion.div>
            )}
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal direction="right">
          <div className="contact-info-card card" style={{ padding: '2.5rem' }}>
            <h3>Contact <span className="text-gold">Information</span></h3>
            <p className="contact-info-subtitle">Reach out through any of these channels and we'll get back to you as soon as possible.</p>
            <div className="contact-details">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-detail">
                  <div className="contact-detail__icon"><item.icon size={20} /></div>
                  <div>
                    <span className="contact-detail__label">{item.label}</span>
                    <span className="contact-detail__value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Map Placeholder */}
            <div className="contact-map">
              <div className="contact-map__inner">
                <IconMapPin size={32} className="text-gold" />
                <p>Karachi, Sindh, Pakistan</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;
