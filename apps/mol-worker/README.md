# Music Online Worker API

A production-ready Hono API running on Cloudflare Workers for the Music Online platform.

## Features

- 🚀 **Hono Framework** - Fast, lightweight web framework for edge computing
- 🔒 **Security** - CORS, rate limiting, secure headers, authentication
- ✅ **Validation** - Zod schemas for request validation
- 📦 **Cloudflare Bindings** - KV, R2, D1 support
- 🎯 **Type Safety** - Full TypeScript support with shared types
- 📝 **Request Tracing** - Request IDs for debugging

## API Endpoints

### Health & Info

```bash
GET /              # API information
GET /health        # Health check
```

### Videos

```bash
GET    /api/videos              # List videos (paginated)
GET    /api/videos/:id          # Get single video
POST   /api/videos              # Create video (requires auth)
PUT    /api/videos/:id          # Update video (requires auth)
DELETE /api/videos/:id          # Delete video (requires auth)
```

#### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `tag` - Filter by tag
- `artist` - Filter by artist name

#### Example Requests

**List videos:**

```bash
curl http://localhost:8788/api/videos?page=1&limit=10

# With filters
curl http://localhost:8788/api/videos?artist=MIKE&tag=hiphop
```

**Get video:**

```bash
curl http://localhost:8788/api/videos/abc-123
```

**Create video (requires authentication):**

```bash
curl -X POST http://localhost:8788/api/videos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Parabol",
    "artist": "TOOL",
    "videoId": "-_nQhGR0K8M",
    "src": "https://www.youtube-nocookie.com/embed/-_nQhGR0K8M",
    "tags": ["progressive rock", "metal"]
  }'
```

**Update video:**

```bash
curl -X PUT http://localhost:8788/api/videos/abc-123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Updated Title",
    "tags": ["new", "tags"]
  }'
```

**Delete video:**

```bash
curl -X DELETE http://localhost:8788/api/videos/abc-123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Development

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
# or from root: npm run dev:worker
```

The API will be available at `http://localhost:8788`

### Type Generation

Generate TypeScript types for Cloudflare bindings:

```bash
npm run cf-typegen
```

## Deployment

### Deploy to Cloudflare

```bash
npm run deploy
# or from root: npx nx deploy mol-worker
```

### Setup Cloudflare Bindings

1. **Create KV Namespace:**

```bash
wrangler kv:namespace create CACHE
wrangler kv:namespace create CACHE --preview
```

2. **Update wrangler.jsonc** with the namespace IDs:

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "CACHE",
      "id": "your-production-id",
      "preview_id": "your-preview-id"
    }
  ]
}
```

3. **Create R2 Bucket (optional):**

```bash
wrangler r2 bucket create music-online-uploads
```

4. **Create D1 Database (optional):**

```bash
wrangler d1 create music-online-db
wrangler d1 execute music-online-db --file=./schema.sql
```

## Security

### CORS Configuration

Allowed origins are configured in `src/index.ts`:

- `http://localhost:3000` (Next.js dev)
- `http://localhost:8788` (Worker dev)
- `https://music-online.pages.dev` (Production)

Update the `allowedOrigins` array to add more domains.

### Rate Limiting

- Default: 100 requests per 60 seconds per IP
- Uses Cloudflare KV for tracking
- Configure in `src/middleware.ts`

### Authentication

Protected routes require a Bearer token:

```
Authorization: Bearer YOUR_TOKEN
```

Tokens are stored in KV with key format: `token:YOUR_TOKEN`

To create a token for development:

```bash
wrangler kv:key put --binding=CACHE "token:dev-token-123" "user@example.com"
```

## Project Structure

```
src/
├── index.ts           # Main app with middleware and error handlers
├── routes/
│   └── videos.ts      # Video CRUD operations
├── middleware.ts      # Rate limiting and authentication
└── schemas.ts         # Zod validation schemas
```

## Environment Variables

Configure in `wrangler.jsonc`:

```jsonc
{
  "vars": {
    "ENVIRONMENT": "production",
    "JWT_SECRET": "your-secret-key"
  }
}
```

## Type Safety

Shared types are imported from `@online-music/types`:

```typescript
import type { WorkerEnv, VideoItem, ApiResponse } from '@online-music/types';
```

## Middleware Stack

1. **Request ID** - Unique ID for request tracing
2. **Logger** - Console logging with request IDs
3. **Security Headers** - CSP, X-Frame-Options, etc.
4. **CORS** - Cross-origin resource sharing
5. **Timeout** - 30 second timeout protection
6. **Rate Limiting** - Per-IP rate limits (optional)
7. **Authentication** - Bearer token auth (optional)

## Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message",
  "requestId": "abc-123-def"
}
```

## Testing

Use curl, Postman, or any HTTP client:

```bash
# Test health endpoint
curl http://localhost:8788/health

# Test API info
curl http://localhost:8788/

# Test videos endpoint
curl http://localhost:8788/api/videos
```

## Performance

- Runs on Cloudflare's global edge network
- Sub-millisecond response times worldwide
- Automatic scaling
- Built-in DDoS protection

## Troubleshooting

### KV Namespace not found

Make sure you've created the KV namespace and updated `wrangler.jsonc` with the correct IDs.

### CORS errors

Check that your Next.js origin is in the `allowedOrigins` array in `src/index.ts`.

### Rate limiting too aggressive

Adjust the `limit` and `window` parameters in `src/middleware.ts`.

### Type errors

Run `npm run cf-typegen` to regenerate Cloudflare binding types.

## Resources

- [Hono Documentation](https://hono.dev)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Zod Documentation](https://zod.dev)
