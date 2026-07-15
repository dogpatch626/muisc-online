# MOL (Music Online) — MTV Clone Design Spec

**Date**: 2026-07-15
**Status**: Design Approved

## Overview

MOL is a personal music video curation site. The sole author posts YouTube music videos with short caption-style excerpts (1-3 sentences). Visitors browse a paginated card grid, filter by tags, and expand cards inline to watch the video and read the full excerpt. No user accounts, no comments — a curated editorial experience.

The aesthetic is avant-garde neo-retro, genuinely inspired by early 2000s console UIs — specifically the Wii Channel grid's buoyant spatial cards and ambient glow, the PS2 system menu's organic depth and translucency, and the original Xbox dashboard's bold panel layouts. Not minimalist. The page should feel alive and physical.

## Content Model

| Field | Type | Notes |
|-------|------|-------|
| `id` | string (ULID) | Sortable, collision-free |
| `title` | string | Video/song title |
| `artist` | string | Artist name |
| `excerpt` | string | 1-3 sentence blurb, plain text |
| `youtubeId` | string | YouTube video ID only |
| `tags` | string[] | Freeform (e.g. `["electronic", "ambient", "2024"]`) |
| `thumbnailUrl` | string | Defaults to `https://img.youtube.com/vi/{youtubeId}/maxresdefault.jpg` if not provided |
| `createdAt` | ISO datetime | When posted |

## API Design

Single Cloudflare Worker (Hono). D1 (SQLite) for storage.

### Public Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/posts` | Paginated feed. Params: `?page=1&limit=10&tag=electronic` |
| `GET` | `/api/posts/:id` | Single post |
| `GET` | `/api/tags` | All tags with post counts |

### Admin Endpoints

Protected with `Authorization: Bearer <API_KEY>` header. Key stored as a Wrangler secret.

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/posts` | Create a post |
| `PUT` | `/api/posts/:id` | Update a post |
| `DELETE` | `/api/posts/:id` | Delete a post |

### D1 Schema

```sql
CREATE TABLE posts (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  artist      TEXT NOT NULL,
  excerpt     TEXT NOT NULL,
  youtube_id  TEXT NOT NULL,
  thumbnail   TEXT,
  created_at  TEXT NOT NULL
);

CREATE TABLE tags (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT UNIQUE NOT NULL
);

CREATE TABLE post_tags (
  post_id  TEXT REFERENCES posts(id) ON DELETE CASCADE,
  tag_id   INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
```

## Visual Direction

### The Feel

Like browsing a channel guide on a fictional early-2000s console designed for music video curation. The Wii Channel grid's buoyant spatial cards, the PS2 menu's organic depth and translucency, the original Xbox dashboard's bold panel layouts and ambient glow.

### Key Visual Elements

- **Cards feel physical** — rounded corners (12-16px), visible depth with layered shadows and inner glows, translucent surfaces with backdrop-blur. They have presence.
- **Ambient motion** — cards have subtle idle animations (gentle float/breathing). The background has living atmosphere: orbs, grid, slow color shift. The page feels alive even when idle.
- **Channel-grid energy** — the feed is not a sterile list. Hover states are juicy: scale up, glow intensifies, subtle bounce. Wii Channel wobble/pop energy.
- **Console chrome** — UI elements reference system UIs: rounded pill navigation, status bar-style metadata, chunky selection indicators, glow-on-focus states.
- **Targeting brackets** — kept from the current design. Used on the expanded/focused card around the video embed.
- **Typography** — monospace for data/metadata. Titles can use a rounder, softer display font reminiscent of console system fonts (Wii's rounded sans-serif, PS2's clean gothic). Consider pairing monospace with a rounded system-style font.

### Color

Cold-dominant but with more life than the current monotone blue. Console UIs used accent channels:
- Primary: blue (actions, focus states)
- Secondary: softer teal or purple (secondary states, tag pills)
- Subtle gradients on card surfaces
- The void background stays dark, but surface layers have visible translucency and color variation

### Atmospheric Elements (carried forward)

- Ambient orbs: 2 blurred gradient spheres, slow 60s drift animation
- Grid overlay: 40px squares, very low opacity
- Disabled under `prefers-reduced-motion`

## Layout

### Page Structure

```
┌──────────────────────────────────────────────────┐
│  ● MOL         All  Electronic  Ambient  ...     │  Channel bar
├──────────────────────────────────────────────────┤
│                                                  │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│   │ thumb   │  │ thumb   │  │ thumb   │        │
│   │         │  │         │  │         │        │
│   │ Title   │  │ Title   │  │ Title   │        │  Card grid
│   │ Artist  │  │ Artist  │  │ Artist  │        │  (2 cols desktop,
│   │ "blurb" │  │ "blurb" │  │ "blurb" │        │   1 col mobile)
│   └─────────┘  └─────────┘  └─────────┘        │
│                                                  │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│   │  ...    │  │  ...    │  │  ...    │        │
│   └─────────┘  └─────────┘  └─────────┘        │
│                                                  │
├──────────────────────────────────────────────────┤
│  ‹ 1  2  3  4  5 ›                    10 posts  │  Pagination bar
└──────────────────────────────────────────────────┘
```

### Channel Bar (top)

- Left: MOL wordmark with a glowing indicator dot (like a console power LED)
- Right: Tag filters as rounded pills, styled like Wii channel category tabs. Active tag gets glow + filled background. "All" is default.
- Translucent surface with backdrop-blur — console system chrome feel

### Card Grid

- 2 columns desktop, 1 column mobile
- Vertical cards: thumbnail (16:9) on top, title + artist + excerpt (truncated ~2 lines) + tag pills below
- Rounded corners (12-16px), translucent background, subtle float/shadow
- **Idle**: gentle breathing animation (subtle scale oscillation)
- **Hover**: card lifts (scale ~1.03), shadow deepens, soft edge glow — Wii wobble/pop feel
- **Click/expand**: card expands in-place, thumbnail becomes YouTube embed, full excerpt reveals, targeting brackets appear around video. Other cards dim
- **Collapse**: click again or Escape. Smooth reverse animation

### Expanded Card

```
┌──────────────────────────────────────────────┐
│ ┌─                                       ─┐ │
│ │          YouTube Embed (16:9)            │ │
│ └─                                       ─┘ │
├──────────────────────────────────────────────┤
│ Title                                        │
│ Artist                                       │
│                                              │
│ "Your full excerpt text here, a couple       │
│  sentences about why this track matters"     │
│                                              │
│ ● electronic  ● synthwave  ● 2024           │
└──────────────────────────────────────────────┘
```

- Targeting brackets frame the video embed
- Full excerpt visible (no truncation)
- Tags displayed as accent-colored pills
- Spans full grid width when expanded

### Pagination Bar (bottom)

- Chunky numbered pill buttons
- Active page highlighted with accent glow
- Post count as monospace readout on the right

## Frontend Architecture

### Tech Stack

- React 19 + TypeScript + Vite (existing)
- React Router (added) for URL-based pagination and tag filtering
- Cloudflare Pages deployment (existing)
- `@/` path alias (existing)
- Tailwind CSS 3 + component-scoped CSS files (existing pattern)

### Routing

| Path | View |
|------|------|
| `/` | Feed (page 1, all tags) |
| `/?page=2&tag=electronic` | Feed with filters (query params, not path segments) |

No separate detail pages — video detail is the inline card expand. This is a single-route app with query param state.

### Component Architecture

```
src/
├── components/
│   ├── ambient/
│   │   └── AmbientBackground.tsx      # Void + grid + orbs (existing, keep)
│   ├── chrome/
│   │   ├── ChannelBar.tsx             # Top bar: logo + tag filters
│   │   └── PaginationBar.tsx          # Bottom: page numbers + count
│   ├── feed/
│   │   ├── CardGrid.tsx               # Grid layout, manages expand state
│   │   ├── PostCard.tsx               # Individual card (collapsed state)
│   │   └── PostCardExpanded.tsx        # Expanded state with embed + full excerpt
│   ├── stage/
│   │   └── TargetingBrackets.tsx      # Corner bracket overlay (existing, keep)
│   └── header/
│       └── ThemeToggle.tsx            # Dark/light toggle (existing, keep)
├── styles/
│   ├── tokens.css                     # Design tokens (evolve from current)
│   └── ambient.css                    # Background animations (existing, keep)
├── types/
│   └── video.ts                       # Rename to post.ts, update type
├── hooks/
│   └── usePosts.ts                    # Fetch posts from API, handle pagination
├── lib/
│   └── api.ts                         # API client (fetch wrapper)
└── App.tsx                            # Router setup, layout shell
```

### State Management

- No state library. React state + URL query params.
- `CardGrid` manages which card (if any) is expanded via `expandedId` state
- Pagination and tag filter state derived from URL query params
- `usePosts` hook fetches from the API based on current page/tag

### Data Flow

1. URL query params (`page`, `tag`) drive which data is fetched
2. `usePosts` hook calls `GET /api/posts?page=X&tag=Y`
3. `CardGrid` receives posts array, renders `PostCard` components
4. Click on card → `expandedId` set → that card renders as `PostCardExpanded`
5. Tag click in `ChannelBar` or `PostCard` → update URL query param → triggers refetch

## Backend Architecture

### Stack

- Cloudflare Worker with Hono
- D1 (SQLite)
- Wrangler for dev/deploy

### Content Workflow

**Day one — Direct API:**
`POST /api/posts` with JSON body from curl, Postman, or a script. Protected by API key.

**Later (optional) — Headless CMS:**
Hook up Sanity, Contentful, or similar. The CMS publishes to the same API, or the Worker reads from the CMS. Frontend doesn't change.

### Deployment

- Frontend: Cloudflare Pages (Vite build → `dist/`)
- API: Separate Cloudflare Worker
- Same domain via Cloudflare routing: `mol.dev` → Pages, `mol.dev/api/*` → Worker

## Responsive Behavior

- **Desktop (>768px)**: 2-column card grid, full channel bar with tag pills
- **Mobile (<768px)**: 1-column cards, tag pills horizontally scrollable, cards stack vertically
- Desktop is the primary design target. Mobile should work well but doesn't need to feel native.

## Accessibility

- Keyboard navigation: Tab through cards, Enter to expand, Escape to collapse
- `aria-expanded` on cards
- `aria-live="polite"` region announces card expand/collapse
- `aria-current="page"` on active pagination button and tag filter
- `aria-label` on interactive elements
- `prefers-reduced-motion`: disable breathing/float animations, instant transitions
- Focus indicators: visible accent ring on all interactive elements

## Success Criteria

- [ ] Paginated card grid feed with data from API
- [ ] Tag filtering via channel bar
- [ ] Inline card expand with YouTube embed + full excerpt
- [ ] Wii-inspired card interactions (hover lift/glow, breathing idle, expand/collapse)
- [ ] Targeting brackets on expanded card
- [ ] Console chrome aesthetic (translucent bars, rounded pills, power LED, system fonts)
- [ ] Ambient background (orbs + grid, carried forward)
- [ ] Cloudflare Worker API with D1, API key auth
- [ ] Dark/light theme support
- [ ] Keyboard accessible
- [ ] Responsive (2-col desktop, 1-col mobile)
- [ ] `prefers-reduced-motion` support
