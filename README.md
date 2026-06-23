# Antigravity — A Scroll-Driven Storytelling Experience

A premium, high-performance, animation-heavy storytelling web application built around the concept of weightlessness and zero-gravity suspension. This codebase implements a strict 3-layer stacking context across three sequential narrative chapters, driven by ScrollTrigger-bound parallax timelines.

---

## 🛠️ Technology Stack
- **Framework**: Vite + Vanilla JS (No overhead framework, maximum performance)
- **Smooth Scroll Engine**: Lenis (Studio Freight) for device-wide input normalization
- **Animation Engine**: GSAP (GreenSock) + ScrollTrigger for pinned scroll-scrub choreography
- **Styling**: TailwindCSS (Utility classes) + Custom CSS layers (Performance resets and glassmorphism)

---

## 📁 Directory Structure
```
D:\RomanticWebsite\
├── package.json          # Node dependencies (gsap, lenis, tailwindcss)
├── vite.config.js        # Port 3000 configuration
├── tailwind.config.js    # Typography configuration (Syne & Space Grotesk)
├── postcss.config.js     # PostCSS compile rules
├── index.html            # Preloader shield, chapters, and custom inline SVGs
├── run.bat               # Windows double-click shortcut to launch the app
└── src\
    ├── main.js           # Scroll integration, GSAP timelines, and cleanup hooks
    └── styles.css        # Compositing layer promotions and glassmorphic panels
```

---

## 🚀 How to Run the Project

### Option A: Quick Launch (Windows Double-Click)
If you are on Windows, we have provided a shortcut file called `run.bat`.
1. Double-click the [run.bat](file:///D:/RomanticWebsite/run.bat) file in the root of the project directory.
2. The launcher will automatically detect if dependencies are missing, run `npm install` for you, and start the development server.
3. Open `http://localhost:3000` in your web browser.

---

### Option B: Terminal Command Line (Any OS)

#### 1. Install Dependencies
Open your terminal inside the project directory and run:
```bash
npm install
```

#### 2. Start the Development Server
Run the local dev server and open the browser automatically:
```bash
npm run dev -- --open
```
The application will start hosting at `http://localhost:3000`.

#### 3. Build for Production
To compile and bundle optimized static HTML/CSS/JS files:
```bash
npm run build
```
This outputs production assets to the `/dist` directory.

---

## ⚡ Performance Architecture Highlights
- **GPU promotions**: Interactive SVGs and gradients use `will-change: transform` and `translate3d(0,0,0)` to run directly on the GPU.
- **Scroll Ticker Sync**: Lenis animations are hooked into GSAP's central clock loop, and `lagSmoothing` is disabled to prevent scroll lags.
- **Layout Containment**: CSS containment rules (`contain: paint layout`) decouple chapter cards from global rendering loops, minimizing layout recalculation overhead.
- **Debounced Resizing**: Grid recalculations and ScrollTrigger bounds refreshes are debounced (200ms) to avoid browser thrashing during window resizes.
- **Anti-FOUT preloader**: A lightweight, CSS-only circular loading screen prevents layout shifts and font rendering jumps while elements initialize.
