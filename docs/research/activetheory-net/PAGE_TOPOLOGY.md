# Page Topology: Active Theory

```mermaid
graph TD
    Stage["Stage (100vw x 100vh Fullscreen Viewport)"]
    Canvas3D["WebGL 3D Interactive Canvas (Particles, Fluid, Shaders, 3D Cards)"]
    HUD["HUD Floating Capsule (Nav, Sound Visualizer, Dynamic Color Accent)"]
    TopBar["Brand Header (Active Theory Logo, Studio Hubs, Reel Trigger)"]
    WorkModal["Project Detail Modal (Video Player, Metadata, Links)"]
    AboutModal["About Overlay (Story, Disciplines, Offices: LAX/NYC/AMS)"]
    ContactModal["Contact Overlay (Studio Radar, Inquiries, Socials)"]
    ReelModal["Showreel Video Player Modal"]

    Stage --> Canvas3D
    Stage --> TopBar
    Stage --> HUD
    Stage --> WorkModal
    Stage --> AboutModal
    Stage --> ContactModal
    Stage --> ReelModal
```

## Layers
1. **Layer 0 (Canvas):** Three.js WebGL canvas rendering the interactive fluid particle field, background mesh, and 3D work cards.
2. **Layer 10 (HUD & Chrome):**
   - Brand Header at top: `ACTIVE THEORY` monogram/wordmark, sound status, quick tag.
   - Floating Navigation capsule at bottom center: `WORK`, `ABOUT`, `CONTACT`, Audio toggle.
   - Status indicators: current project counter (`01 / 65`), active project tag.
3. **Layer 50 (Modals & Overlays):**
   - Project Detail viewer with video playback.
   - Reel video player.
   - About view.
   - Contact view.
