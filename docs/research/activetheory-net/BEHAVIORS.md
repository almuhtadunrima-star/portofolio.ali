# Behaviors & Interaction Model: Active Theory

## Interaction Models
1. **WebGL Particle / Fluid Simulation:**
   - Interactive 3D particle field reacting to mouse movement (`Mouse.delta` and velocity).
   - Chromatic aberration / RGB displacement shifts with motion.
   - Dynamic wobbling and camera tilt depending on viewport coordinates.

2. **Work 3D Carousel / Gallery:**
   - Curved horizontal 3D card layout in WebGL space.
   - Drag / touch / mousewheel swipe to rotate through projects smoothly with inertia / dampening (`lerp(target, 0.08)`).
   - Each card displays project thumbnail, dynamic title, client, year, tags, and dynamic color glow.
   - Click card to open Project Detail modal.

3. **Floating HUD Capsule:**
   - Nav items: `WORK`, `ABOUT`, `CONTACT`, `REEL`.
   - Dynamic accent border that lerps to the active project's `uiColor`.
   - Audio visualizer icon: animated 4-bar equalizer that pulses with ambient sound or reacts to user click to mute/unmute ambient synth audio.

4. **Project Detail Modal:**
   - Expands over the canvas with backdrop blur.
   - Plays full project video preview or showreel.
   - Shows project metadata: Client name, Completion date, Tags, In-depth description.
   - Interactive CTA buttons: "Visit Site", "View Case Study", "Close (ESC)".

5. **About & Contact Overlays:**
   - Fullscreen modal transitions with smooth opacity and blur.
   - Location radar showing LAX, NYC, AMS studios.
   - Direct contact links and newsletter subscription.
