# 🛡️ Chamra Hub — Premium Leather, Timeless Style

A fully responsive, animation-rich premium leather e-commerce website for **Chamra Hub** — a Pakistani handcrafted leather brand offering belts, wallets, handbags, and travel bags with a unique in-browser product customization studio.

![Chamra Hub](public/favicon.png)

## ✨ Features

- **🎨 Product Customization Studio** — Design your own leather product with 8 colors, textures, hardware finishes, stitching, name engraving, and signature drawing pad
- **🛒 Full Cart System** — Cart drawer, promo codes (CHAMRA10, LEATHER20, NEWCLIENT, BUNDLE15), quantity management, localStorage persistence
- **💳 Simulated 3-Step Checkout** — Shipping → Payment (animated credit card preview) → Order Confirmation
- **🔐 QR Authentication** — Verify product authenticity with product codes
- **⭐ Testimonials Carousel** — 8 verified buyer reviews with auto-rotation
- **📊 Animated Stats** — Counter animations on scroll
- **❓ FAQ Accordion** — 8 expandable questions
- **📱 Fully Responsive** — Mobile, tablet, and desktop
- **🎬 Premium Animations** — Page loader, scroll reveals, Framer Motion transitions
- **🔍 Search Overlay** — Animated search bar in navbar

## 🛠️ Tech Stack

- **React 19** + **Vite 8**
- **Framer Motion** — animations
- **Tabler Icons** — icon set
- **Google Fonts** — Playfair Display, Inter, Dancing Script, Courier Prime
- **Canvas API** — signature drawing pad
- **LocalStorage** — cart persistence

## 📦 Pages

| Route | Page |
|-------|------|
| `/` | Home (Hero, Features, Products, Stats, Testimonials, FAQ, CTA) |
| `/products` | Product Catalog with category filters & Quick View |
| `/customize` | Customization Studio with live preview |
| `/verify` | QR Product Authentication |
| `/about` | Brand Story & Values |
| `/contact` | Contact Form & Info |

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/chamra-hub.git

# Navigate to project
cd chamra-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Background | `#1A0E00` |
| Secondary Background | `#2C1A0A` |
| Card Background | `#3D2510` |
| Primary Gold | `#C9973F` |
| Light Gold | `#E8C87A` |
| Cream/Ivory | `#F5EDD8` |

## 🏷️ Promo Codes (Simulation)

| Code | Discount |
|------|----------|
| `CHAMRA10` | 10% off |
| `LEATHER20` | 20% off |
| `NEWCLIENT` | $5 off |
| `BUNDLE15` | 15% off |

## 📄 License

© 2026 Chamra Hub. All Rights Reserved.

---

*Premium Leather, Timeless Style* ✦
