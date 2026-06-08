import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ui/ScrollReveal';
import beltImg from '../assets/belt.png';
import walletImg from '../assets/wallet.png';
import handbagImg from '../assets/handbag.png';
import travelbagImg from '../assets/travelbag.png';
import './Customize.css';

const productTypes = [
  { type: 'Belt', base: 49.99, img: beltImg },
  { type: 'Wallet', base: 59.99, img: walletImg },
  { type: 'Handbag', base: 99.99, img: handbagImg },
  { type: 'Travel Bag', base: 129.99, img: travelbagImg },
];

const colors = [
  { name: 'Jet Black', hex: '#111', hue: 0 },
  { name: 'Dark Espresso', hex: '#2c1a0a', hue: 5 },
  { name: 'Vintage Tan', hex: '#b57b4c', hue: 25 },
  { name: 'Cognac', hex: '#8a4b26', hue: 15 },
  { name: 'Chestnut', hex: '#7b4a22', hue: 20 },
  { name: 'Burgundy', hex: '#5e2129', hue: -20 },
  { name: 'Dark Walnut', hex: '#3d2510', hue: 10 },
  { name: 'Caramel', hex: '#c4863a', hue: 30 },
];

const hardwareOptions = ['Gold', 'Silver', 'Antique Bronze', 'Gunmetal'];
const stitchColors = [
  { name: 'Cream', hex: '#F5EDD8' },
  { name: 'Black', hex: '#111' },
  { name: 'Gold', hex: '#C9973F' },
  { name: 'Brown', hex: '#7B4A22' },
  { name: 'Red', hex: '#8B2500' },
  { name: 'Navy', hex: '#1a2744' },
];
const textures = ['Smooth Full-Grain', 'Pebbled', 'Vintage Distressed', 'Crocodile Emboss'];
const fonts = ['Classic Serif', 'Script', 'Block'];

const Customize = () => {
  const { addToCart } = useCart();
  const [productType, setProductType] = useState(0);
  const [color, setColor] = useState(0);
  const [hardware, setHardware] = useState('Gold');
  const [stitch, setStitch] = useState(2);
  const [texture, setTexture] = useState(0);
  const [engraving, setEngraving] = useState('');
  const [font, setFont] = useState('Classic Serif');
  const [hasSignature, setHasSignature] = useState(false);
  const [addons, setAddons] = useState({ conditioner: false, giftBox: false, qrCard: true });
  const [qty, setQty] = useState(1);

  // Signature canvas
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penSize, setPenSize] = useState(2);
  const [penColor, setPenColor] = useState('#3d2510');
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);

  const startDraw = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }, []);

  const draw = useCallback((e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing, penSize, penColor]);

  const stopDraw = useCallback(() => setIsDrawing(false), []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setSignatureDataUrl(null);
  };

  const doneSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setSignatureDataUrl(canvas.toDataURL('image/png'));
    }
    setHasSignature(true);
  };

  // Pricing
  const base = productTypes[productType].base;
  const engravingPrice = engraving ? 8 : 0;
  const signaturePrice = hasSignature ? 10 : 0;
  const addonTotal = (addons.conditioner ? 12.99 : 0) + (addons.giftBox ? 5.99 : 0) + (addons.qrCard ? 2.99 : 0);
  const unitTotal = base + engravingPrice + signaturePrice + addonTotal;
  const total = unitTotal * qty;

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom ${productTypes[productType].type}`,
      price: unitTotal,
      image: productTypes[productType].img,
      variant: `${colors[color].name}, ${hardware} hw, ${textures[texture]}${engraving ? `, "${engraving}"` : ''}`,
      quantity: qty,
    });
  };

  const fontClass = { 'Classic Serif': 'eng-serif', 'Script': 'eng-script', 'Block': 'eng-block' }[font];

  return (
    <div className="customize-page">
      <ScrollReveal>
        <div className="customize-page__header section-header">
          <h1>Design Your <span className="text-gold">Own</span></h1>
          <p className="font-script" style={{ fontSize: '1.8rem', color: 'var(--color-gold)' }}>The Chamra Hub Studio</p>
        </div>
      </ScrollReveal>

      <div className="studio">
        {/* Controls */}
        <div className="studio__controls">
          {/* Product Type */}
          <div className="ctrl-group">
            <label>Product Type</label>
            <div className="pill-row">
              {productTypes.map((p, i) => (
                <button key={p.type} className={`pill ${productType === i ? 'pill--active' : ''}`} onClick={() => setProductType(i)}>
                  {p.type}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="ctrl-group">
            <label>Leather Color: <span className="text-gold">{colors[color].name}</span></label>
            <div className="swatch-row">
              {colors.map((c, i) => (
                <button key={c.name} className={`swatch ${color === i ? 'swatch--active' : ''}`} style={{ background: c.hex }} onClick={() => setColor(i)} title={c.name} />
              ))}
            </div>
          </div>

          {/* Hardware */}
          <div className="ctrl-group">
            <label>Hardware Finish</label>
            <div className="pill-row">
              {hardwareOptions.map(h => (
                <button key={h} className={`pill pill--sm ${hardware === h ? 'pill--active' : ''}`} onClick={() => setHardware(h)}>{h}</button>
              ))}
            </div>
          </div>

          {/* Texture */}
          <div className="ctrl-group">
            <label>Leather Texture</label>
            <div className="pill-row">
              {textures.map((t, i) => (
                <button key={t} className={`pill pill--sm ${texture === i ? 'pill--active' : ''}`} onClick={() => setTexture(i)}>{t}</button>
              ))}
            </div>
          </div>

          {/* Stitching */}
          <div className="ctrl-group">
            <label>Stitching Color: <span className="text-gold">{stitchColors[stitch].name}</span></label>
            <div className="swatch-row">
              {stitchColors.map((s, i) => (
                <button key={s.name} className={`swatch swatch--sm ${stitch === i ? 'swatch--active' : ''}`} style={{ background: s.hex }} onClick={() => setStitch(i)} title={s.name} />
              ))}
            </div>
          </div>

          {/* Engraving */}
          <div className="ctrl-group">
            <label>Name Engraving <span className="text-muted">(+$8.00)</span></label>
            <input type="text" maxLength={15} placeholder="Enter initials or name" value={engraving} onChange={(e) => setEngraving(e.target.value)} className="input" />
            {engraving && (
              <div className="pill-row mt-1">
                {fonts.map(f => (
                  <button key={f} className={`pill pill--sm ${font === f ? 'pill--active' : ''}`} onClick={() => setFont(f)}>{f}</button>
                ))}
              </div>
            )}
          </div>

          {/* Signature Pad */}
          <div className="ctrl-group">
            <label>Signature Drawing <span className="text-muted">(+$10.00)</span></label>
            <div className="sig-pad">
              <canvas
                ref={canvasRef}
                width={280}
                height={120}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
              <div className="sig-tools">
                <div className="sig-sizes">
                  {[1, 2, 4].map((s, i) => (
                    <button key={s} className={`pill pill--xs ${penSize === s ? 'pill--active' : ''}`} onClick={() => setPenSize(s)}>
                      {['S', 'M', 'L'][i]}
                    </button>
                  ))}
                </div>
                <div className="swatch-row">
                  {[['#3d2510', 'Brown'], ['#111', 'Black'], ['#C9973F', 'Gold']].map(([hex, name]) => (
                    <button key={hex} className={`swatch swatch--xs ${penColor === hex ? 'swatch--active' : ''}`} style={{ background: hex }} onClick={() => setPenColor(hex)} title={name} />
                  ))}
                </div>
                <div className="sig-actions">
                  <button className="btn btn-sm btn-outline" onClick={clearCanvas}>Clear</button>
                  <button className="btn btn-sm btn-gold" onClick={doneSignature}>Done</button>
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="ctrl-group">
            <label>Add-ons</label>
            <div className="addon-list">
              <label className="addon-item">
                <input type="checkbox" checked={addons.conditioner} onChange={() => setAddons(p => ({ ...p, conditioner: !p.conditioner }))} />
                <span>Leather Conditioner Set <span className="text-gold">+$12.99</span></span>
              </label>
              <label className="addon-item">
                <input type="checkbox" checked={addons.giftBox} onChange={() => setAddons(p => ({ ...p, giftBox: !p.giftBox }))} />
                <span>Branded Gift Box <span className="text-gold">+$5.99</span></span>
              </label>
              <label className="addon-item">
                <input type="checkbox" checked={addons.qrCard} onChange={() => setAddons(p => ({ ...p, qrCard: !p.qrCard }))} />
                <span>QR Auth Card <span className="text-gold">+$2.99</span></span>
              </label>
            </div>
          </div>

          {/* Quantity */}
          <div className="ctrl-group">
            <label>Quantity</label>
            <div className="qty-stepper" style={{ display: 'inline-flex' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Pricing */}
          <div className="pricing-box">
            <div className="pricing-row"><span>Base Price</span><span>${base.toFixed(2)}</span></div>
            {engravingPrice > 0 && <div className="pricing-row"><span>Engraving</span><span>${engravingPrice.toFixed(2)}</span></div>}
            {signaturePrice > 0 && <div className="pricing-row"><span>Signature</span><span>${signaturePrice.toFixed(2)}</span></div>}
            {addonTotal > 0 && <div className="pricing-row"><span>Add-ons</span><span>${addonTotal.toFixed(2)}</span></div>}
            {qty > 1 && <div className="pricing-row"><span>× {qty}</span><span></span></div>}
            <div className="pricing-total">
              <span>Your Custom Total</span>
              <span className="text-gold">${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-gold btn-full" onClick={handleAddToCart}>Add Custom Item to Cart</button>
          </div>
        </div>

        {/* Preview */}
        <div className="studio__preview">
          <div className="preview-canvas">
            <img
              src={productTypes[productType].img}
              alt="Preview"
              className="preview-img"
              style={{ filter: `sepia(0.5) hue-rotate(${colors[color].hue}deg) saturate(1.2)` }}
            />
            {engraving && (
              <div className={`preview-engraving ${fontClass}`}>
                {engraving.toUpperCase()}
              </div>
            )}
            {hasSignature && signatureDataUrl && (
              <div className="preview-sig">
                <img src={signatureDataUrl} alt="Your Signature" className="preview-sig__img" />
                <span className="preview-sig-badge">✍ Signature Applied</span>
              </div>
            )}
          </div>
          <p className="preview-caption">Live preview — actual product may vary slightly in texture.</p>
        </div>
      </div>
    </div>
  );
};

export default Customize;
