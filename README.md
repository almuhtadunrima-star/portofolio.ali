<div align="center">

# Active Theory · Creative Digital Experiences

### Interactive 3D WebGL Portfolio & Experiential Showcase

A reproduction and engineering of [Active Theory](https://activetheory.net/)'s digital experience, built with **Next.js 16**, **React 19**, **Three.js**, **Tailwind CSS v4**, and **TypeScript**.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## Overview

Founded in 2012, Active Theory is renowned for blending story, art, and cutting-edge creative technology. This repository reverse-engineers and reconstructs the full visual and interactive experience into a modern, production-grade Next.js application.

---

## ✨ Features

- **🌌 Interactive Three.js WebGL Particle Simulation**
  - Real-time 3D particle cloud with 3,500+ nodes distributed in a cylindrical/toroidal space.
  - Interactive fluid-like inertia reacting to mouse coordinates and velocity.
  - Dynamic color interpolation smoothly lerping toward each project's unique `uiColor`.
  - Subtle wireframe geometric core rotating in the background.

- **🎠 3D Curved Perspective Carousel**
  - Spatial 3D project slider with dynamic depth (`translateZ`), curved rotation (`rotateY`), and scale transforms.
  - Multi-input interaction: drag-and-drop, touch swipe gestures, mouse wheel scroll, and keyboard navigation (`←` / `→` / `Enter`).
  - Contains **65 real portfolio projects** extracted from Active Theory's production CMS (including *Dream Portal*, *Coachellaverse*, *Google I/O Pinball*, *Hulu Animayhem*, *Spotify Island*, and more).
  - Category filtering: `ALL`, `INSTALLATION`, `WEB`, `EXPERIENTIAL`, `AI`, `MOBILE`.
  - Dynamic aura glow and project counter HUD (`01 / 65`).

- **🎛️ Floating HUD Navigation Capsule**
  - Ultra-sleek glassmorphism pill centered at the bottom viewport with `backdrop-filter: blur(20px)`.
  - Menu navigation for `WORK`, `ABOUT`, and `CONTACT`.
  - Ambient glow matching the active project's color palette.
  - Animated 4-bar sound equalizer reacting to audio states.

- **🔊 Ambient Generative Audio Synthesizer**
  - Built-in soundscape synthesizer powered by the browser's native **Web Audio API**.
  - Generates warm celestial chords (F minor celestial chord: F2, C3, Ab3, Eb4) through a resonant lowpass biquad filter.
  - Controlled via the interactive equalizer button in the HUD navigation.

- **🎬 Showreel & Project Detail Overlays**
  - **Project Modal:** Fullscreen view with video player, metadata, category tags, body description, and direct links (*Launch Experience*, *Case Study*).
  - **Showreel Modal:** Immersive video modal featuring the authentic Active Theory studio showreel (`reel.mp4`).

- **🏢 Studio Hubs & Global Profile**
  - **About View:** Studio backstory since 2012, core disciplines (Real-time 3D, Spatial Computing / Vision Pro, Creative Direction, Large-scale Installations), and 100+ awards recognition.
  - **Contact View:** Direct inquiry CTA (`hello@activetheory.net`), newsletter signup, and official social channels.
  - Studio coordinates: **LAX** (34.02° N), **NYC** (40.71° N), **AMS** (52.37° N).

- **🔤 Authentic Typography & Brand Assets**
  - Exact `NB Architekt Std` font family (Light, Regular, Bold) loaded locally via `@font-face`.
  - Authentic vectors, icons, and Apple Touch / Favicon icons.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Library** | [React 19](https://react.dev/) |
| **3D Graphics** | [Three.js](https://threejs.org/) (WebGL, BufferGeometry, Points) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css` |
| **Typography** | NB Architekt Std |
| **Audio Engine** | Web Audio API |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Language** | TypeScript (Strict mode) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 20 or higher
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/almuhtadunrima-star/portofolio.ali.git
   cd portofolio.ali
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📦 Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Run TypeScript type check
npm run typecheck

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Run lint + typecheck + build in one command
npm run check
```

---

## 📁 Project Structure

```
├── public/
│   ├── data/cms/           # Active Theory CMS records (projects, contact, metadata)
│   ├── fonts/              # NB Architekt Std font files (woff2)
│   ├── images/             # Extracted UI assets & showreel frame
│   ├── seo/                # Favicons, apple-touch-icon, safari-pinned-tab
│   └── videos/             # Downloaded studio showreel (reel.mp4)
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind v4 theme, font-face, animations
│   │   ├── layout.tsx      # SEO metadata & root HTML layout
│   │   └── page.tsx        # Main application stage orchestrator
│   ├── components/
│   │   ├── AboutView.tsx    # Studio story, disciplines, locations
│   │   ├── AudioEngine.ts  # Web Audio API ambient chord synthesizer
│   │   ├── ContactView.tsx  # Inquiries & social connect overlay
│   │   ├── Header.tsx       # Brand wordmark, studio hubs, reel trigger
│   │   ├── HeroScene.tsx    # Three.js interactive particle & fluid canvas
│   │   ├── Navigation.tsx   # Floating HUD capsule & audio equalizer
│   │   ├── ProjectModal.tsx # Project case study detail dialog
│   │   ├── ReelModal.tsx    # Fullscreen showreel player
│   │   └── WorkCarousel.tsx # 3D perspective curved project slider
│   └── types/
│       └── activetheory.ts  # TypeScript contracts & data interfaces
└── docs/
    └── research/           # Design tokens, behaviors, topology, specs
```

---

## 🌐 Studio Locations

- **LAX (Los Angeles):** Venice, California · `34.02° N, -118.49° W`
- **NYC (New York):** New York City · `40.71° N, -74.00° W`
- **AMS (Amsterdam):** Amsterdam, Netherlands · `52.37° N, 4.89° E`

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).  
*Original brand assets, artwork, and copy are property of [Active Theory](https://activetheory.net/).*
