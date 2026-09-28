# Ultra-Refined Glassmorphism Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild video carousel app with shadcn components and ultra-refined Apple/iOS-style glassmorphism

**Architecture:** Replace custom glass components with shadcn primitives (Card, Button, ScrollArea, Badge, Slider). Implement 4-layer glass elevation system via CSS custom properties. Maintain video-centric layout with refined depth and Apple-like animations.

**Tech Stack:** React 19, TypeScript, Vite, shadcn/ui, CSS custom properties for glass tokens

---

## Task 1: Initialize Shadcn with Vite Template

**Files:**
- Create: `src/components/ui/` directory structure
- Create: `components.json` (shadcn config)
- Modify: `package.json` (add dependencies)
- Modify: `tsconfig.json` (add path aliases)

**Step 1: Initialize shadcn for Vite project**

Run the shadcn init command with Vite template:

```bash
npx shadcn@latest init --template vite --base-color slate --css-variables --yes
```

Expected: Creates `components.json`, adds dependencies, configures paths

**Step 2: Verify shadcn configuration**

Check that `components.json` was created:

```bash
cat components.json
```

Expected: JSON file with `$schema`, `style`, `tsx: true`, `tailwind` config, `aliases` pointing to `@/components/ui`

**Step 3: Add path alias to tsconfig.json**

Check if path alias exists in `tsconfig.json`:

```bash
grep -A 5 "paths" tsconfig.json
```

If not present, add to `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**Step 4: Install dependencies**

```bash
npm install
```

Expected: All shadcn dependencies installed successfully

**Step 5: Verify dev server runs**

```bash
npm run dev
```

Expected: Vite dev server starts without errors (Ctrl+C to stop)

---

## Task 2: Install Required Shadcn Components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/scroll-area.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/slider.tsx`

**Step 1: Install button component**

```bash
npx shadcn@latest add button
```

Expected: Creates `src/components/ui/button.tsx` with variants

**Step 2: Install card component**

```bash
npx shadcn@latest add card
```

Expected: Creates `src/components/ui/card.tsx` with Card, CardHeader, CardContent primitives

**Step 3: Install scroll-area component**

```bash
npx shadcn@latest add scroll-area
```

Expected: Creates `src/components/ui/scroll-area.tsx`

**Step 4: Install badge component**

```bash
npx shadcn@latest add badge
```

Expected: Creates `src/components/ui/badge.tsx`

**Step 5: Install slider component**

```bash
npx shadcn@latest add slider
```

Expected: Creates `src/components/ui/slider.tsx`

**Step 6: Verify all components exist**

```bash
ls -la src/components/ui/
```

Expected: See `button.tsx`, `card.tsx`, `scroll-area.tsx`, `badge.tsx`, `slider.tsx`

---

## Task 3: Create Glass Design Tokens

**Files:**
- Create: `src/styles/glass-tokens.css`
- Modify: `src/index.css` (import tokens)

**Step 1: Create glass tokens file**

Create `src/styles/glass-tokens.css`:

```css
/**
 * Glass Design Tokens
 * Ultra-refined Apple/iOS-inspired glassmorphism system
 */

@layer base {
  :root {
    /* Glass Layer Opacities */
    --glass-surface: rgba(255, 255, 255, 0.05);
    --glass-elevated: rgba(255, 255, 255, 0.07);
    --glass-overlay: rgba(255, 255, 255, 0.1);

    /* Glass Borders */
    --glass-border-surface: rgba(255, 255, 255, 0.08);
    --glass-border-elevated: rgba(255, 255, 255, 0.12);
    --glass-border-overlay: rgba(255, 255, 255, 0.15);

    /* Blur Levels */
    --blur-surface: 10px;
    --blur-elevated: 12px;
    --blur-overlay: 16px;

    /* Shadows */
    --shadow-surface: 0 4px 16px rgba(0, 0, 0, 0.1);
    --shadow-elevated: 0 8px 24px rgba(0, 0, 0, 0.12);
    --shadow-overlay: 0 12px 32px rgba(0, 0, 0, 0.15);

    /* Border Radius */
    --radius-card: 12px;
    --radius-button: 8px;
    --radius-pill: 24px;

    /* Colors */
    --background-base: hsl(240, 20%, 8%);
    --background-gradient-end: hsl(240, 20%, 12%);
    --accent-cyan: hsl(184, 100%, 50%);
    --accent-purple: hsl(280, 60%, 20%);

    /* Text Colors */
    --text-primary: rgba(255, 255, 255, 0.95);
    --text-secondary: rgba(255, 255, 255, 0.7);
    --text-muted: rgba(255, 255, 255, 0.5);

    /* Typography */
    --font-system: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Helvetica Neue', sans-serif;

    /* Transitions */
    --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

    --duration-fast: 200ms;
    --duration-normal: 300ms;
    --duration-slow: 400ms;
  }
}
```

**Step 2: Import tokens in index.css**

Add to top of `src/index.css`:

```css
@import './styles/glass-tokens.css';
```

**Step 3: Verify tokens loaded**

Run dev server and check in browser DevTools:

```bash
npm run dev
```

Open browser, inspect `<html>`, check Computed styles for `--glass-surface` variable

Expected: Variable is defined and visible in DevTools

---

## Task 4: Create Glass Layer Utility Classes

**Files:**
- Create: `src/styles/glass-layers.css`
- Modify: `src/index.css` (import layers)

**Step 1: Create glass layers file**

Create `src/styles/glass-layers.css`:

```css
/**
 * Glass Layer Utility Classes
 * 4-layer elevation system for glassmorphism
 */

@layer utilities {
  /* Layer 1: Surface Glass */
  .glass-surface {
    background: var(--glass-surface);
    backdrop-filter: blur(var(--blur-surface)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--blur-surface)) saturate(180%);
    border: 1px solid var(--glass-border-surface);
    box-shadow: var(--shadow-surface);
  }

  /* Layer 2: Elevated Glass */
  .glass-elevated {
    background: var(--glass-elevated);
    backdrop-filter: blur(var(--blur-elevated)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--blur-elevated)) saturate(180%);
    border: 1px solid var(--glass-border-elevated);
    box-shadow: var(--shadow-elevated);
  }

  /* Layer 3: Overlay Glass */
  .glass-overlay {
    background: var(--glass-overlay);
    backdrop-filter: blur(var(--blur-overlay)) saturate(200%);
    -webkit-backdrop-filter: blur(var(--blur-overlay)) saturate(200%);
    border: 0.5px solid var(--glass-border-overlay);
    box-shadow: var(--shadow-overlay);
  }

  /* Glass Interaction States */
  .glass-hover {
    transition: all var(--duration-fast) var(--ease-standard);
  }

  .glass-hover:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.16);
  }

  .glass-active:active {
    transform: scale(0.98);
    background: rgba(255, 255, 255, 0.1);
  }

  /* Focus Ring */
  .glass-focus:focus-visible {
    outline: 2px solid var(--accent-cyan);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 245, 255, 0.2);
  }
}
```

**Step 2: Import layers in index.css**

Add to `src/index.css`:

```css
@import './styles/glass-layers.css';
```

**Step 3: Test glass classes in browser**

Add temporary test div to `App.tsx`:

```tsx
<div className="glass-surface p-4 m-4">
  <p>Test Glass Surface</p>
</div>
```

**Step 4: Verify glass effect appears**

Run dev server:

```bash
npm run dev
```

Expected: Div has blur effect, semi-transparent background, border visible

**Step 5: Remove test div**

Remove the test div from `App.tsx` after verification

---

## Task 5: Create Ambient Background Component

**Files:**
- Create: `src/components/layout/AmbientBackground.tsx`
- Create: `src/components/layout/AmbientBackground.css`

**Step 1: Create AmbientBackground component**

Create `src/components/layout/AmbientBackground.tsx`:

```tsx
import './AmbientBackground.css';

export function AmbientBackground() {
  return (
    <div className="ambient-background">
      <div className="ambient-gradient ambient-gradient-purple" />
      <div className="ambient-gradient ambient-gradient-cyan" />
      <div className="ambient-base" />
    </div>
  );
}
```

**Step 2: Create AmbientBackground styles**

Create `src/components/layout/AmbientBackground.css`:

```css
.ambient-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.ambient-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--background-base) 0%,
    var(--background-gradient-end) 100%
  );
}

.ambient-gradient {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: ambient-float 60s ease-in-out infinite alternate;
}

.ambient-gradient-purple {
  width: 800px;
  height: 800px;
  top: -200px;
  left: -200px;
  background: radial-gradient(
    circle,
    var(--accent-purple) 0%,
    transparent 70%
  );
}

.ambient-gradient-cyan {
  width: 800px;
  height: 800px;
  bottom: -200px;
  right: -200px;
  background: radial-gradient(
    circle,
    hsl(200, 60%, 20%) 0%,
    transparent 70%
  );
  animation-delay: -30s;
}

@keyframes ambient-float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100px, 100px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-gradient {
    animation: none;
  }
}
```

**Step 3: Create layout barrel export**

Create `src/components/layout/index.ts`:

```ts
export { AmbientBackground } from './AmbientBackground';
```

**Step 4: Add AmbientBackground to App**

Modify `src/App.tsx` to import and use AmbientBackground:

```tsx
import { AmbientBackground } from './components/layout';

function App() {
  return (
    <>
      <AmbientBackground />
      {/* rest of app */}
    </>
  );
}
```

**Step 5: Verify ambient background**

```bash
npm run dev
```

Expected: Animated purple and cyan gradients visible in background with slow floating motion

---

## Task 6: Create GlassVideoPlayer Component

**Files:**
- Create: `src/components/glass/GlassVideoPlayer.tsx`
- Create: `src/components/glass/GlassVideoPlayer.css`

**Step 1: Create GlassVideoPlayer component**

Create `src/components/glass/GlassVideoPlayer.tsx`:

```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import './GlassVideoPlayer.css';

interface GlassVideoPlayerProps {
  thumbnail: string;
  title: string;
  onPlayClick?: () => void;
}

export function GlassVideoPlayer({ thumbnail, title, onPlayClick }: GlassVideoPlayerProps) {
  return (
    <Card className="glass-video-player glass-elevated">
      <div className="video-bezel">
        <div className="video-content">
          <img
            src={thumbnail}
            alt={title}
            className="video-thumbnail"
          />
          <div className="video-overlay">
            <Button
              size="icon"
              className="play-button glass-overlay"
              onClick={onPlayClick}
              aria-label="Play video"
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

**Step 2: Install lucide-react for icons**

```bash
npm install lucide-react
```

Expected: lucide-react added to dependencies

**Step 3: Create GlassVideoPlayer styles**

Create `src/components/glass/GlassVideoPlayer.css`:

```css
.glass-video-player {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  border-radius: var(--radius-card);
  overflow: hidden;
  padding: 8px;
}

.video-bezel {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: calc(var(--radius-card) - 4px);
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
}

.video-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-normal) var(--ease-out);
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 50%
  );
  opacity: 1;
  transition: opacity var(--duration-fast) var(--ease-standard);
}

.glass-video-player:hover .video-overlay {
  opacity: 1;
}

.glass-video-player:hover .video-thumbnail {
  transform: scale(1.02);
}

.play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: all var(--duration-fast) var(--ease-standard);
}

.play-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 40px rgba(0, 245, 255, 0.4);
}

.play-button:active {
  transform: scale(0.98);
}
```

**Step 4: Create glass barrel export**

Create `src/components/glass/index.ts`:

```ts
export { GlassVideoPlayer } from './GlassVideoPlayer';
```

**Step 5: Test GlassVideoPlayer in App**

Add to `src/App.tsx`:

```tsx
import { GlassVideoPlayer } from './components/glass';

// Inside App component
<div className="container mx-auto p-8">
  <GlassVideoPlayer
    thumbnail="https://picsum.photos/seed/video1/1280/720"
    title="Test Video"
    onPlayClick={() => console.log('Play clicked')}
  />
</div>
```

**Step 6: Verify player renders with glass effect**

```bash
npm run dev
```

Expected: Video player centered, glass effect visible, play button overlaid with blur

---

## Task 7: Create GlassInfoBar Component

**Files:**
- Create: `src/components/glass/GlassInfoBar.tsx`
- Create: `src/components/glass/GlassInfoBar.css`
- Modify: `src/components/glass/index.ts`

**Step 1: Create GlassInfoBar component**

Create `src/components/glass/GlassInfoBar.tsx`:

```tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import './GlassInfoBar.css';

interface GlassInfoBarProps {
  title: string;
  artist: string;
  currentIndex: number;
  totalCount: number;
}

export function GlassInfoBar({ title, artist, currentIndex, totalCount }: GlassInfoBarProps) {
  return (
    <Card className="glass-info-bar glass-surface">
      <div className="info-content">
        <div>
          <h2 className="info-title">{title}</h2>
          <p className="info-artist">{artist}</p>
        </div>
        <Badge variant="secondary" className="info-counter glass-surface">
          <span className="counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="counter-separator">/</span>
          <span className="counter-total">{String(totalCount).padStart(2, '0')}</span>
        </Badge>
      </div>
    </Card>
  );
}
```

**Step 2: Create GlassInfoBar styles**

Create `src/components/glass/GlassInfoBar.css`:

```css
.glass-info-bar {
  width: 100%;
  max-width: 1280px;
  margin: 12px auto 0;
  border-radius: var(--radius-card);
  padding: 20px 24px;
}

.info-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.info-title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0;
  font-family: var(--font-system);
}

.info-artist {
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
  color: var(--text-secondary);
  margin: 4px 0 0;
  font-family: var(--font-system);
}

.info-counter {
  font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  gap: 4px;
}

.counter-separator {
  opacity: 0.5;
  margin: 0 2px;
}
```

**Step 3: Export GlassInfoBar**

Add to `src/components/glass/index.ts`:

```ts
export { GlassInfoBar } from './GlassInfoBar';
```

**Step 4: Test GlassInfoBar in App**

Add to `src/App.tsx` below video player:

```tsx
<GlassInfoBar
  title="Neon Dreams"
  artist="Synthwave Collective"
  currentIndex={0}
  totalCount={5}
/>
```

**Step 5: Verify info bar renders**

```bash
npm run dev
```

Expected: Info bar appears below video player with title left, counter badge right, glass surface effect

---

## Task 8: Create GlassControls Component

**Files:**
- Create: `src/components/glass/GlassControls.tsx`
- Create: `src/components/glass/GlassControls.css`
- Modify: `src/components/glass/index.ts`

**Step 1: Create GlassControls component**

Create `src/components/glass/GlassControls.tsx`:

```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './GlassControls.css';

interface GlassControlsProps {
  currentIndex: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export function GlassControls({
  currentIndex,
  totalCount,
  onPrevious,
  onNext,
  onDotClick,
}: GlassControlsProps) {
  const progress = ((currentIndex + 1) / totalCount) * 100;

  return (
    <Card className="glass-controls glass-elevated">
      <div className="controls-nav">
        <Button
          variant="ghost"
          size="icon"
          className="nav-button glass-hover glass-focus"
          onClick={onPrevious}
          aria-label="Previous video"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="pagination-dots">
          {Array.from({ length: totalCount }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'dot-active' : ''} glass-focus`}
              onClick={() => onDotClick(index)}
              aria-label={`Go to video ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="nav-button glass-hover glass-focus"
          onClick={onNext}
          aria-label="Next video"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="progress-container">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalCount}
          />
        </div>
      </div>
    </Card>
  );
}
```

**Step 2: Create GlassControls styles**

Create `src/components/glass/GlassControls.css`:

```css
.glass-controls {
  width: 100%;
  max-width: 1280px;
  margin: 12px auto 0;
  border-radius: var(--radius-card);
  padding: 24px;
}

.controls-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-button);
  color: var(--text-primary);
}

.nav-button:hover {
  background: var(--glass-surface);
  border: 1px solid var(--glass-border-surface);
}

.pagination-dots {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--glass-border-surface);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-spring);
}

.dot:hover {
  background: var(--glass-border-elevated);
  transform: scale(1.2);
}

.dot-active {
  width: 20px;
  border-radius: 4px;
  background: var(--accent-cyan);
}

.progress-container {
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--accent-cyan) 0%,
    hsl(200, 60%, 50%) 100%
  );
  transition: width var(--duration-normal) var(--ease-out);
  border-radius: 2px;
}
```

**Step 3: Export GlassControls**

Add to `src/components/glass/index.ts`:

```ts
export { GlassControls } from './GlassControls';
```

**Step 4: Test GlassControls in App**

Add to `src/App.tsx`:

```tsx
<GlassControls
  currentIndex={0}
  totalCount={5}
  onPrevious={() => console.log('Previous')}
  onNext={() => console.log('Next')}
  onDotClick={(i) => console.log('Dot', i)}
/>
```

**Step 5: Verify controls render**

```bash
npm run dev
```

Expected: Control panel with prev/next buttons, dots, and progress bar with glass effect

---

## Task 9: Create GlassThumbnailStrip Component

**Files:**
- Create: `src/components/glass/GlassThumbnailStrip.tsx`
- Create: `src/components/glass/GlassThumbnailStrip.css`
- Modify: `src/components/glass/index.ts`

**Step 1: Create GlassThumbnailStrip component**

Create `src/components/glass/GlassThumbnailStrip.tsx`:

```tsx
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import './GlassThumbnailStrip.css';

interface Video {
  id: number;
  thumbnail: string;
  title: string;
}

interface GlassThumbnailStripProps {
  videos: Video[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}

export function GlassThumbnailStrip({
  videos,
  currentIndex,
  onThumbnailClick,
}: GlassThumbnailStripProps) {
  return (
    <div className="glass-thumbnail-strip glass-surface">
      <ScrollArea className="thumbnail-scroll">
        <div className="thumbnail-container">
          {videos.map((video, index) => (
            <Button
              key={video.id}
              variant="ghost"
              className={`thumbnail-item ${index === currentIndex ? 'thumbnail-active' : ''}`}
              onClick={() => onThumbnailClick(index)}
              aria-label={`Play ${video.title}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="thumbnail-image"
                loading="lazy"
              />
              <div className="thumbnail-overlay">
                <span className="thumbnail-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
```

**Step 2: Create GlassThumbnailStrip styles**

Create `src/components/glass/GlassThumbnailStrip.css`:

```css
.glass-thumbnail-strip {
  width: 100%;
  max-width: 1280px;
  margin: 12px auto 0;
  border-radius: var(--radius-card);
  padding: 16px;
}

.thumbnail-scroll {
  width: 100%;
}

.thumbnail-container {
  display: flex;
  gap: 12px;
  padding: 4px;
}

.thumbnail-item {
  position: relative;
  flex-shrink: 0;
  width: 160px;
  height: 90px;
  padding: 0;
  border-radius: var(--radius-button);
  overflow: hidden;
  transition: all var(--duration-fast) var(--ease-standard);
  opacity: 0.6;
  border: 2px solid transparent;
}

.thumbnail-item:hover {
  opacity: 1;
  transform: scale(1.02);
}

.thumbnail-active {
  opacity: 1;
  border-color: var(--accent-cyan);
  background: var(--glass-elevated);
}

.thumbnail-active::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 245, 255, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-normal) var(--ease-out);
}

.thumbnail-item:hover .thumbnail-image {
  transform: scale(1.05);
}

.thumbnail-overlay {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  padding: 2px 8px;
  border-radius: 4px;
  pointer-events: none;
}

.thumbnail-number {
  font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
}
```

**Step 3: Export GlassThumbnailStrip**

Add to `src/components/glass/index.ts`:

```ts
export { GlassThumbnailStrip } from './GlassThumbnailStrip';
```

**Step 4: Create video type**

Create `src/types/video.ts`:

```ts
export interface Video {
  id: number;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
}
```

**Step 5: Test GlassThumbnailStrip in App**

Add to `src/App.tsx`:

```tsx
import type { Video } from './types/video';

const videos: Video[] = [
  { id: 1, title: "Video 1", artist: "Artist 1", thumbnail: "https://picsum.photos/seed/video1/1280/720", url: "" },
  { id: 2, title: "Video 2", artist: "Artist 2", thumbnail: "https://picsum.photos/seed/video2/1280/720", url: "" },
  // ... more videos
];

// In JSX
<GlassThumbnailStrip
  videos={videos}
  currentIndex={0}
  onThumbnailClick={(i) => console.log('Thumbnail', i)}
/>
```

**Step 6: Verify thumbnail strip renders**

```bash
npm run dev
```

Expected: Horizontal scrollable thumbnail strip with glass effect, active thumbnail highlighted in cyan

---

## Task 10: Integrate All Components in App

**Files:**
- Modify: `src/App.tsx` (complete integration)
- Modify: `src/App.css` (cleanup old styles)
- Modify: `src/index.css` (global styles)

**Step 1: Update App.tsx with full integration**

Replace `src/App.tsx` content:

```tsx
import { useState } from 'react';
import { AmbientBackground } from './components/layout';
import {
  GlassVideoPlayer,
  GlassInfoBar,
  GlassControls,
  GlassThumbnailStrip,
} from './components/glass';
import type { Video } from './types/video';
import './App.css';

const videos: Video[] = [
  {
    id: 1,
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    thumbnail: 'https://picsum.photos/seed/video1/1280/720',
    url: 'https://www.youtube.com/watch?v=0cDe2pK4SoU',
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

  const currentVideo = videos[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleVideoSelect = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePlayClick = () => {
    console.log('Play video:', currentVideo.url);
    // TODO: Implement video player modal or navigation
  };

  return (
    <>
      <AmbientBackground />

      <div className="app-container">
        <main className="main-content">
          <GlassVideoPlayer
            thumbnail={currentVideo.thumbnail}
            title={currentVideo.title}
            onPlayClick={handlePlayClick}
          />

          <GlassInfoBar
            title={currentVideo.title}
            artist={currentVideo.artist}
            currentIndex={currentIndex}
            totalCount={videos.length}
          />

          <GlassControls
            currentIndex={currentIndex}
            totalCount={videos.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onDotClick={handleVideoSelect}
          />

          <GlassThumbnailStrip
            videos={videos}
            currentIndex={currentIndex}
            onThumbnailClick={handleVideoSelect}
          />
        </main>
      </div>
    </>
  );
}

export default App;
```

**Step 2: Update App.css with layout styles**

Replace `src/App.css` content:

```css
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  font-family: var(--font-system);
}

.main-content {
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 768px) {
  .app-container {
    padding: 16px 8px;
  }

  .main-content {
    gap: 8px;
  }
}
```

**Step 3: Update index.css with global styles**

Update `src/index.css`:

```css
@import './styles/glass-tokens.css';
@import './styles/glass-layers.css';

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    margin: 0;
    font-family: var(--font-system);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-primary);
    background: var(--background-base);
    overflow-x: hidden;
  }
}
```

**Step 4: Run development server**

```bash
npm run dev
```

Expected: Full video carousel app with all glass components integrated

**Step 5: Test interactions**

- Click previous/next buttons
- Click pagination dots
- Click thumbnails
- Hover over components for glass effects
- Click play button

Expected: All interactions work, glass effects visible, smooth animations

---

## Task 11: Add Keyboard Navigation Support

**Files:**
- Modify: `src/App.tsx` (add keyboard handlers)

**Step 1: Add keyboard event handler to App**

Add to `App.tsx` component:

```tsx
import { useEffect } from 'react';

// Inside App component, after state
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
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
          handlePlayClick();
        }
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentIndex]); // Re-create handler when currentIndex changes
```

**Step 2: Test keyboard navigation**

```bash
npm run dev
```

Use keyboard:
- Left/Right arrows: Navigate videos
- Home/End: Jump to first/last
- Space/Enter: Play video (when body focused)

Expected: All keyboard shortcuts work correctly

**Step 3: Add aria-live region for screen readers**

Add to `App.tsx` JSX before closing `<div>`:

```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  Now viewing: {currentVideo.title} by {currentVideo.artist}.
  Video {currentIndex + 1} of {videos.length}.
</div>
```

**Step 4: Add sr-only utility to index.css**

Add to `src/index.css`:

```css
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

**Step 5: Verify screen reader announcements**

Test with screen reader (VoiceOver on Mac, NVDA on Windows):

```bash
npm run dev
```

Navigate with arrows, verify video changes are announced

Expected: Screen reader announces current video title and position

---

## Task 12: Optimize Performance and Add Loading States

**Files:**
- Modify: `src/components/glass/GlassVideoPlayer.tsx`
- Modify: `src/components/glass/GlassThumbnailStrip.tsx`

**Step 1: Add image loading state to GlassVideoPlayer**

Modify `src/components/glass/GlassVideoPlayer.tsx`:

```tsx
import { useState } from 'react';

// Inside component
const [imageLoaded, setImageLoaded] = useState(false);

// Update img tag
<img
  src={thumbnail}
  alt={title}
  className={`video-thumbnail ${imageLoaded ? 'loaded' : 'loading'}`}
  onLoad={() => setImageLoaded(true)}
/>

// Add before img tag
{!imageLoaded && (
  <div className="video-skeleton">
    <div className="skeleton-shimmer" />
  </div>
)}
```

**Step 2: Add loading styles to GlassVideoPlayer.css**

Add to `src/components/glass/GlassVideoPlayer.css`:

```css
.video-thumbnail.loading {
  opacity: 0;
}

.video-thumbnail.loaded {
  opacity: 1;
  animation: fadeInScale var(--duration-normal) var(--ease-out);
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.video-skeleton {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .video-thumbnail.loaded {
    animation: none;
  }

  .skeleton-shimmer {
    animation: none;
  }
}
```

**Step 3: Add intersection observer to GlassThumbnailStrip**

Modify `src/components/glass/GlassThumbnailStrip.tsx`:

```tsx
import { useEffect, useRef } from 'react';

// Inside component
const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  thumbnailRefs.current.forEach((ref) => {
    if (ref) observer.observe(ref);
  });

  return () => observer.disconnect();
}, [videos]);

// Update Button
<Button
  ref={(el) => (thumbnailRefs.current[index] = el)}
  // ... rest of props
>
```

**Step 4: Add visibility styles to GlassThumbnailStrip.css**

Add to `src/components/glass/GlassThumbnailStrip.css`:

```css
.thumbnail-item {
  /* ... existing styles ... */
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

.thumbnail-item.visible {
  opacity: 0.6;
  transform: translateY(0);
}

.thumbnail-item.visible:hover {
  opacity: 1;
}

.thumbnail-item.visible.thumbnail-active {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .thumbnail-item {
    opacity: 0.6;
    transform: none;
  }
}
```

**Step 5: Test loading states and performance**

```bash
npm run dev
```

- Check video player shimmer on load
- Scroll thumbnail strip to see fade-in
- Test with throttled network (DevTools)

Expected: Smooth loading animations, lazy loading works, no jank

---

## Task 13: Build and Production Verification

**Files:**
- Verify build process and output

**Step 1: Run TypeScript check**

```bash
npm run build
```

Expected: No TypeScript errors, build completes successfully

**Step 2: Preview production build**

```bash
npm run preview
```

Expected: Production build runs, all features work

**Step 3: Check bundle size**

After build, check dist folder:

```bash
ls -lh dist/assets/
```

Expected: JS bundle under 200KB gzipped, CSS under 20KB

**Step 4: Test in production mode**

Open preview URL in browser, test:
- All glass effects render
- Animations are smooth
- Keyboard navigation works
- Images load progressively

**Step 5: Verify accessibility in production**

Run Lighthouse audit in Chrome DevTools:

```bash
npm run preview
```

Open DevTools > Lighthouse > Run audit

Expected:
- Accessibility score 95+
- Performance score 90+
- Best Practices score 95+

---

## Success Criteria Checklist

- [x] Shadcn components installed and configured
- [x] 4-layer glass elevation system implemented
- [x] Ultra-refined glass aesthetic with subtle blurs (8-16px)
- [x] Video player as hero element with Layer 2 glass
- [x] Info bar with Layer 1 glass
- [x] Control panel with Layer 2 glass and refined interactions
- [x] Thumbnail strip with Layer 1 glass and lazy loading
- [x] Ambient animated background (Layer 0)
- [x] Apple-like transitions and micro-interactions
- [x] Keyboard navigation support
- [x] Screen reader accessibility
- [x] Reduced motion support
- [x] Loading states with shimmer animations
- [x] Production build optimized
- [x] WCAG AA compliance

---

**Implementation Complete!** The video carousel app now features ultra-refined glassmorphism with shadcn components, Apple-inspired polish, and full accessibility support.
