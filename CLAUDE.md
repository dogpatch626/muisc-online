# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React 19 + TypeScript + Vite single-page application using the modern Vite template.

**Note**: The directory name is `muisc-online` (contains a typo).

## Development Commands

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Cloudflare deployment (using Wrangler)
npx wrangler pages deploy dist

# Cloudflare local development
npx wrangler pages dev dist
```

## Tech Stack

- **React 19.2.0** with React DOM 19
- **TypeScript 5.9.3** in strict mode
- **Vite 7.2.4** as build tool and dev server
- **Cloudflare Pages** deployment via `@cloudflare/vite-plugin` 1.21.2
- **Wrangler 4.60.0** for Cloudflare development and deployment
- **ESLint 9** with flat config format

## TypeScript Configuration

- **Strict mode enabled** with additional checks:
  - `noUnusedLocals`: true
  - `noUnusedParameters`: true
  - `noFallthroughCasesInSwitch`: true
  - `noUncheckedSideEffectImports`: true
- **Module resolution**: `bundler` mode (supports modern import patterns)
- **JSX**: `react-jsx` (automatic runtime)
- **Target**: ES2022
- **Build info**: Cached in `./node_modules/.tmp/tsconfig.app.tsbuildinfo`

## ESLint Configuration

Uses flat config format (`eslint.config.js`) with:
- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` flat config recommended rules
- `eslint-plugin-react-refresh` for Vite integration
- Ignores `dist/` directory

## Project Structure

```
src/
  ├── App.tsx          # Main application component
  ├── App.css          # App-specific styles
  ├── main.tsx         # Application entry point
  ├── index.css        # Global styles
  └── assets/          # Static assets (images, etc.)
```

## Build System

- **Dev Server**: Vite with Fast Refresh (HMR)
- **Build Output**: `dist/` directory (git-ignored)
- **Vite Plugins**:
  - `@vitejs/plugin-react` with Babel for Fast Refresh
  - `@cloudflare/vite-plugin` for Cloudflare Pages integration
- **Entry Point**: `index.html` at project root

## Cloudflare Configuration

The project is configured for deployment to Cloudflare Pages:

- **Wrangler Config**: `wrangler.jsonc` at project root
- **Project Name**: `cloudflare-vite-tutorial`
- **Compatibility Date**: 2025-04-03
- **Asset Handling**: Single-page application mode (SPA routing enabled)
- **Not Found Handling**: Configured for SPA to support client-side routing

## Development Notes

- React runs in `StrictMode` by default
- HMR is configured via `@vitejs/plugin-react`
- Type checking happens separately from build (`tsc -b` before `vite build`)
- No test runner configured (add Vitest if needed)
