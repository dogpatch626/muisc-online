# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A music video browser SPA with a PS2/ambient-inspired UI. Users browse a video carousel, then enter a fullscreen watch mode for playback. Built with React 19 + TypeScript + Vite, deployed to Cloudflare Pages.

**Note**: The directory name is `muisc-online` (typo). The package name is `music-online`.

## Development Commands

```bash
pnpm dev          # Dev server with HMR
pnpm build        # Type-check then build (tsc -b && vite build)
pnpm lint         # ESLint
pnpm preview      # Preview production build

# Cloudflare
npx wrangler pages deploy dist    # Deploy to Cloudflare Pages
```

## Architecture

### Two-mode UI (App.tsx)

The app switches between two modes via `useState<'browse' | 'watch'>`:

- **Browse mode**: `Header` + `CardStage` (3-card carousel) + `InfoStrip` (title/artist/pagination dots)
- **Watch mode**: `WatchMode` wraps an iframe player with `WatchHUD` (auto-hiding overlay) and `TargetingBrackets` (corner decorations)

Keyboard navigation: Arrow keys cycle cards, Enter/Space enters watch mode, Escape exits.

### Component hierarchy

```
App
├── AmbientBackground        # Fixed background (gradient + grid + floating orbs)
├── Browse mode:
│   ├── Header               # Title + filter buttons + ThemeToggle
│   ├── CardStage             # Carousel container
│   │   ├── GhostCard (prev)  # Dimmed adjacent card
│   │   ├── ActiveCard        # Focused card with play icon + TargetingBrackets
│   │   └── GhostCard (next)
│   └── InfoStrip             # Title, artist, pagination dots, counter
└── Watch mode:
    └── WatchMode             # Fullscreen iframe player
        ├── Header (dimmed)
        ├── TargetingBrackets
        └── WatchHUD          # Auto-hiding title/artist overlay (3s timeout)
```

### Theming

Dark/light theme via CSS custom properties. Theme state in `App.tsx`, persisted to `localStorage`, applied as `data-theme` attribute on `<html>`. Design tokens defined in `src/styles/tokens.css` (colors, typography, spacing, timing). Light theme overrides via `[data-theme='light']` selector.

### Styling approach

- **CSS custom properties** in `src/styles/tokens.css` for design tokens
- **Component-scoped CSS files** colocated with each component (e.g., `CardStage.css`)
- **Tailwind CSS 3** available (PostCSS + autoprefixer) but minimally used; most styling is hand-written CSS
- **`@/` path alias** maps to `./src/` (configured in both `vite.config.ts` and `tsconfig.json`)

### Data

Video data is hardcoded in `App.tsx` as a `Video[]` array. The `Video` type is defined in `src/types/video.ts` (id, title, artist, thumbnail, url).

## Tech Stack

- **React 19** with automatic JSX runtime
- **TypeScript** in strict mode (`noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`)
- **Vite** with `@vitejs/plugin-react` (Babel) + `@cloudflare/vite-plugin`
- **Tailwind CSS 3** with PostCSS + autoprefixer
- **ESLint 9** flat config (`eslint.config.js`) with typescript-eslint, react-hooks, react-refresh
- **Cloudflare Pages** deployment (SPA mode, `wrangler.jsonc`)
- **pnpm** as package manager
- No test runner configured
