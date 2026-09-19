# Component Specifications: Active Theory Clone

## 1. HeroScene (`src/components/HeroScene.tsx`)
- **Technology:** Three.js WebGL (Points, BufferGeometry, Custom Shader/Texture blending).
- **Functionality:**
  - 3,500 particles distributed in a cylindrical/toroidal cloud around the origin.
  - Generative circular soft glow particle texture.
  - Interactive mouse fluid reaction: mouse coordinates induce position velocity and wave disturbance.
  - Dynamic color interpolation smoothly lerping toward the current project's `uiColor`.
  - Wireframe geometric core mesh rotating in background.
  - Responsive resize listener updating projection matrix and renderer buffer.

## 2. Header (`src/components/Header.tsx`)
- **Visuals:** Fixed header overlay at top of viewport.
- **Brand Typography:** `ACTIVE THEORY` monogram in NB Architekt uppercase, tracking `0.25em`.
- **Studio Hubs:** `LAX 34.02° N · NYC 40.71° N · AMS 52.37° N`.
- **Reel Button:** `Watch Reel` with play icon, opening the immersive showreel video player.

## 3. WorkCarousel (`src/components/WorkCarousel.tsx`)
- **Interaction Model:** 3D perspective curved slider with drag, touch swipe, mouse wheel, and keyboard navigation.
- **Categories:** ALL, INSTALLATION, WEB, EXPERIENTIAL, AI, MOBILE.
- **Card Geometry:**
  - `transform: translateX(...) translateZ(...) rotateY(...) scale(...)`
  - Dynamic project aura glow and accent bar using project's unique `uiColor`.
  - Displays project title, client, year, category, and expansion CTA button.
  - Project counter HUD (`01 / 65`).

## 4. Navigation (`src/components/Navigation.tsx`)
- **Floating HUD Capsule:** Centered at bottom with `backdrop-filter: blur(20px)`.
- **Items:** `WORK`, `ABOUT`, `CONTACT`.
- **Audio Equalizer:** 4-bar dynamic audio equalizer with keyframe wave animations and Web Audio toggle.

## 5. Modals & Overlays:
- **ProjectModal (`src/components/ProjectModal.tsx`):**
  - High-res video/image player, title, client, tags, full project description, and external links ("Launch Experience", "Case Study").
- **ReelModal (`src/components/ReelModal.tsx`):**
  - Active Theory showreel video player with custom HUD.
- **AboutView (`src/components/AboutView.tsx`):**
  - Studio profile, story since 2012, 3 studio locations (LAX, NYC, AMS), and core disciplines.
- **ContactView (`src/components/ContactView.tsx`):**
  - Direct inquiry CTA to `hello@activetheory.net`, newsletter subscribe, and social links (Instagram, LinkedIn, X, Notion).
