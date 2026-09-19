# Atelier Studio — Web Developer Portfolio & Digital Craftsmanship

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-2b2a27?style=for-the-badge&logo=googlechrome&logoColor=white)](https://devcrafted4u.github.io/Portfolio/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

An editorial, high-converting digital portfolio built for modern web developers, creative technologists, and boutique design studios. Featuring intentional typography, warm organic palette, interactive category filtering, deep-dive case studies, and a bespoke project booking & inquiry engine.

---

## Visual Preview

### 1. Selected Works & Showcase Experience
> Editorial hero typography, commercial conversion metrics, curated archive of 8 multidisciplinary projects, and dynamic category filtering.

![Showcase Desktop](https://raw.githubusercontent.com/devcrafted4u/Portfolio/main/assets/asset_08_bf685991.png)

### 2. Deep-Dive Case Study: Aura Ceramica
> Technical breakdown, brand challenge, architectural solutions, outcome metrics (+185% sales, 3.4% CVR, 0.8s LCP), interactive glaze mockups, and color system specifications.

![Case Study Screen](https://raw.githubusercontent.com/devcrafted4u/Portfolio/main/assets/asset_09_565635cc.png)

### 3. Interactive Project Inquiry & Booking
> Client intake workflow featuring multi-select scope pills, budget tier selector, turnaround timeline selector, and instant toast notifications.

---

## Key Highlights

- **Bespoke Editorial Aesthetics**: Designed with warm natural tones (`#fdf9f4` travertine surface, `#c86d51` terracotta accents, `#5e6d5b` sage olive, `#141413` charcoal) paired with elegant `Newsreader` serif and clean `Plus Jakarta Sans`.
- **Zero-Dependency Architecture**: Standalone HTML5 + Tailwind CSS + Vanilla ESM that runs out-of-the-box with zero build step required, while fully compatible with Vite, Next.js, or standard static hosts.
- **Client-Side SPA Routing**:
  - `#/` or `#/selected-work`: Main showcase and project archive.
  - `#/case-study/aura-ceramica`: In-depth case study and technical breakdown.
  - `#/inquiry`: Project intake, budget selector, and scheduling.
  - `#/services-and-pricing`: Pricing tiers and deliverable matrix.
  - `#/process`: 4-step delivery workflow.
- **Interactive Project Filtering**: Instant filtering across **All (8)**, **E-Commerce**, **SaaS & Tech**, **Brand Studio**, and **Editorial**.
- **100% Local Asset Bundle**: 26 high-resolution photography assets, case study UI previews, founder portraits, and vector logos bundled directly in `assets/`.
- **Mobile-First Responsiveness**: Floating glassmorphism navbar, slide-out mobile drawer, touch-friendly pill selectors, and fluid layout scaling from 320px to 4K displays.
- **Live London Time**: Real-time studio timezone clock in the footer.

---

## Design System Tokens

### Typography Scale
| Role | Typeface | Size | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| **Display XL** | `Newsreader` | `5.5rem` (`88px`) | 400 | `-0.03em` |
| **Display LG** | `Newsreader` | `4.0rem` (`64px`) | 400 | `-0.025em` |
| **Headline LG** | `Newsreader` | `2.5rem` (`40px`) | 400 | `-0.02em` |
| **Headline MD** | `Newsreader` | `1.875rem` (`30px`) | 400 | `-0.015em` |
| **Headline SM** | `Plus Jakarta Sans` | `1.25rem` (`20px`) | 600 | `-0.01em` |
| **Body LG** | `Plus Jakarta Sans` | `1.125rem` (`18px`) | 400 | `0` |
| **Body MD** | `Plus Jakarta Sans` | `0.9375rem` (`15px`) | 400 | `0` |
| **Label MD** | `Plus Jakarta Sans` | `0.8125rem` (`13px`) | 600 | `+0.04em` |
| **Label SM** | `Plus Jakarta Sans` | `0.6875rem` (`11px`) | 600 | `+0.08em` |

### Color Palette
- **Surface / Background**: `#fdf9f4` (Travertine Warm Off-White)
- **Primary Text / Dark Accent**: `#141413` (Deep Editorial Charcoal)
- **Secondary / Terracotta**: `#c86d51` (Warm Terracotta Accent)
- **Tertiary / Sage Olive**: `#5e6d5b` (Muted Sage)
- **Container Elevated**: `#f1ede8` / `#e6e2dd` (Subtle Warm Neutral)
- **Dark Surface / Banner**: `#1c1c1a` (High-Contrast Night Accent)

---

## Project Structure

```text
├── assets/                  # 26 bundled local visual assets, logos, and previews
│   ├── asset_01_*.png       # Project card screenshots
│   ├── asset_14_575f517f.png# Atelier Studio brand logo
│   ├── asset_19_e4189a3e.png# Studio founder headshot
│   └── url_map.json         # Source URL mapping reference
├── index.html               # Main application shell with multi-view layout
├── main.js                  # Client-side hash routing, filters, and inquiry logic
├── package.json             # Scripts for Vite, preview, and development
├── .gitignore               # Ignored build and temporary directories
└── README.md                # Comprehensive documentation
```

---

## Getting Started

### Prerequisites
- Node.js 18+ (optional, only if using Vite) OR Python 3+ (for quick local serving)

### Quick Start (Zero-Build)

1. Clone the repository:
   ```bash
   git clone https://github.com/devcrafted4u/Portfolio.git
   cd Portfolio
   ```

2. Run with Python's built-in HTTP server:
   ```bash
   python -m http.server 3000
   ```
   Open `http://localhost:3000` in your browser.

### Modern Dev Server (Vite)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

---

## Deployment Guide

### GitHub Pages (1-Click)
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select `main` branch and `/ (root)` folder.
4. Click **Save**. Your site will be live at `https://devcrafted4u.github.io/Portfolio/` within seconds!

### Vercel / Netlify
1. Import the repository into your Vercel or Netlify dashboard.
2. Build command: leave blank (or `npm run build` if using Vite).
3. Output directory: `.` (root directory).
4. Click **Deploy**.

---

## Customization Guide

- **Personal Information & Bio**: Edit the hero headlines in `index.html` lines 13–20.
- **Projects & Case Studies**: Modify the project cards in `#projects-grid` (`index.html`) with your own titles, tags, descriptions, and images.
- **Direct Inquiries Email**: Search for `inquiries@atelier.design` in `index.html` and replace with your business email.
- **Social Handles**: Update the Twitter, LinkedIn, GitHub, and ReadCV links in the footer.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

Crafted with care by [DevCrafted4U](https://github.com/devcrafted4u).
