# PS2 Ambient Interface Redesign

**Date**: 2026-03-23
**Status**: Design Approved
**Style**: Early 2000s neo-futurist UI — PS2 system menu ambience + in-game HUD details

## Overview

Full redesign of the music/video showcase site. Replaces the current glassmorphism video carousel with a spatial "Ambient Interface" — a single-screen experience where content items float as cards in a void, navigated horizontally. The aesthetic blends the PS2 system menu's organic depth (ambient orbs, translucent surfaces, spatial layout) with the sharp precision of in-game HUD elements (targeting brackets, monospace readouts, grid overlays).

## Context

- **Site purpose**: Personal music/video showcase — small curated collection (5-15 items)
- **Current state**: Glassmorphism carousel with shadcn/ui components (GlassVideoPlayer, GlassInfoBar, GlassControls, GlassThumbnailStrip). Fully functional with keyboard nav and accessibility.
- **What changes**: Layout, navigation model, visual language, component structure. The tech stack (React 19, TypeScript, Vite, Tailwind, Cloudflare Pages) stays the same.

## Design Principles

1. **Cinematic, not busy** — each item gets room to breathe. Atmospheric but restrained. Mood without distraction.
2. **Monospace everything** — the single biggest aesthetic driver. All-caps labels, wide letter-spacing. System readout feel.
3. **Two states only** — Browse (spatial cards) and Watch (expanded card with iframe). No modals, no separate pages, no scrolling.
4. **Cold spectrum** — everything stays in blue-violet. No warm colors. Deep void backgrounds.

## Visual Language

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--void-base` | `hsl(240, 30%, 6%)` | Deepest background |
| `--void-mid` | `hsl(240, 20%, 10%)` | Gradient endpoint |
| `--accent` | `hsl(220, 70%, 55%)` | Active states, brackets, readouts |
| `--accent-dim` | `hsl(220, 70%, 55%)` at 25% opacity | Brackets, borders |
| `--accent-glow` | `hsl(220, 70%, 55%)` at 6% opacity | Card glow, orb tint |
| `--text-primary` | `rgba(255, 255, 255, 0.9)` | Titles |
| `--text-secondary` | Accent color at 50% opacity | Artist names, metadata |
| `--text-muted` | `rgba(255, 255, 255, 0.25)` | Header, counters |
| `--text-ghost` | `rgba(255, 255, 255, 0.15)` | Hints, inactive dots |

### Typography

- **Font stack**: `'SF Mono', 'Monaco', 'Cascadia Code', 'Courier New', monospace`
- **All text is monospace** — no sans-serif anywhere
- **Labels/headers**: uppercase, letter-spacing `0.1em` to `0.2em`
- **Titles**: 14-16px, letter-spacing `0.02em`
- **Artist/metadata**: 10-11px, accent color at 50%
- **Counters**: 10px, muted, letter-spacing `0.1em`
- **System labels**: 9-10px, uppercase, letter-spacing `0.15em`+

### Atmospheric Elements

**Ambient orbs** (2 total):
- Orb 1: Blue-purple, 600px diameter, top-left, 12% opacity, blur 80px
- Orb 2: Deep blue, 500px diameter, bottom-right, 8% opacity, blur 80px
- Animation: 60s alternate drift, max 80px translation
- Disabled under `prefers-reduced-motion`

**Grid overlay**:
- 40px squares, white at ~1.2% opacity
- Fixed position, no animation
- Covers entire viewport

**No scan lines, no particle systems.**

## Layout

Single viewport, no scrolling. Three vertical zones:

```
┌─────────────────────────────────────────────┐
│ MUSIC ONLINE              ALL  RECENT  FAV  │  ← Header (minimal, dim)
│                                             │
│                                             │
│    ┌───┐      ┌─────────┐      ┌───┐       │
│    │   │      │ ┌─   ─┐ │      │   │       │  ← Central Stage (~60vh)
│    │   │      │ │  ▶  │ │      │   │       │     Active card + ghost cards
│    │   │      │ └─   ─┘ │      │   │       │
│    └───┘      └─────────┘      └───┘       │
│   ghost         active         ghost        │
│   (prev)                       (next)       │
│                                             │
│ Cyber Rain                 ●●━━●●  03/05   │  ← Info Strip
└─────────────────────────────────────────────┘
```

### Header

- Left: site name (`MUSIC ONLINE`) — 10px, muted (20% white), letter-spacing `0.2em`
- Right: category filters (`ALL`, `RECENT`, `FAVORITES`) — 10px, muted, active filter gets accent color at 50% + 1px underline
- Functionally optional for MVP — categories can be deferred

### Central Stage

Takes ~60% of viewport height. Contains:

**Active card** (center):
- 62% container width, 16:9 aspect ratio
- Background: black at 50% opacity
- Border: 1px solid accent at 15% opacity
- Border-radius: 6px
- Box-shadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 60px accent-glow`
- Contains: video thumbnail (0.7 opacity), play icon (centered triangle), targeting brackets (4 corners)
- z-index above ghost cards

**Ghost cards** (flanking):
- 55% container width, 16:9 aspect ratio
- Offset ±15px from edge, scaled to 0.85, opacity 0.35
- Background: white at 2% opacity
- Border: 1px solid white at 4%
- Border-radius: 6px
- Contains: thumbnail image (0.3 opacity, desaturated)
- On hover: opacity rises to 0.55, scale to 0.88 — "lift toward you" effect

**Targeting brackets** (on active card only):
- Four L-shaped corners, 14px arms, 1px solid accent at 25%
- Positioned 8px inset from card edges
- On hover: brackets expand to 17px, shift outward to 5px inset, brighten to 40% — "lock-on" feel
- Transition: 200ms ease

### Info Strip

Below the stage:
- Left: title (15px, primary text) + artist (11px, accent at 50%)
- Right: pagination dots + counter
  - Inactive dot: 6px circle, white at 15%
  - Active dot: 16px pill (border-radius 3px), accent at 60%
  - Dot transition: 300ms spring ease
  - Counter: `03/05` in 10px muted monospace

## States

### Browse State

The default. Full spatial card layout as described above.

**Navigation**:
- Left/Right arrows: transition to prev/next card
- Enter/Space: expand active card to Watch state
- Home/End: jump to first/last item
- Ghost card click: navigate to that item
- Active card click: enter Watch state

### Watch State

Active card expands to fill viewport (~95% width, maintain 16:9).

**Transition in** (400ms ease-out):
- Active card scales from center position to near-fullscreen
- Ghost cards fade out (200ms)
- Header dims to 30% opacity
- Targeting brackets scale with the card, stay visible

**During playback**:
- Iframe loads inside the expanded card
- Brackets frame the video
- HUD overlay: title + artist in bottom-left corner (12px/9px), 70% opacity
- HUD auto-hides after 3 seconds of no mouse movement, reappears on mousemove
- Decorative accent line at card bottom (3px, accent gradient fill) — static/decorative only, not real-time progress (iframe cross-origin prevents reading playback state)
- Hint text below card: `PRESS ESC TO RETURN · Title` in 9px muted (no timecodes — iframe cross-origin restrictions prevent reading playback position)

**Transition out** (Escape key or click outside, 400ms ease-out):
- Reverse of transition in
- Card contracts back to center
- Ghost cards fade back in
- Header returns to normal opacity

## Animations & Transitions

### Card Navigation (Browse)
- Duration: 400ms, ease-out `cubic-bezier(0, 0, 0.2, 1)`
- Outgoing card: slides to ghost position (scale 0.85, opacity 0.35, translate ±20px)
- Incoming card: slides from ghost to center (scale 1, opacity 1, translate to center)
- Subtle parallax: ghost cards shift slightly on opposite axis during transition

### Targeting Brackets
- Hover expand: 200ms ease
- Expand outward 3px, brighten from 25% to 40% opacity

### Pagination Dots
- Active dot elongation: 300ms spring `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Ambient Orbs
- 60s alternate drift, ease-in-out, max 80px translation

### Reduced Motion (`prefers-reduced-motion: reduce`)
- All transitions become instant opacity swaps
- Ambient orb drift disabled
- Card state changes are immediate (no scale/translate)
- Dot transitions become instant

## Accessibility

- Full keyboard navigation (arrow keys, Enter, Escape, Home, End)
- `aria-current` on active card and pagination dot
- `aria-label` on ghost cards ("Go to [title]"), play action, navigation controls
- `aria-live="polite"` region announces current item on change
- Focus indicators: 2px accent ring, 2px offset
- Touch targets: minimum 44px for all interactive elements
- Reduced motion support as described above

## Component Architecture

Replace all existing glass components with:

```
src/
├── components/
│   ├── ambient/
│   │   └── AmbientBackground.tsx    # Void base + grid + orbs
│   ├── stage/
│   │   ├── CardStage.tsx            # Container managing card positions
│   │   ├── ActiveCard.tsx           # Center card with brackets + play
│   │   ├── GhostCard.tsx            # Flanking preview cards
│   │   └── TargetingBrackets.tsx    # Reusable bracket overlay
│   ├── info/
│   │   └── InfoStrip.tsx            # Title + pagination + counter
│   ├── watch/
│   │   ├── WatchMode.tsx            # Expanded video state
│   │   └── WatchHUD.tsx             # Auto-hiding title overlay
│   └── header/
│       └── Header.tsx               # Site name + filters
├── styles/
│   ├── tokens.css                   # Design tokens (colors, spacing, timing)
│   └── ambient.css                  # Background + grid + orb animations
├── types/
│   └── video.ts                     # Video type (keep existing)
└── App.tsx                          # State management (browse/watch, currentIndex)
```

### State Management

App.tsx manages:
- `currentIndex: number` — which video is active
- `mode: 'browse' | 'watch'` — current state
- Keyboard event listener (arrow keys, Enter, Escape)
- Video data array (same as current)

### What Gets Removed

- All `src/components/glass/` components (GlassVideoPlayer, GlassInfoBar, GlassControls, GlassThumbnailStrip)
- All glass CSS files
- `src/styles/glass-tokens.css` and `src/styles/glass-layers.css`
- shadcn/ui components (button, card, scroll-area, badge, slider) — no longer needed
- lucide-react dependency — play icon is a CSS triangle

### What Gets Kept

- React 19, TypeScript, Vite, Tailwind, Cloudflare Pages setup
- `src/types/video.ts`
- `package.json` scripts and core dev dependencies
- `components.json` (shadcn config — can remove but low priority)

## Responsive Behavior

Desktop-first design. At viewports below 768px, ghost cards are hidden and navigation relies on swipe gestures or arrow buttons. The active card scales to ~90% viewport width. This is a stretch goal — desktop experience is the priority for MVP.

## Success Criteria

- [ ] Single-screen, no-scroll spatial card layout
- [ ] Browse ↔ Watch state transitions (400ms, reversible)
- [ ] Monospace typography throughout
- [ ] Cold blue-violet color palette only
- [ ] Ambient void background (orbs + grid, no scan lines/particles)
- [ ] Targeting brackets with hover lock-on animation
- [ ] Ghost card navigation with hover lift
- [ ] Full keyboard navigation (arrows, Enter, Escape, Home, End)
- [ ] `prefers-reduced-motion` support
- [ ] Screen reader announcements via aria-live region
- [ ] Production build passes
- [ ] 60fps animations on modern browsers
