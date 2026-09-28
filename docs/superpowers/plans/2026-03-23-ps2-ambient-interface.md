# PS2 Ambient Interface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the glassmorphism video carousel with a PS2-inspired spatial "Ambient Interface" — single-screen, two-state (Browse/Watch), cold blue-violet monospace aesthetic.

**Architecture:** Remove all glass/shadcn components. Build new component tree: AmbientBackground (void + grid + orbs), CardStage (manages spatial card positions with ActiveCard, GhostCard, TargetingBrackets), InfoStrip (title + pagination), WatchMode (expanded iframe state), Header (site name + filters). App.tsx manages `currentIndex` and `mode` state with keyboard navigation.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, CSS custom properties for design tokens, Cloudflare Pages

---

## Task 1: Clean Up Old Glass System

**Files:**
- Delete: `src/components/glass/GlassVideoPlayer.tsx`
- Delete: `src/components/glass/GlassVideoPlayer.css`
- Delete: `src/components/glass/GlassInfoBar.tsx`
- Delete: `src/components/glass/GlassInfoBar.css`
- Delete: `src/components/glass/GlassControls.tsx`
- Delete: `src/components/glass/GlassControls.css`
- Delete: `src/components/glass/GlassThumbnailStrip.tsx`
- Delete: `src/components/glass/GlassThumbnailStrip.css`
- Delete: `src/components/glass/index.ts`
- Delete: `src/styles/glass-tokens.css`
- Delete: `src/styles/glass-layers.css`
- Delete: `src/components/ui/button.tsx`
- Delete: `src/components/ui/card.tsx`
- Delete: `src/components/ui/scroll-area.tsx`
- Delete: `src/components/ui/badge.tsx`
- Delete: `src/components/ui/slider.tsx`
- Delete: `src/components/layout/AmbientBackground.tsx`
- Delete: `src/components/layout/AmbientBackground.css`
- Delete: `src/components/layout/DreamscapeBackground/` (entire directory)
- Delete: `src/components/layout/PageShell/` (entire directory)
- Delete: `src/components/core/` (entire directory)
- Delete: `src/components/effects/` (entire directory)
- Delete: `src/components/navigation/` (entire directory)
- Delete: `src/components/video/` (entire directory)
- Modify: `src/components/layout/index.ts` (clear old exports)
- Modify: `src/index.css` (remove glass imports)
- Modify: `src/App.tsx` (strip to minimal shell)
- Modify: `src/App.css` (clear old styles)

- [ ] **Step 1: Delete all glass components and their CSS**

```bash
rm -rf src/components/glass/
rm -rf src/components/ui/
rm -rf src/components/core/
rm -rf src/components/effects/
rm -rf src/components/navigation/
rm -rf src/components/video/
rm -rf src/components/layout/AmbientBackground.tsx
rm -rf src/components/layout/AmbientBackground.css
rm -rf src/components/layout/DreamscapeBackground/
rm -rf src/components/layout/PageShell/
```

- [ ] **Step 2: Delete old style files**

```bash
rm src/styles/glass-tokens.css src/styles/glass-layers.css
```

Also delete `src/styles/layers.css` if it exists (old file).

- [ ] **Step 3: Clear layout barrel export**

Replace `src/components/layout/index.ts` with empty file:

```ts
// Layout components - populated by new ambient interface
```

- [ ] **Step 4: Strip index.css to minimal**

Replace `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    overflow: hidden;
  }
}
```

- [ ] **Step 5: Strip App.tsx to minimal shell**

Replace `src/App.tsx` with:

```tsx
import './App.css';

function App() {
  return (
    <div className="app">
      <p style={{ color: 'white' }}>Ambient Interface — shell ready</p>
    </div>
  );
}

export default App;
```

- [ ] **Step 6: Clear App.css**

Replace `src/App.css` with:

```css
.app {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 7: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with no errors. The shell renders white text on default background.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: remove glassmorphism components and old styles"
```

---

## Task 2: Create Design Tokens

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/index.css` (import tokens)

- [ ] **Step 1: Create tokens.css**

Create `src/styles/tokens.css`:

```css
:root {
  /* Void Background */
  --void-base: hsl(240, 30%, 6%);
  --void-mid: hsl(240, 20%, 10%);

  /* Accent */
  --accent: hsl(220, 70%, 55%);
  --accent-dim: hsl(220 70% 55% / 0.25);
  --accent-glow: hsl(220 70% 55% / 0.06);

  /* Text */
  --text-primary: rgba(255, 255, 255, 0.9);
  --text-secondary: hsl(220 70% 55% / 0.5);
  --text-muted: rgba(255, 255, 255, 0.25);
  --text-ghost: rgba(255, 255, 255, 0.15);

  /* Typography */
  --font-mono: 'SF Mono', 'Monaco', 'Cascadia Code', 'Courier New', monospace;

  /* Spacing */
  --radius: 6px;

  /* Timing */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 400ms;
}
```

- [ ] **Step 2: Import tokens in index.css**

Update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import './styles/tokens.css';

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    overflow: hidden;
    font-family: var(--font-mono);
    color: var(--text-primary);
    background: var(--void-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer utilities {
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. Shell text now renders in monospace on deep blue-black background.

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.css src/index.css
git commit -m "feat: add PS2 ambient interface design tokens"
```

---

## Task 3: Create Ambient Background

**Files:**
- Create: `src/components/ambient/AmbientBackground.tsx`
- Create: `src/styles/ambient.css`
- Modify: `src/index.css` (import ambient.css)
- Modify: `src/App.tsx` (add background)

- [ ] **Step 1: Create ambient.css**

Create `src/styles/ambient.css`:

```css
.ambient-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.ambient-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, var(--void-base) 0%, var(--void-mid) 50%, var(--void-base) 100%);
}

.ambient-grid {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
  background-size: 40px 40px;
}

.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: orb-drift 60s ease-in-out infinite alternate;
}

.ambient-orb-1 {
  width: 600px;
  height: 600px;
  top: -150px;
  left: -100px;
  background: radial-gradient(circle, hsl(230 50% 30% / 0.12) 0%, transparent 70%);
}

.ambient-orb-2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  right: -80px;
  background: radial-gradient(circle, hsl(240 40% 20% / 0.08) 0%, transparent 70%);
  animation-delay: -30s;
}

@keyframes orb-drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(80px, 60px); }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-orb {
    animation: none;
  }
}
```

- [ ] **Step 2: Create AmbientBackground component**

Create `src/components/ambient/AmbientBackground.tsx`:

```tsx
import '@/styles/ambient.css';

export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-base" />
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
    </div>
  );
}
```

- [ ] **Step 3: Import ambient.css in index.css and add to App**

Add to `src/index.css` after the tokens import:

```css
@import './styles/ambient.css';
```

Update `src/App.tsx`:

```tsx
import { AmbientBackground } from './components/ambient/AmbientBackground';
import './App.css';

function App() {
  return (
    <>
      <AmbientBackground />
      <div className="app">
        <p>Ambient Interface — background ready</p>
      </div>
    </>
  );
}

export default App;
```

- [ ] **Step 4: Verify build and visual**

```bash
npm run build
```

Expected: Build passes. Deep blue-black void with subtle grid lines and two slowly drifting blue orbs visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/ambient/ src/styles/ambient.css src/index.css src/App.tsx
git commit -m "feat: add ambient void background with grid and orbs"
```

---

## Task 4: Create Header Component

**Files:**
- Create: `src/components/header/Header.tsx`
- Create: `src/components/header/Header.css`
- Modify: `src/App.tsx` (add header)

- [ ] **Step 1: Create Header.css**

Create `src/components/header/Header.css`:

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.header-title {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.header-filters {
  display: flex;
  gap: 20px;
}

.header-filter {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  border: none;
  background: none;
  font-family: var(--font-mono);
  padding: 4px 0;
  position: relative;
  transition: color var(--duration-fast) ease;
}

.header-filter:hover {
  color: rgba(255, 255, 255, 0.4);
}

.header-filter[data-active='true'] {
  color: var(--text-secondary);
}

.header-filter[data-active='true']::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent-dim);
}
```

- [ ] **Step 2: Create Header component**

Create `src/components/header/Header.tsx`:

```tsx
import './Header.css';

const FILTERS = ['All', 'Recent', 'Favorites'] as const;

interface HeaderProps {
  activeFilter?: string;
  dimmed?: boolean;
}

export function Header({ activeFilter = 'All', dimmed }: HeaderProps) {
  return (
    <header className="header" style={dimmed ? { opacity: 0.3 } : undefined}>
      <div className="header-title">Music Online</div>
      <nav className="header-filters" aria-label="Content filters">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className="header-filter"
            data-active={filter === activeFilter}
            aria-current={filter === activeFilter ? 'page' : undefined}
          >
            {filter}
          </button>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Add Header to App**

Update `src/App.tsx`:

```tsx
import { AmbientBackground } from './components/ambient/AmbientBackground';
import { Header } from './components/header/Header';
import './App.css';

function App() {
  return (
    <>
      <AmbientBackground />
      <div className="app">
        <Header />
        <p>Stage goes here</p>
      </div>
    </>
  );
}

export default App;
```

Update `src/App.css`:

```css
.app {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build passes. Header visible top of viewport: "MUSIC ONLINE" left, "ALL RECENT FAVORITES" right, very dim monospace text.

- [ ] **Step 5: Commit**

```bash
git add src/components/header/ src/App.tsx src/App.css
git commit -m "feat: add minimal header with category filters"
```

---

## Task 5: Create Targeting Brackets Component

**Files:**
- Create: `src/components/stage/TargetingBrackets.tsx`
- Create: `src/components/stage/TargetingBrackets.css`

- [ ] **Step 1: Create TargetingBrackets.css**

Create `src/components/stage/TargetingBrackets.css`:

```css
.bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  z-index: 4;
  transition: all var(--duration-fast) ease;
  pointer-events: none;
}

.bracket-tl {
  top: 8px;
  left: 8px;
  border-top: 1px solid var(--accent-dim);
  border-left: 1px solid var(--accent-dim);
}

.bracket-tr {
  top: 8px;
  right: 8px;
  border-top: 1px solid var(--accent-dim);
  border-right: 1px solid var(--accent-dim);
}

.bracket-bl {
  bottom: 8px;
  left: 8px;
  border-bottom: 1px solid var(--accent-dim);
  border-left: 1px solid var(--accent-dim);
}

.bracket-br {
  bottom: 8px;
  right: 8px;
  border-bottom: 1px solid var(--accent-dim);
  border-right: 1px solid var(--accent-dim);
}

.brackets-hover:hover .bracket {
  width: 17px;
  height: 17px;
}

.brackets-hover:hover .bracket-tl {
  top: 5px;
  left: 5px;
  border-color: hsl(220 70% 55% / 0.4);
}

.brackets-hover:hover .bracket-tr {
  top: 5px;
  right: 5px;
  border-color: hsl(220 70% 55% / 0.4);
}

.brackets-hover:hover .bracket-bl {
  bottom: 5px;
  left: 5px;
  border-color: hsl(220 70% 55% / 0.4);
}

.brackets-hover:hover .bracket-br {
  bottom: 5px;
  right: 5px;
  border-color: hsl(220 70% 55% / 0.4);
}
```

- [ ] **Step 2: Create TargetingBrackets component**

Create `src/components/stage/TargetingBrackets.tsx`:

```tsx
import './TargetingBrackets.css';

export function TargetingBrackets() {
  return (
    <>
      <div className="bracket bracket-tl" />
      <div className="bracket bracket-tr" />
      <div className="bracket bracket-bl" />
      <div className="bracket bracket-br" />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build passes (component not yet used, but no compile errors).

- [ ] **Step 4: Commit**

```bash
git add src/components/stage/
git commit -m "feat: add targeting brackets component"
```

---

## Task 6: Create GhostCard and ActiveCard Components

**Files:**
- Create: `src/components/stage/GhostCard.tsx`
- Create: `src/components/stage/GhostCard.css`
- Create: `src/components/stage/ActiveCard.tsx`
- Create: `src/components/stage/ActiveCard.css`

- [ ] **Step 1: Create GhostCard.css**

Create `src/components/stage/GhostCard.css`:

```css
.ghost-card {
  position: absolute;
  width: 55%;
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--duration-slow) var(--ease-out);
}

.ghost-card:hover {
  opacity: 0.55;
}

.ghost-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.ghost-card-prev {
  left: 0;
  opacity: 0.35;
  transform: translateX(-15px) scale(0.85);
}

.ghost-card-prev:hover {
  transform: translateX(-15px) scale(0.88);
}

.ghost-card-next {
  right: 0;
  opacity: 0.35;
  transform: translateX(15px) scale(0.85);
}

.ghost-card-next:hover {
  transform: translateX(15px) scale(0.88);
}

.ghost-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: saturate(0.3);
}

@media (prefers-reduced-motion: reduce) {
  .ghost-card {
    transition: opacity var(--duration-fast) ease;
  }

  .ghost-card-prev:hover,
  .ghost-card-next:hover {
    transform: translateX(0) scale(0.85);
  }
}
```

- [ ] **Step 2: Create GhostCard component**

Create `src/components/stage/GhostCard.tsx`:

```tsx
import './GhostCard.css';

interface GhostCardProps {
  position: 'prev' | 'next';
  thumbnail: string;
  title: string;
  onClick: () => void;
}

export function GhostCard({ position, thumbnail, title, onClick }: GhostCardProps) {
  return (
    <button
      className={`ghost-card ghost-card-${position}`}
      onClick={onClick}
      aria-label={`Go to ${title}`}
    >
      <img
        src={thumbnail}
        alt=""
        className="ghost-card-image"
        loading="lazy"
      />
    </button>
  );
}
```

- [ ] **Step 3: Create ActiveCard.css**

Create `src/components/stage/ActiveCard.css`:

```css
.active-card {
  position: relative;
  width: 62%;
  aspect-ratio: 16 / 9;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid hsl(220 70% 55% / 0.15);
  border-radius: var(--radius);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 60px var(--accent-glow);
  z-index: 2;
  cursor: pointer;
  overflow: hidden;
  transition: all var(--duration-slow) var(--ease-out);
}

.active-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.active-card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  border-radius: calc(var(--radius) - 1px);
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-left: 24px solid rgba(255, 255, 255, 0.6);
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  z-index: 3;
  transition: all var(--duration-fast) ease;
  pointer-events: none;
}

.active-card:hover .play-icon {
  border-left-color: rgba(255, 255, 255, 0.85);
  filter: drop-shadow(0 0 12px hsl(220 70% 55% / 0.4));
}

@media (prefers-reduced-motion: reduce) {
  .active-card {
    transition: opacity var(--duration-fast) ease;
  }
}
```

- [ ] **Step 4: Create ActiveCard component**

Create `src/components/stage/ActiveCard.tsx`:

```tsx
import { TargetingBrackets } from './TargetingBrackets';
import './ActiveCard.css';

interface ActiveCardProps {
  thumbnail: string;
  title: string;
  onClick: () => void;
}

export function ActiveCard({ thumbnail, title, onClick }: ActiveCardProps) {
  return (
    <button
      className="active-card brackets-hover"
      onClick={onClick}
      aria-label={`Play ${title}`}
      aria-current="true"
    >
      <img
        src={thumbnail}
        alt={title}
        className="active-card-image"
      />
      <div className="play-icon" />
      <TargetingBrackets />
    </button>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build passes.

- [ ] **Step 6: Commit**

```bash
git add src/components/stage/
git commit -m "feat: add ActiveCard, GhostCard, and TargetingBrackets"
```

---

## Task 7: Create CardStage Container

**Files:**
- Create: `src/components/stage/CardStage.tsx`
- Create: `src/components/stage/CardStage.css`
- Modify: `src/App.tsx` (add stage)

- [ ] **Step 1: Create CardStage.css**

Create `src/components/stage/CardStage.css`:

```css
.stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 0;
}

.card-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 2: Create CardStage component**

Create `src/components/stage/CardStage.tsx`:

```tsx
import type { Video } from '@/types/video';
import { ActiveCard } from './ActiveCard';
import { GhostCard } from './GhostCard';
import './CardStage.css';

interface CardStageProps {
  videos: Video[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onPlay: () => void;
}

export function CardStage({ videos, currentIndex, onNavigate, onPlay }: CardStageProps) {
  const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
  const current = videos[currentIndex];
  const prev = videos[prevIndex];
  const next = videos[nextIndex];

  return (
    <div className="stage">
      <div className="card-container">
        <GhostCard
          position="prev"
          thumbnail={prev.thumbnail}
          title={prev.title}
          onClick={() => onNavigate(prevIndex)}
        />

        <ActiveCard
          thumbnail={current.thumbnail}
          title={current.title}
          onClick={onPlay}
        />

        <GhostCard
          position="next"
          thumbnail={next.thumbnail}
          title={next.title}
          onClick={() => onNavigate(nextIndex)}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire CardStage into App**

Update `src/App.tsx`:

```tsx
import { useState } from 'react';
import { AmbientBackground } from './components/ambient/AmbientBackground';
import { Header } from './components/header/Header';
import { CardStage } from './components/stage/CardStage';
import type { Video } from './types/video';
import './App.css';

const videos: Video[] = [
  {
    id: 1,
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    thumbnail: 'https://picsum.photos/seed/video1/1280/720',
    url: 'https://www.youtube-nocookie.com/embed/0cDe2pK4SoU?si=ZBtbDhW4dMFobigD&controls=0',
  },
  {
    id: 2,
    title: 'Electric Pulse',
    artist: 'Digital Horizon',
    thumbnail: 'https://picsum.photos/seed/video2/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 3,
    title: 'Cyber Rain',
    artist: 'Tokyo Nights',
    thumbnail: 'https://picsum.photos/seed/video3/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 4,
    title: 'Midnight Drive',
    artist: 'RetroWave',
    thumbnail: 'https://picsum.photos/seed/video4/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 5,
    title: 'Quantum Echo',
    artist: 'Future Bass',
    thumbnail: 'https://picsum.photos/seed/video5/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePlay = () => {
    console.log('Play:', videos[currentIndex].title);
  };

  return (
    <>
      <AmbientBackground />
      <div className="app">
        <Header />
        <CardStage
          videos={videos}
          currentIndex={currentIndex}
          onNavigate={handleNavigate}
          onPlay={handlePlay}
        />
      </div>
    </>
  );
}

export default App;
```

- [ ] **Step 4: Verify build and visual**

```bash
npm run build
```

Expected: Build passes. Three cards visible — ghost cards flanking center active card with targeting brackets and play icon. Clicking ghost cards switches active item.

- [ ] **Step 5: Commit**

```bash
git add src/components/stage/CardStage.tsx src/components/stage/CardStage.css src/App.tsx
git commit -m "feat: add CardStage with spatial card navigation"
```

---

## Task 8: Create InfoStrip Component

**Files:**
- Create: `src/components/info/InfoStrip.tsx`
- Create: `src/components/info/InfoStrip.css`
- Modify: `src/App.tsx` (add info strip)

- [ ] **Step 1: Create InfoStrip.css**

Create `src/components/info/InfoStrip.css`:

```css
.info-strip {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 20px;
}

.info-title {
  font-size: 15px;
  color: var(--text-primary);
  letter-spacing: 0.02em;
  font-family: var(--font-mono);
}

.info-artist {
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 3px;
  letter-spacing: 0.04em;
  font-family: var(--font-mono);
}

.info-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pagination {
  display: flex;
  gap: 6px;
  align-items: center;
}

.dot {
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-ghost);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-spring);
  font-size: 0;
}

/* 44px touch target via invisible pseudo-element */
.dot::before {
  content: '';
  position: absolute;
  inset: -19px;
}

.dot:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.dot[data-active='true'] {
  width: 16px;
  border-radius: 3px;
  background: hsl(220 70% 55% / 0.6);
}

.info-counter {
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  font-family: var(--font-mono);
}
```

- [ ] **Step 2: Create InfoStrip component**

Create `src/components/info/InfoStrip.tsx`:

```tsx
import './InfoStrip.css';

interface InfoStripProps {
  title: string;
  artist: string;
  currentIndex: number;
  totalCount: number;
  onDotClick: (index: number) => void;
}

export function InfoStrip({ title, artist, currentIndex, totalCount, onDotClick }: InfoStripProps) {
  return (
    <div className="info-strip">
      <div>
        <div className="info-title">{title}</div>
        <div className="info-artist">{artist}</div>
      </div>
      <div className="info-nav">
        <div className="pagination" role="tablist" aria-label="Video selection">
          {Array.from({ length: totalCount }).map((_, i) => (
            <button
              key={i}
              className="dot"
              data-active={i === currentIndex}
              onClick={() => onDotClick(i)}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Video ${i + 1}`}
            />
          ))}
        </div>
        <div className="info-counter">
          {String(currentIndex + 1).padStart(2, '0')}/{String(totalCount).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add InfoStrip to App**

Add to `src/App.tsx` JSX, after `<CardStage>`:

```tsx
import { InfoStrip } from './components/info/InfoStrip';

// Inside return, after CardStage:
<InfoStrip
  title={videos[currentIndex].title}
  artist={videos[currentIndex].artist}
  currentIndex={currentIndex}
  totalCount={videos.length}
  onDotClick={handleNavigate}
/>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build passes. Info strip visible below stage: title/artist left, pagination dots + counter right. Active dot is elongated pill.

- [ ] **Step 5: Commit**

```bash
git add src/components/info/ src/App.tsx
git commit -m "feat: add InfoStrip with pagination dots and counter"
```

---

## Task 9: Add Keyboard Navigation and Accessibility

**Files:**
- Modify: `src/App.tsx` (keyboard handlers, aria-live region)

- [ ] **Step 1: Add keyboard navigation and aria-live to App**

Update `src/App.tsx` — add `useEffect` for keyboard handler and aria-live region:

```tsx
import { useState, useEffect } from 'react';

// Inside App component, after state declarations:
const handlePrevious = () => {
  setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
};

const handleNext = () => {
  setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
};

useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (mode !== 'browse') return; // Watch mode handles its own keys

    switch (event.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Home':
        setCurrentIndex(0);
        break;
      case 'End':
        setCurrentIndex(videos.length - 1);
        break;
      case ' ':
      case 'Enter':
        if (event.target === document.body) {
          event.preventDefault();
          handlePlay();
        }
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentIndex, mode]);
```

Add `mode` state:

```tsx
const [mode, setMode] = useState<'browse' | 'watch'>('browse');
```

Update `handlePlay`:

```tsx
const handlePlay = () => {
  setMode('watch');
};
```

Add aria-live region to JSX before closing `</>`:

```tsx
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  Now viewing: {videos[currentIndex].title} by {videos[currentIndex].artist}.
  Video {currentIndex + 1} of {videos.length}.
</div>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes. Arrow keys navigate between cards. Home/End jump to first/last.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add keyboard navigation and aria-live announcements"
```

---

## Task 10: Create WatchMode Components

**Files:**
- Create: `src/components/watch/WatchHUD.tsx`
- Create: `src/components/watch/WatchHUD.css`
- Create: `src/components/watch/WatchMode.tsx`
- Create: `src/components/watch/WatchMode.css`
- Modify: `src/App.tsx` (integrate watch state)

- [ ] **Step 1: Create WatchHUD.css**

Create `src/components/watch/WatchHUD.css`:

```css
.watch-hud {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 5;
  transition: opacity var(--duration-normal) ease;
}

.watch-hud[data-visible='false'] {
  opacity: 0;
}

.watch-hud[data-visible='true'] {
  opacity: 0.7;
}

.watch-hud-title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.04em;
  font-family: var(--font-mono);
}

.watch-hud-artist {
  font-size: 9px;
  color: var(--text-secondary);
  margin-top: 2px;
  font-family: var(--font-mono);
}
```

- [ ] **Step 2: Create WatchHUD component**

Create `src/components/watch/WatchHUD.tsx`:

```tsx
import { useState, useEffect, useCallback } from 'react';
import './WatchHUD.css';

interface WatchHUDProps {
  title: string;
  artist: string;
}

export function WatchHUD({ title, artist }: WatchHUDProps) {
  const [visible, setVisible] = useState(true);

  const showHUD = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleMouseMove = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timer = setTimeout(() => setVisible(false), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [showHUD]);

  return (
    <div className="watch-hud" data-visible={visible}>
      <div className="watch-hud-title">{title}</div>
      <div className="watch-hud-artist">{artist}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create WatchMode.css**

Create `src/components/watch/WatchMode.css`:

```css
.watch-mode {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
}

.watch-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.watch-card {
  width: 95%;
  max-width: 1200px;
  aspect-ratio: 16 / 9;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid hsl(220 70% 55% / 0.1);
  border-radius: var(--radius);
  position: relative;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 80px var(--accent-glow);
  overflow: hidden;
}

.watch-card iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: calc(var(--radius) - 1px);
}

.watch-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 0 var(--radius) var(--radius);
  overflow: hidden;
  z-index: 5;
}

.watch-accent-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, hsl(220 70% 55% / 0.6), hsl(220 70% 55% / 0.3));
}

.watch-hint {
  text-align: center;
  margin-top: 16px;
  font-size: 9px;
  color: var(--text-ghost);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: var(--font-mono);
  flex-shrink: 0;
}
```

- [ ] **Step 4: Create WatchMode component**

Create `src/components/watch/WatchMode.tsx`:

```tsx
import { Header } from '@/components/header/Header';
import { TargetingBrackets } from '@/components/stage/TargetingBrackets';
import { WatchHUD } from './WatchHUD';
import type { Video } from '@/types/video';
import './WatchMode.css';

interface WatchModeProps {
  video: Video;
  onExit: () => void;
}

export function WatchMode({ video, onExit }: WatchModeProps) {
  return (
    <div className="watch-mode" onClick={(e) => {
      if (e.target === e.currentTarget) onExit();
    }}>
      <Header dimmed />

      <div className="watch-viewport">
        <div className="watch-card">
          <iframe
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <TargetingBrackets />
          <WatchHUD title={video.title} artist={video.artist} />
          <div className="watch-accent-line">
            <div className="watch-accent-fill" />
          </div>
        </div>
      </div>

      <div className="watch-hint">
        Press ESC to return &middot; {video.title}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Integrate WatchMode into App**

Update `src/App.tsx` to conditionally render browse or watch mode:

```tsx
import { WatchMode } from './components/watch/WatchMode';

// In JSX return:
{mode === 'browse' ? (
  <>
    <div className="app">
      <Header />
      <CardStage
        videos={videos}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
        onPlay={handlePlay}
      />
      <InfoStrip
        title={videos[currentIndex].title}
        artist={videos[currentIndex].artist}
        currentIndex={currentIndex}
        totalCount={videos.length}
        onDotClick={handleNavigate}
      />
    </div>
  </>
) : (
  <WatchMode
    video={videos[currentIndex]}
    onExit={() => setMode('browse')}
  />
)}
```

Add Escape key handler to the keyboard useEffect:

```tsx
case 'Escape':
  if (mode === 'watch') {
    setMode('browse');
  }
  break;
```

Remove the `if (mode !== 'browse') return;` guard at the top of the keydown handler since we now handle Escape in watch mode too.

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: Build passes. Clicking the active card or pressing Enter enters Watch mode. Pressing Escape returns to Browse. Iframe loads the video URL.

- [ ] **Step 7: Commit**

```bash
git add src/components/watch/ src/App.tsx
git commit -m "feat: add WatchMode with auto-hiding HUD and iframe playback"
```

---

## Task 11: Simplify Tailwind Config and Clean Up

**Files:**
- Modify: `tailwind.config.ts` (strip shadcn theme extensions)
- Modify: `src/styles/index.css` (remove if unused)
- Delete: `src/lib/utils.ts` (no longer needed — no shadcn cn() usage)
- Modify: `src/App.css` (final layout styles)

- [ ] **Step 1: Simplify tailwind.config.ts**

Replace `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 2: Delete unused files**

```bash
rm -f src/lib/utils.ts
rm -f src/styles/index.css
rm -f src/styles/layers.css
```

Remove the `src/lib/` directory if empty:

```bash
rmdir src/lib/ 2>/dev/null || true
```

- [ ] **Step 3: Remove unused dependencies**

```bash
npm uninstall @radix-ui/react-scroll-area @radix-ui/react-slider @radix-ui/react-slot class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build passes. No unused import errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: clean up unused shadcn deps, simplify tailwind config"
```

---

## Task 12: Final Polish and Production Verification

**Files:**
- Modify: `src/App.css` (ensure final layout is correct)
- Verify: Production build and all interactions

- [ ] **Step 1: Ensure App.css has correct layout**

`src/App.css` should be:

```css
.app {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
}

@media (max-width: 768px) {
  .app {
    padding: 16px;
  }
}
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors or warnings.

- [ ] **Step 3: Check bundle size**

```bash
ls -lh dist/assets/
```

Expected: JS bundle significantly smaller than before (removed shadcn/radix/lucide deps). Should be well under 200KB gzipped.

- [ ] **Step 4: Test all interactions**

Run preview:

```bash
npm run preview
```

Test checklist:
- [ ] Ambient background: void gradient visible, grid lines visible, two orbs slowly drifting
- [ ] Header: "MUSIC ONLINE" left, "ALL RECENT FAVORITES" right, very dim
- [ ] Browse state: three cards visible (ghost-active-ghost), targeting brackets on active
- [ ] Active card hover: brackets expand outward, play icon brightens
- [ ] Ghost card hover: opacity lifts, slight scale up
- [ ] Ghost card click: navigates to that item
- [ ] Active card click: enters Watch mode
- [ ] Watch mode: iframe loads, brackets frame video, HUD auto-hides after 3s
- [ ] Watch mode HUD: reappears on mouse move
- [ ] Escape key: returns to Browse
- [ ] Arrow keys: Left/Right navigate in Browse mode
- [ ] Home/End: jump to first/last
- [ ] Pagination dots: click navigates, active dot is elongated pill
- [ ] Info strip: title and artist update on navigation
- [ ] Counter: shows current/total in monospace

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: PS2 ambient interface redesign complete"
```

---

## Success Criteria Checklist

- [ ] Single-screen, no-scroll spatial card layout
- [ ] Browse ↔ Watch state transitions
- [ ] Monospace typography throughout
- [ ] Cold blue-violet color palette only
- [ ] Ambient void background (orbs + grid, no scan lines/particles)
- [ ] Targeting brackets with hover lock-on animation
- [ ] Ghost card navigation with hover lift
- [ ] Full keyboard navigation (arrows, Enter, Escape, Home, End)
- [ ] `prefers-reduced-motion` support
- [ ] Screen reader announcements via aria-live region
- [ ] Production build passes
- [ ] All shadcn/glass components removed
- [ ] Unused dependencies removed
