# Design Tokens: Active Theory (activetheory.net)

## Typography
- Primary Brand Font: `nbarchitekt` (NB Architekt Std)
  - Regular (400)
  - Light (300)
  - Bold (700)
- Fallbacks: monospace, system-ui, sans-serif
- Characteristics: Uppercase monospace geometric aesthetics, tabular figures, wide tracking (`letter-spacing: 0.08em` to `0.15em`), sharp high-tech design.

## Color Palette
- Background: `#000000` (Pure pitch black `#000`)
- Surface / Panels: `rgba(18, 18, 18, 0.7)` / `#0d0d0d`
- Text Primary: `#ffffff` (100% white)
- Text Muted: `rgba(255, 255, 255, 0.6)`
- Text Subtle: `rgba(255, 255, 255, 0.4)`
- Accent Colors (Dynamic per project):
  - Purple: `#ba7cde`
  - Neon Cyan / Blue: `#4ca5ff`, `#00ffcc`
  - Gold / Amber: `#ffaa00`
  - Emerald: `#00e599`
  - Red / Coral: `#ff3b30`
- Glassmorphism & UI:
  - Floating HUD capsule: `rgba(17, 17, 17, 0.85)` with `backdrop-filter: blur(20px)` and subtle 1px border `rgba(255, 255, 255, 0.12)`
  - Active hover: `rgba(255, 255, 255, 0.15)`

## Spacing & Layout
- Full viewport canvas: `100vw x 100vh`, `overflow: hidden`
- Fixed HUD Navigation: centered at bottom or top, floating capsule
- Studio Coordinates:
  - LAX: 34.02° N, -118.49° W
  - NYC: 40.71° N, -74.00° W
  - AMS: 52.37° N, 4.89° E
