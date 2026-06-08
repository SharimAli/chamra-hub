import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconQrcode, IconScan, IconShieldCheck, IconCertificate, IconCheck, IconX, IconFlask, IconDiamond, IconDroplet } from '@tabler/icons-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import './Verify.css';

const validCodes = {
  'CH-2024-BELT-001': { product: 'Classic Dress Belt', grade: 'Full-Grain Premium' },
  'CH-2024-WALL-002': { product: 'Vintage Bifold Wallet', grade: 'Top-Grain Select' },
  'CH-2024-HAND-003': { product: 'Structured Tote', grade: 'Full-Grain Premium' },
  'CH-2024-TRAV-004': { product: 'Weekend Duffel', grade: 'Full-Grain Premium' },
};

const steps = [
  { icon: IconScan, title: 'Scan', desc: 'Scan the QR code on your Chamra Hub product tag' },
  { icon: IconShieldCheck, title: 'Verify', desc: 'Our system cross-references your product ID' },
  { icon: IconCertificate, title: 'Certified', desc: 'View your leather grade, batch info, and care instructions' },
];

const badges = [
  { icon: IconFlask, label: 'Azo-Free Dyes' },
  { icon: IconShieldCheck, label: 'Heavy Metal-Free' },
  { icon: IconDiamond, label: 'Grade A Leather' },
  { icon: IconDroplet, label: 'pH Skin-Safe' },
];

const Verify = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setStatus('loading');
    setTimeout(() => {
      const found = validCodes[code.toUpperCase().trim()];
      if (found) {
        setResult(found);
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  const reset = () => {
    setCode('');
    setStatus('idle');
    setResult(null);
  };

  return (
    <div className="verify-page">
      <div className="verify-page__inner">
        {/* Header */}
        <ScrollReveal>
          <div className="verify-page__header section-header">
            <IconQrcode size={56} className="text-gold" />
            <h1>Product <span className="text-gold">Authentication</span></h1>
            <p>Enter your product code to verify authenticity and view manufacturing details.</p>
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal delay={100}>
          <div className="hiw-grid">
            {steps.map((s, i) => (
              <div key={i} className="hiw-card card">
                <div className="hiw-num">{i + 1}</div>
                <s.icon size={36} className="text-gold" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i < steps.length - 1 && <div className="hiw-connector" />}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Verification Tool */}
        <ScrollReveal delay={200}>
          <div className="verify-card card" style={{ padding: '2.5rem' }}>
            <form onSubmit={handleVerify} className="verify-form">
              <input
                type="text"
                className={`input font-mono ${status === 'error' ? 'input--error' : ''}`}
                placeholder="e.g. CH-2024-BELT-001"
                value={code}
                onChange={(e) => { setCode(e.target.value); if (status === 'error') setStatus('idle'); }}
                style={{ textTransform: 'uppercase', fontSize: '1.1rem', letterSpacing: '1px' }}
              />
              <button type="submit" className="btn btn-gold btn-lg" disabled={status === 'loading'}>
                {status === 'loading' ? <><span className="spinner" /> Verifying...</> : 'Verify Product'}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {status === 'success' && result && (
                <motion.div
                  key="success"
                  className="verify-result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="verify-result__header">
                    <div className="result-icon result-icon--success"><IconCheck size={32} /></div>
                    <h2>Product Verified</h2>
                    <p className="font-mono text-gold">{code.toUpperCase()}</p>
                  </div>
                  <div className="result-details">
                    {[
                      ['Product', result.product],
                      ['Leather Grade', result.grade],
                      ['Batch No.', 'KHI-2024-Q3'],
                      ['Tanning Method', 'Vegetable-Tanned (Chrome-Free)'],
                      ['Manufacturing', 'Karachi, Pakistan'],
                      ['Production Date', 'Q3 2024'],
                      ['Lab Certification', 'Azo-free & pH Skin-Safe'],
                    ].map(([label, value], i) => (
                      <div key={i} className="detail-row">
                        <span>{label}</span>
                        <strong className={i === 6 ? 'text-success' : ''}>{value}</strong>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-outline btn-sm mt-3" onClick={reset}>Verify Another</button>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  key="error"
                  className="verify-result verify-result--error"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="result-icon result-icon--error"><IconX size={32} /></div>
                  <h2>Verification Failed</h2>
                  <p>Product not found. Please check the code or contact us at info@chamrahub.com.</p>
                  <button className="btn btn-outline btn-sm mt-2" onClick={reset}>Try Again</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Lab Badges */}
        <div className="lab-badges">
          {badges.map((b, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="lab-badge card">
                <b.icon size={32} className="text-gold" />
                <span>{b.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Verify;
