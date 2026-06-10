import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ui/ScrollReveal';

// Belt color images
import beltBlackImg from '../assets/belt-black.png';
import beltEspressoImg from '../assets/belt-espresso.png';
import beltTanImg from '../assets/belt-tan.png';
import beltCognacImg from '../assets/belt-cognac.png';
import beltBurgundyImg from '../assets/belt-burgundy.png';

// Wallet color images
import walletBlackImg from '../assets/wallet-black.png';
import walletEspressoImg from '../assets/wallet-espresso.png';
import walletTanImg from '../assets/wallet-tan.png';
import walletCognacImg from '../assets/wallet-cognac.png';
import walletBurgundyImg from '../assets/wallet-burgundy.png';

// Handbag color images
import handbagBlackImg from '../assets/handbag-black.png';
import handbagTanImg from '../assets/handbag-tan.png';
import handbagBurgundyImg from '../assets/handbag-burgundy.png';

// Travel bag color images
import travelbagBlackImg from '../assets/travelbag-black.png';
import travelbagTanImg from '../assets/travelbag-tan.png';

import './Customize.css';

/* ─── Color options with real images per product ─── */
const colors = [
  { name: 'Jet Black',      hex: '#111111', images: { Belt: beltBlackImg,    Wallet: walletBlackImg,    Handbag: handbagBlackImg,  'Travel Bag': travelbagBlackImg } },
  { name: 'Dark Espresso',  hex: '#2c1a0a', images: { Belt: beltEspressoImg, Wallet: walletEspressoImg, Handbag: handbagBlackImg,  'Travel Bag': travelbagBlackImg } },
  { name: 'Vintage Tan',    hex: '#b57b4c', images: { Belt: beltTanImg,      Wallet: walletTanImg,      Handbag: handbagTanImg,    'Travel Bag': travelbagTanImg  } },
  { name: 'Cognac',         hex: '#8a4b26', images: { Belt: beltCognacImg,   Wallet: walletCognacImg,   Handbag: handbagTanImg,    'Travel Bag': travelbagTanImg  } },
  { name: 'Burgundy',       hex: '#5e2129', images: { Belt: beltBurgundyImg, Wallet: walletBurgundyImg, Handbag: handbagBurgundyImg,'Travel Bag': travelbagBlackImg} },
];

const productTypes = [
  { type: 'Belt',       base: 5499  },
  { type: 'Wallet',     base: 6999  },
  { type: 'Handbag',    base: 12999 },
  { type: 'Travel Bag', base: 17999 },
];

const hardwareOptions = ['Gold', 'Silver', 'Antique Bronze', 'Gunmetal'];
const textures        = ['Smooth Full-Grain', 'Pebbled', 'Vintage Distressed', 'Crocodile Emboss'];
const fonts           = ['Classic Serif', 'Script', 'Block'];

const stitchColors = [
  { name: 'Cream',  hex: '#F5EDD8' },
  { name: 'Black',  hex: '#111'    },
  { name: 'Gold',   hex: '#C9973F' },
  { name: 'Brown',  hex: '#7B4A22' },
  { name: 'Red',    hex: '#8B2500' },
  { name: 'Navy',   hex: '#1a2744' },
];

const Customize = () => {
  const { addToCart } = useCart();

  const [productType, setProductType] = useState(0);
  const [color,       setColor      ] = useState(0);
  const [hardware,    setHardware   ] = useState('Gold');
  const [stitch,      setStitch     ] = useState(2);
  const [texture,     setTexture    ] = useState(0);
  const [engraving,   setEngraving  ] = useState('');
  const [font,        setFont       ] = useState('Classic Serif');
  const [signature,   setSignature  ] = useState('');
  const [addons,      setAddons     ] = useState({ conditioner: false, giftBox: false, qrCard: true });
  const [qty,         setQty        ] = useState(1);

  /* ── Pricing (PKR) ── */
  const base           = productTypes[productType].base;
  const engravingPrice = engraving  ? 1500 : 0;
  const signaturePrice = signature  ? 2000 : 0;
  const addonTotal     = (addons.conditioner ? 2499 : 0) + (addons.giftBox ? 999 : 0) + (addons.qrCard ? 499 : 0);
  const unitTotal      = base + engravingPrice + signaturePrice + addonTotal;
  const total          = unitTotal * qty;

  const currentType  = productTypes[productType].type;
  const previewImage = colors[color].images[currentType];
  const fontClass    = font === 'Script' ? 'eng-script' : font === 'Block' ? 'eng-block' : 'eng-serif';

  const handleAddToCart = () => {
    addToCart({
      id:      `custom-${Date.now()}`,
      name:    `Custom ${currentType}`,
      price:   unitTotal,
      image:   previewImage,
      variant: `${colors[color].name}, ${hardware} hw, ${textures[texture]}${engraving ? `, "${engraving}"` : ''}${signature ? ', Signature' : ''}`,
    }, qty);
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
        {/* ── LEFT: Controls ── */}
        <div className="studio__controls">

          {/* 1. Product */}
          <div className="control-group">
            <h3>1. Product Type</h3>
            <div className="product-type-grid">
              {productTypes.map((p, i) => (
                <button key={i} className={`type-btn ${productType === i ? 'active' : ''}`} onClick={() => setProductType(i)}>
                  <span className="type-btn__name">{p.type}</span>
                  <span className="type-btn__price">Rs. {p.base.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Color */}
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

          {/* 3. Hardware */}
          <div className="control-group">
            <h3>3. Hardware Finish</h3>
            <div className="radio-pills">
              {hardwareOptions.map(h => (
                <button key={h} className={`pill ${hardware === h ? 'active' : ''}`} onClick={() => setHardware(h)}>{h}</button>
              ))}
            </div>
          </div>

          {/* 4. Stitch */}
          <div className="control-group">
            <h3>4. Stitch Color</h3>
            <div className="color-swatches color-swatches--sm">
              {stitchColors.map((s, i) => (
                <button key={i} className={`swatch swatch--sm ${stitch === i ? 'active' : ''}`} style={{ background: s.hex }} title={s.name} onClick={() => setStitch(i)} />
              ))}
            </div>
          </div>

          {/* 5. Texture */}
          <div className="control-group">
            <h3>5. Texture</h3>
            <div className="radio-pills">
              {textures.map((t, i) => (
                <button key={t} className={`pill ${texture === i ? 'active' : ''}`} onClick={() => setTexture(i)}>{t}</button>
              ))}
            </div>
          </div>

          {/* 6. Engraving */}
          <div className="control-group">
            <h3>6. Name Engraving <span className="price-tag">+Rs. 1,500</span></h3>
            <input
              className="input"
              maxLength={20}
              placeholder="Your name or initials (max 20 chars)"
              value={engraving}
              onChange={e => setEngraving(e.target.value)}
            />
            <div className="radio-pills mt-1">
              {fonts.map(f => (
                <button key={f} className={`pill ${font === f ? 'active' : ''}`} onClick={() => setFont(f)}>{f}</button>
              ))}
            </div>
          </div>

          {/* 7. Signature (keyboard) */}
          <div className="control-group">
            <h3>7. Signature Style <span className="price-tag">+Rs. 2,000</span></h3>
            <p className="control-hint">Type your name — it will appear in cursive on the product</p>
            <input
              className="input sig-input"
              maxLength={30}
              placeholder="e.g. Ahmed Khan"
              value={signature}
              onChange={e => setSignature(e.target.value)}
            />
            {signature && (
              <p className="sig-preview-text">{signature}</p>
            )}
          </div>

          {/* 8. Add-ons */}
          <div className="control-group">
            <h3>8. Add-Ons</h3>
            <label className="addon-check">
              <input type="checkbox" checked={addons.conditioner} onChange={() => setAddons(p => ({ ...p, conditioner: !p.conditioner }))} />
              Leather Conditioner <span className="price-tag">+Rs. 2,499</span>
            </label>
            <label className="addon-check">
              <input type="checkbox" checked={addons.giftBox} onChange={() => setAddons(p => ({ ...p, giftBox: !p.giftBox }))} />
              Premium Gift Box <span className="price-tag">+Rs. 999</span>
            </label>
            <label className="addon-check">
              <input type="checkbox" checked={addons.qrCard} onChange={() => setAddons(p => ({ ...p, qrCard: !p.qrCard }))} />
              QR Auth Card <span className="price-tag">+Rs. 499</span>
            </label>
          </div>

          {/* 9. Quantity */}
          <div className="control-group">
            <h3>9. Quantity</h3>
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Total */}
          <div className="studio__total">
            <div className="total-row">
              <span>Your Custom Total</span>
              <span className="text-gold">Rs. {total.toLocaleString()}</span>
            </div>
            <button className="btn btn-gold btn-full" onClick={handleAddToCart}>
              Add Custom Item to Cart
            </button>
          </div>
        </div>

        {/* ── RIGHT: Preview ── */}
        <div className="studio__preview">
          <div className="preview-canvas">
            <img
              key={`${productType}-${color}`}
              src={previewImage}
              alt={`${currentType} in ${colors[color].name}`}
              className="preview-img"
            />

            {/* Engraving overlay */}
            {engraving && (
              <div className="preview-engraving-wrap">
                <div className={`preview-engraving ${fontClass}`}>
                  {engraving.toUpperCase()}
                </div>
              </div>
            )}

            {/* Signature overlay */}
            {signature && (
              <div className="preview-sig-wrap">
                <span className="preview-sig-text">{signature}</span>
              </div>
            )}
          </div>

          {/* Config tags */}
          <div className="preview-tags">
            <span className="preview-tag">{colors[color].name}</span>
            <span className="preview-tag">{hardware} Hardware</span>
            <span className="preview-tag">{textures[texture]}</span>
            {engraving  && <span className="preview-tag preview-tag--gold">✦ "{engraving}"</span>}
            {signature  && <span className="preview-tag preview-tag--gold">✍ {signature}</span>}
          </div>

          <p className="preview-caption">Live preview — actual product may vary slightly in texture.</p>
        </div>
      </div>
    </div>
  );
};

export default Customize;
