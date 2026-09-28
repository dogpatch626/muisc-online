# MOL — Cassette Futurism Redesign

**Date**: 2026-08-03
**Status**: Design Approved
**Style**: Cassette futurism — hybrid retro-modern. CRT hardware textures on a modern card grid layout.

## Overview

Full visual redesign of the MOL music video site. The current glassmorphism mockup (translucent bubbles, soft bokeh, airy white space) is replaced with a **broadcast control room** aesthetic rooted in cassette futurism: the warm analog hardware of 1970s–1985 AV equipment reimagined with cool blue-white CRT phosphor tones.

Every card is a self-contained CRT monitor unit. Theater/watch mode becomes a broadcast monitoring station with signal readouts. Typography uses bitmap/dot-matrix display fonts throughout. The layout structure (card grid, channel bar, theater mode, pagination) carries over from the previous design, but every surface is rebuilt from scratch for the hardware metaphor.

## Context

- **Site purpose**: Personal music video curation — small collection (5–15 items), editorial tone
- **Previous aesthetic**: Glassmorphism with glass bubbles, bokeh, floating spores
- **What changes**: All visual surfaces, textures, typography, color system, atmospheric effects
- **What stays**: Two-column card grid, theater/watch mode split, channel bar + pagination structure, tag filtering, responsive mobile layout
- **Tech stack unchanged**: React 19, TypeScript, Vite, Tailwind, Cloudflare Pages

## Design Principles

1. **Hardware fiction** — Every UI element maps to a plausible piece of AV equipment. Cards are monitors, the nav is a rack panel, pagination is a tape deck status strip.
2. **Cool phosphor warmth** — Blue-white CRT glow on dark surfaces. Not sterile, not warm amber — the twilight zone of a late-era Sony Trinitron.
3. **Tactile over flat** — Beveled buttons, embossed bezels, recessed grooves, molded plastic. Surfaces have depth and physical presence.
4. **Atmospheric restraint** — The broadcast room mood comes from light bleed and subtle grain, not particle effects or animation. Let the hardware speak.

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--room-base` | `hsl(220, 15%, 8%)` | Page background — dark broadcast room |
| `--room-mid` | `hsl(220, 12%, 11%)` | Panel surfaces (channel bar, pagination, sidebar) |
| `--bezel` | `hsl(220, 10%, 18%)` | CRT monitor bezels, card frames |
| `--bezel-highlight` | `hsl(220, 8%, 28%)` | Top-left bevel edge, raised surfaces |
| `--bezel-shadow` | `hsl(220, 12%, 10%)` | Bottom-right bevel edge, recessed areas |
| `--label-strip` | `hsl(220, 8%, 22%)` | Card info area, control panel surfaces |
| `--phosphor` | `hsl(210, 60%, 80%)` | Primary text color — blue-white CRT glow |
| `--phosphor-bright` | `hsl(210, 70%, 90%)` | Active/highlighted text, titles |
| `--phosphor-dim` | `hsl(210, 40%, 55%)` | Secondary text, artist names, metadata |
| `--phosphor-ghost` | `hsl(210, 30%, 35%)` | Hints, inactive elements, silk-screened labels |
| `--glow` | `hsla(210, 70%, 70%, 0.15)` | Phosphor light bleed, box-shadow glow |
| `--glow-strong` | `hsla(210, 70%, 70%, 0.3)` | Hover glow, active screen bleed |
| `--led-green` | `hsl(140, 60%, 50%)` | Signal OK indicator, genre tags |
| `--led-amber` | `hsl(35, 80%, 55%)` | Year/date tags, warning indicators |
| `--led-red` | `hsl(0, 70%, 55%)` | REC indicator in theater mode |
| `--groove-dark` | `hsl(220, 12%, 6%)` | Recessed separator lines |
| `--groove-light` | `hsl(220, 8%, 16%)` | Raised separator edge (paired with groove-dark) |

## Typography

### Fonts

| Font | Source | Role |
|------|--------|------|
| **Silkscreen** | Google Fonts | Small labels, system chrome, tags, status readouts, ESC hints |
| **Share Tech Mono** | Google Fonts | Titles, body text, artist names, excerpts, timecodes |

### Hierarchy

| Element | Font | Size | Style |
|---------|------|------|-------|
| Logo `MOL` | Silkscreen | 14–16px | Uppercase, `letter-spacing: 0.2em`, `text-shadow` phosphor glow |
| Logo subtitle `MUSIC ONLINE` | Silkscreen | 8px | Uppercase, `letter-spacing: 0.15em`, ghost opacity |
| Card title | Share Tech Mono | 13–14px | Normal case, phosphor-bright color |
| Card artist | Share Tech Mono | 10px | Uppercase, `letter-spacing: 0.08em`, phosphor-dim |
| Tags / LED indicators | Silkscreen | 8px | Uppercase, colored LED glow |
| Theater title | Share Tech Mono | 20–22px | Normal case, strong text-shadow glow |
| Theater artist | Share Tech Mono | 11px | Uppercase, `letter-spacing: 0.08em`, phosphor-dim |
| Excerpt text | Share Tech Mono | 12px | 40% opacity, `line-height: 1.7` |
| System labels (`REC`, `SIGNAL`, `CH.01`) | Silkscreen | 8–9px | Uppercase, `letter-spacing: 0.15em` |
| ESC hints | Silkscreen | 8px | Uppercase, ghost opacity |
| Page counter | Share Tech Mono | 12px | Phosphor color, glow |
| Track count | Silkscreen | 9px | Uppercase, ghost opacity |

### Text Rendering

- No pure white text anywhere — always the blue-white phosphor tint
- Important text gets `text-shadow: 0 0 8px var(--glow)` for CRT bloom
- Let bitmap fonts render crisp at intended sizes — no smoothing tricks

## Component Specifications

### 1. Background — Broadcast Room

The page background establishes the dark workspace ambiance.

**Layers (bottom to top):**

1. **Base fill**: solid `--room-base`
2. **CRT light bleed**: 2–3 radial gradients positioned where card clusters sit, using `--glow` at 8–12% opacity. Simulates real screens casting light onto a desk.
3. **Film grain**: SVG noise texture overlay at 10–15% opacity, `mix-blend-mode: overlay`. Analog video static.
4. **Page-level scan lines**: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)` — full page, barely visible. The whole interface feels like it's viewed through a monitor.

**Not included** (removed from glassmorphism design): bokeh blobs, floating bubbles, spore particles, depth grid, nebula clouds.

### 2. Cards — CRT Monitor Units

Each card is a self-contained mini CRT monitor.

#### The Bezel (outer frame)
- `border`: 8–12px solid `--bezel`
- `border-radius`: 12px outer, 6px inner (CRTs had rounded screens inside boxy casings)
- **Bevel illusion**: `box-shadow` with `--bezel-highlight` on top/left inset, `--bezel-shadow` on bottom/right inset
- **Power LED**: a small circle (6px) in the top-right corner of the bezel, rendered via `::before` pseudo-element. Dim blue-white by default.

#### The Screen (thumbnail area)
- `aspect-ratio: 16/9`
- Thumbnail image fills the screen
- **Screen curvature (vignette)**: `::after` overlay with radial gradient — lighter center, darkened edges. Simulates the convex surface of a CRT.
- **Scan lines**: `repeating-linear-gradient` at 6–8% opacity, 4px repeat
- **Screen reflection**: diagonal linear gradient stripe across the surface at ~5% opacity — glass reflection on curved CRT
- **Phosphor glow**: `box-shadow: 0 0 20px var(--glow)` bleeding outward from the screen, as if emitting light

#### The Label Strip (info area below screen)
- Background: `--label-strip`
- Separated from screen by a **recessed groove**: 1px `--groove-dark` + 1px `--groove-light`
- `padding: 14px 16px`
- **Title**: Share Tech Mono, 13–14px, phosphor-bright
- **Artist**: Share Tech Mono, 10px, uppercase, phosphor-dim
- **Tags**: styled as **indicator LEDs** — small rounded rectangles (`border-radius: 4px`, `padding: 3px 8px`), Silkscreen 8px uppercase. Genre tags glow `--led-green`, year tags glow `--led-amber`. Each has a faint `box-shadow` matching its color.

#### Hover State
- Phosphor glow intensifies: `box-shadow` spread increases, opacity rises to `--glow-strong`
- Screen brightness: slight increase via overlay opacity reduction
- Power LED: shifts from dim to bright with a small halo glow
- Scan lines: become slightly more visible (~10% opacity)
- Subtle `transform: translateY(-2px)` lift

#### Card Vertical Offsets
- Cards at slightly different vertical positions for organic floating feel (same as current mockup: `translateY(±4–12px)` on nth-child)

### 3. Channel Bar — Rack-Mounted Control Panel

The top navigation bar is a horizontal equipment panel.

#### Panel Surface
- Background: `--room-mid`
- **Ridge lines**: 1px `--groove-light` on top, 1px `--groove-dark` on bottom — the lip of a metal rack panel
- Faint **brushed metal texture**: `repeating-linear-gradient(90deg, transparent, rgba(255,255,255,0.02) 1px, transparent 2px)` — very fine horizontal lines
- `padding: 16px 32px`

#### Logo (left)
- **Power LED**: 8px circle, bright phosphor glow with halo (`box-shadow: 0 0 6px, 0 0 12px`), replaces the glass orb
- **"MOL"**: Silkscreen 14–16px, uppercase, phosphor-bright, `letter-spacing: 0.2em`, `text-shadow` glow
- **"MUSIC ONLINE"**: Silkscreen 8px below/beside, uppercase, ghost opacity — silk-screened model name

#### Filter Buttons (right)
- Styled as **physical toggle buttons** on a mixing desk
- Each button:
  - Background: `--bezel` with beveled edges (highlight top-left, shadow bottom-right)
  - Silkscreen 9px, uppercase, `letter-spacing: 0.08em`
  - A 4px indicator LED dot to the left of the text
- **Active state**: button appears pressed (inset shadow flips — shadow top-left, highlight bottom-right), LED glows bright `--phosphor-bright`, text brightens
- **Inactive state**: button raised, LED dim, text at ghost opacity
- `gap: 6px` between buttons

### 4. Theater Mode — Broadcast Control Room

Activated when a card is expanded for video playback.

#### Layout
- Two-panel split: video feed (~70%) + info sidebar (~30%)
- `gap: 20px`, `padding: 32px`

#### Master Monitor (video feed)
- **Heavier bezel**: 14–16px `--bezel`, same bevel treatment as cards but scaled up
- Scan lines and screen curvature effects, slightly more pronounced than cards
- **Signal readout overlays** (positioned in corners, over the video):
  - **Top-left**: `REC` in Silkscreen with a pulsing red LED dot + timecode `00:03:42:18` in Share Tech Mono — all at ~30% opacity
  - **Top-right**: `SIGNAL` label with a tiny bar-graph level meter (3–4 bars, green, subtle animation) — ~30% opacity
  - **Bottom-left**: channel ID `CH.01 — 1080p` in Silkscreen, dim
  - **Bottom-right**: `PLAY ▶` status, phosphor glow
- All overlays brighten slightly on hover (~45% opacity) — ambient, not interactive

#### Info Sidebar (equipment panel)
- Background: `--room-mid`
- `border-radius: 12px`
- Same bezel/bevel treatment as other panels
- Sections separated by **recessed grooves** (1px dark + 1px light)
- Content:
  - **Title**: Share Tech Mono, 20–22px, phosphor-bright, strong text-shadow glow
  - **Artist**: Share Tech Mono, 11px, uppercase, phosphor-dim
  - **Groove separator**
  - **Excerpt**: Share Tech Mono, 13px, 40% opacity, `line-height: 1.8`
  - **Tags**: LED indicator style (same as cards)
  - **Groove separator**
  - **ESC hint**: Silkscreen 8px, ghost opacity, `◀ ESC TO RETURN` — styled as a silk-screened equipment label

#### Ambient Dimming
- Surrounding page dims further (overlay or reduced opacity on non-theater elements)
- Master monitor's phosphor glow is the dominant light source — blue-white bleed onto the "desk"

### 5. Pagination — VCR Deck Status Strip

The bottom bar mimics a tape deck's front panel display.

#### Panel Surface
- Same treatment as channel bar: `--room-mid`, ridge lines, brushed texture
- `padding: 14px 32px`
- Divided into three horizontal zones

#### Left Zone — Transport Symbols (decorative)
- Transport icons in Share Tech Mono or unicode: `⏮  ⏪  ▶  ⏩  ⏭`
- All rendered at ghost opacity except `▶` which glows phosphor-bright
- Purely atmospheric — not functional buttons
- `gap: 12px`, `font-size: 12px`

#### Center Zone — Page Counter
- Segment-display style: `PAGE 02 / 04` in Share Tech Mono, 12px, phosphor color with glow
- **Tape position bar** underneath: thin line (2px height, ~120px width), background `--groove-dark`, fill `--phosphor-dim` proportional to current page position (e.g., page 2/4 = 50% filled)

#### Right Zone — Track Count
- `6 TRACKS` in Silkscreen 9px, uppercase, ghost opacity
- Small **signal LED**: 5px circle, `--led-green`, steady glow — "system nominal"

### 6. Expanded Card State (inline, non-theater)

When a card expands inline (from the grid view):

- Card expands to full grid width, bezel thickens to master-monitor size
- Video area replaces thumbnail with the same broadcast readout overlays as theater mode
- Other cards dim and blur (same `opacity: 0.1, filter: blur(4px)` as current mockup)
- Info area expands below the video with full excerpt, tags, and ESC hint

### 7. Mobile Layout

- Cards stack single-column, no vertical offsets
- Channel bar wraps: logo on top, filter buttons below (horizontal scroll if needed)
- Theater mode stacks vertically: video on top, info panel below
- Bezels thin out slightly (6–8px instead of 8–12px) to preserve screen real estate
- Transport symbols hidden on mobile; page counter and track count share one row

## Atmospheric Effects Summary

| Effect | Implementation | Opacity |
|--------|---------------|---------|
| Film grain | SVG noise texture, `mix-blend-mode: overlay` | 10–15% |
| Page scan lines | `repeating-linear-gradient`, 4px repeat | 2% |
| Card scan lines | `repeating-linear-gradient`, 4px repeat | 6–8% |
| Screen vignette | Radial gradient overlay (dark edges) | 20–30% |
| Screen reflection | Diagonal linear gradient stripe | 5% |
| Phosphor glow | `box-shadow` on screen areas | 15% default, 30% hover |
| CRT light bleed | Radial gradients on page background | 8–12% |
| Signal meter bars | CSS animated bar graph | 30% default |
| REC dot pulse | CSS animation, `--led-red` | 30% |

## What This Design Does NOT Include

- Glass/translucent surfaces (glassmorphism removed entirely)
- Bokeh, floating bubbles, spore particles, depth grid
- Targeting brackets (replaced by broadcast readouts)
- Warm amber/green phosphor — stays cool blue-white throughout
- Filter UI on the main pagination bar (filters live only in channel bar)
- Functional transport controls (decorative only)
