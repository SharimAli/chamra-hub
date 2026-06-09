import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ui/ScrollReveal';
import beltImg from '../assets/belt.png';
import beltBlack from '../assets/belt-black.png';
import beltTan from '../assets/belt-tan.png';
import beltBurgundy from '../assets/belt-burgundy.png';
import walletImg from '../assets/wallet.png';
import walletBlack from '../assets/wallet-black.png';
import walletTan from '../assets/wallet-tan.png';
import walletBurgundy from '../assets/wallet-burgundy.png';
import handbagImg from '../assets/handbag.png';
import handbagBlack from '../assets/handbag-black.png';
import handbagTan from '../assets/handbag-tan.png';
import travelbagImg from '../assets/travelbag.png';
import travelbagTan from '../assets/travelbag-tan.png';
import './Customize.css';

/* Color-specific images per product type.
   Indices match the colors array below.
   For colors without AI-generated images, we fall back to the base image + CSS filter. */
const colorImages = {
  Belt:       { 0: beltBlack, 2: beltTan, 5: beltBurgundy, 7: beltTan },
  Wallet:     { 0: walletBlack, 2: walletTan, 5: walletBurgundy, 7: walletTan },
  Handbag:    { 0: handbagBlack, 2: handbagTan, 7: handbagTan },
  'Travel Bag': { 2: travelbagTan, 7: travelbagTan },
};

const productTypes = [
  { type: 'Belt', base: 5499, img: beltImg },
  { type: 'Wallet', base: 6999, img: walletImg },
  { type: 'Handbag', base: 12999, img: handbagImg },
  { type: 'Travel Bag', base: 17999, img: travelbagImg },
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
  const [isDrawing, setIsDrawing] = useState(false);
  const [penSize, setPenSize] = useState(2);
  const [penColor, setPenColor] = useState('#3d2510');
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const canvasRef = useRef(null);

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

  // Pricing in PKR
  const base = productTypes[productType].base;
  const engravingPrice = engraving ? 1500 : 0;
  const signaturePrice = hasSignature ? 2000 : 0;
  const addonTotal = (addons.conditioner ? 2499 : 0) + (addons.giftBox ? 999 : 0) + (addons.qrCard ? 499 : 0);
  const unitTotal = base + engravingPrice + signaturePrice + addonTotal;
  const total = unitTotal * qty;

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom ${productTypes[productType].type}`,
      price: unitTotal,
      image: getPreviewImage(),
      variant: `${colors[color].name}, ${hardware} hw, ${textures[texture]}${engraving ? `, "${engraving}"` : ''}`,
    }, qty);
  };

  const fontClass = font === 'Script' ? 'eng-script' : font === 'Block' ? 'eng-block' : 'eng-serif';

  // Get the right preview image — use AI-generated color image if available, otherwise fall back to base with CSS filter
  const getPreviewImage = () => {
    const type = productTypes[productType].type;
    const colorSpecific = colorImages[type]?.[color];
    return colorSpecific || productTypes[productType].img;
  };

  const hasColorImage = () => {
    const type = productTypes[productType].type;
    return !!colorImages[type]?.[color];
  };

  return (
    <div className="customize-page">
      <ScrollReveal>
        <div className="section-header">
          <span className="section-tag">✦ Design Your Own</span>
          <h1>Customization Studio</h1>
          <div className="ornament" />
          <p>Build your perfect leather piece from scratch</p>
        </div>
      </ScrollReveal>

      <div className="studio__grid">
        {/* Controls */}
        <div className="studio__controls">
          <div className="control-group">
            <h3>1. Product Type</h3>
            <div className="product-type-grid">
              {productTypes.map((p, i) => (
                <button key={i} className={`type-btn ${productType === i ? 'active' : ''}`} onClick={() => setProductType(i)}>
                  <img src={p.img} alt={p.type} />
                  <span>{p.type}</span>
                  <span className="type-btn__price">Rs. {p.base.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>2. Leather Color</h3>
            <div className="color-swatches">
              {colors.map((c, i) => (
                <button
                  key={i}
                  className={`swatch ${color === i ? 'active' : ''}`}
                  style={{ background: c.hex }}
                  title={c.name}
                  onClick={() => setColor(i)}
                >
                  {color === i && <span className="swatch-check">✓</span>}
                </button>
              ))}
            </div>
            <p className="swatch-label">{colors[color].name}</p>
          </div>

          <div className="control-group">
            <h3>3. Hardware Finish</h3>
            <div className="radio-pills">
              {hardwareOptions.map(h => (
                <button key={h} className={`pill ${hardware === h ? 'active' : ''}`} onClick={() => setHardware(h)}>{h}</button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>4. Stitch Color</h3>
            <div className="color-swatches color-swatches--sm">
              {stitchColors.map((s, i) => (
                <button key={i} className={`swatch swatch--sm ${stitch === i ? 'active' : ''}`} style={{ background: s.hex }} title={s.name} onClick={() => setStitch(i)} />
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>5. Texture</h3>
            <div className="radio-pills">
              {textures.map((t, i) => (
                <button key={t} className={`pill ${texture === i ? 'active' : ''}`} onClick={() => setTexture(i)}>{t}</button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>6. Engraving <span className="price-tag">+Rs. 1,500</span></h3>
            <input className="input" maxLength={20} placeholder="Your name or initials" value={engraving} onChange={e => setEngraving(e.target.value)} />
            <div className="radio-pills mt-1">
              {fonts.map(f => (
                <button key={f} className={`pill ${font === f ? 'active' : ''}`} onClick={() => setFont(f)}>{f}</button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>7. Signature Pad <span className="price-tag">+Rs. 2,000</span></h3>
            <div className="sig-canvas-wrap">
              <canvas
                ref={canvasRef}
                width={360}
                height={150}
                className="sig-canvas"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
              <div className="sig-controls">
                <label>Size: <input type="range" min={1} max={6} value={penSize} onChange={e => setPenSize(+e.target.value)} /></label>
                <label>Color: <input type="color" value={penColor} onChange={e => setPenColor(e.target.value)} /></label>
                <button className="btn btn-sm btn-outline" onClick={clearCanvas}>Clear</button>
                <button className="btn btn-sm btn-gold" onClick={doneSignature}>Done</button>
              </div>
            </div>
          </div>

          <div className="control-group">
            <h3>8. Add-Ons</h3>
            <label className="addon-check"><input type="checkbox" checked={addons.conditioner} onChange={() => setAddons(p => ({ ...p, conditioner: !p.conditioner }))} /> Leather Conditioner (+Rs. 2,499)</label>
            <label className="addon-check"><input type="checkbox" checked={addons.giftBox} onChange={() => setAddons(p => ({ ...p, giftBox: !p.giftBox }))} /> Premium Gift Box (+Rs. 999)</label>
            <label className="addon-check"><input type="checkbox" checked={addons.qrCard} onChange={() => setAddons(p => ({ ...p, qrCard: !p.qrCard }))} /> QR Auth Card (+Rs. 499)</label>
          </div>

          <div className="control-group">
            <h3>9. Quantity</h3>
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="studio__total">
            <div className="total-row">
              <span>Your Custom Total</span>
              <span className="text-gold">Rs. {total.toLocaleString()}</span>
            </div>
            <button className="btn btn-gold btn-full" onClick={handleAddToCart}>Add Custom Item to Cart</button>
          </div>
        </div>

        {/* Preview */}
        <div className="studio__preview">
          <div className="preview-canvas">
            <img
              src={getPreviewImage()}
              alt="Preview"
              className="preview-img"
              style={hasColorImage() ? {} : { filter: `sepia(0.5) hue-rotate(${colors[color].hue}deg) saturate(1.2)` }}
            />
            {/* Engraving Text - always visible over product */}
            {engraving && (
              <div className="preview-engraving-wrap">
                <div className={`preview-engraving ${fontClass}`}>
                  {engraving.toUpperCase()}
                </div>
              </div>
            )}
            {/* Signature - actual drawn image */}
            {hasSignature && signatureDataUrl && (
              <div className="preview-sig">
                <img src={signatureDataUrl} alt="Your Signature" className="preview-sig__img" />
              </div>
            )}
          </div>
          {/* Config summary tags */}
          <div className="preview-tags">
            <span className="preview-tag">{colors[color].name}</span>
            <span className="preview-tag">{hardware} Hardware</span>
            <span className="preview-tag">{textures[texture]}</span>
            {engraving && <span className="preview-tag preview-tag--gold">✦ "{engraving}"</span>}
            {hasSignature && <span className="preview-tag preview-tag--gold">✍ Signature</span>}
          </div>
          <p className="preview-caption">Live preview — actual product may vary slightly in texture.</p>
        </div>
      </div>
    </div>
  );
};

export default Customize;
