# Music Online - AI Coding Agent Instructions

## Project Overview

Music Online is a music video blog platform built as an Nx monorepo with dual deployment targets: Next.js app on Cloudflare Pages and Hono-based API worker on Cloudflare Workers.

### Architecture

- **Monorepo Manager**: Nx workspace with npm workspaces
- **Frontend App** (`apps/music-online`): Next.js 15 with React 19, Tailwind CSS 4, deployed via OpenNext for Cloudflare
- **API Worker** (`apps/mol-worker`): Hono framework for Cloudflare Workers
- **UI Components**: shadcn/ui (New York style) with Tailwind + Motion for animations

## Development Workflows

### Running the Apps

```bash
# Run both apps in parallel
npm run dev

# Run individually
npm run dev:next        # Frontend dev server (with Turbopack)
npm run dev:worker      # Worker API dev

# Or use Nx directly
npx nx dev music-online
npx nx dev mol-worker
```

### Building & Deployment

```bash
# Build all apps
npm run build

# Build only affected by changes
npm run build:affected

# Deploy all
npm run deploy

# Deploy only affected
npm run deploy:affected

# Deploy individual apps
npx nx deploy music-online
npx nx deploy mol-worker
```

### Key Nx Commands

- `npm run graph` - Visualize project dependencies
- `npx nx show project <name>` - See all available targets for a project
- `npm run lint` - Run linting across all projects (cached)
- `npm run typecheck` - Type-check all projects (cached)
- `npm run lint:affected` - Lint only affected projects
- `npx nx affected:graph` - See what's affected by current changes

## Critical Patterns & Conventions

### Next.js + Cloudflare Edge Runtime

- All routes use Edge runtime (`export const runtime = 'edge'` in `next.config.ts`)
- Development mode initializes OpenNext Cloudflare adapter via `initOpenNextCloudflareForDev()`
- Wrangler config in `apps/music-online/wrangler.jsonc` defines worker bindings and assets

### Client-Side State Management

- **No external state library** - uses React Context + hooks
- State lifted to `page.tsx` with `VideoContext` and `IframeContext` exports
- Carousel position managed via `useState` + `useCallback` for performance
- Example: `VideoContext` provides carousel data to child components

### Component Structure

- **Client Components**: Explicitly marked with `'use client'` directive (see `page.tsx`, `ActiveChannel.tsx`)
- **Type-safe props**: Use `ComponentProps<'div'>` intersection pattern for extending native elements
- **Naming**: PascalCase for components, functional naming (e.g., `PlayerControlComponents.tsx`)

### Styling Approach

- Tailwind CSS 4 with `@tailwindcss/postcss` (no traditional config object)
- **Issue with Turbopack**: `createGlobPatternsForDependencies` commented out in `tailwind.config.js` due to Nx incompatibility
- Utility-first classes with Motion library for animations
- Custom UI components in `src/components/ui/shadcn-io/` (e.g., `wavy-background`)

### TypeScript Configuration

- Strict mode enabled (`tsconfig.base.json`)
- Module resolution: `bundler` (supports ESM imports)
- Project references with `composite: true` for incremental builds
- Path aliases configured via shadcn: `@/components`, `@/lib`, etc.

## Integration Points

### YouTube Embed Pattern

- iframes in `ActiveChannel.tsx` use `?enablejsapi=1` for YouTube API control
- Sandbox attributes: `allow-scripts allow-same-origin allow-presentation`
- Dynamic key prop on iframe forces remount on channel change

### Cloudflare Bindings

- **Workers**: R2 buckets (cache), KV namespaces, D1 databases configurable in `wrangler.jsonc`
- **Next.js**: Assets binding + self-referencing service worker pattern
- Generate types: `npm run cf-typegen` (wrangler types command)

### Nx Configuration & Caching

- **Project files**: Both apps have `project.json` files defining build, deploy, and preview targets
- **Caching enabled**: `build`, `lint`, and `typecheck` targets are cached for speed
- **Task dependencies**: Deploy tasks depend on `build`, `lint`, and `typecheck` completing
- **Build target**: `mol-worker` uses `@nx/esbuild` executor to bundle for Cloudflare Workers runtime
- **Shared library**: `libs/shared/types` contains shared TypeScript types between apps
- Import shared types: `import { VideoItem } from '@online-music/types'`

### Nx + Next.js Integration

- Plugin config in `nx.json` defines target names (`dev`, `next:build`, etc.)
- Caching uses `production` inputs (excludes test files, markdown, config)
- TypeScript plugin provides `typecheck` target across workspace
- ESBuild plugin bundles worker with proper externals for Cloudflare runtime

## Gotchas & Project-Specific Quirks

1. **Typo in repo name**: Workspace folder is `muisc-online` (not `music-online`) but package is `@online-music/source`
2. **Turbopack limitations**: Can't use Nx Tailwind dependency patterns - must manually list paths
3. **Edge runtime only**: No Node.js APIs available in routes - use Cloudflare compatibility flags for node_compat
4. **OpenNext requirement**: `@opennextjs/cloudflare` required for Cloudflare deployment - standard Next.js build won't work

## File Organization

- Next.js app routes: `apps/music-online/src/app/` (App Router)
- Reusable components: `apps/music-online/src/components/`
- shadcn/ui components: `src/components/ui/shadcn-io/`
- Worker entry: `apps/mol-worker/src/index.ts`
- Shared types library: `libs/shared/types/src/lib/types.ts`
- Project configs: `apps/*/project.json` (Nx target definitions)
- Global styles: `apps/music-online/src/app/global.css`

## When Adding Features

### New UI Components

- Use `npx shadcn@latest add <component>` (components.json configured)
- Verify Tailwind classes work with Turbopack (manual glob patterns may be needed)
- Prefer Motion library for animations over external animation libraries

### New API Endpoints

- Add routes to `apps/mol-worker/src/index.ts` using Hono's routing
- Update wrangler bindings if using KV/R2/D1
- Run `npm run cf-typegen` in worker directory after binding changes

### Cloudflare-Specific Code

- Check `wrangler.jsonc` compatibility flags before using Node.js APIs
- Use `CloudflareBindings` type for env access in worker
- Use `CloudflareEnv` type for Next.js routes

### State Management

- Export context from `page.tsx` if shared across multiple components
- Use `useCallback` for functions passed to deeply nested children
- Keep state close to where it's used - avoid over-lifting

## Testing & Linting

- Linting: `npx nx lint <project-name>` or `npx nx run-many -t lint`
- ESLint 9 flat config in `eslint.config.mjs`
- No test setup currently visible in workspace
