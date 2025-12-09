import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { requestId } from 'hono/request-id';
import { timeout } from 'hono/timeout';
import type { WorkerEnv } from '@online-music/types';
import videos from './routes/videos';

const app = new Hono<{ Bindings: WorkerEnv }>();

// ============================================================================
// Middleware Stack
// ============================================================================

// Request ID for tracing
app.use('*', requestId());

// Logging
app.use('*', async (c, next) => {
  const id = c.get('requestId');
  console.log(`[${id}] ${c.req.method} ${c.req.path}`);
  await next();
  console.log(`[${id}] ${c.res.status}`);
});

// Security headers
app.use(
  '*',
  secureHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
    xFrameOptions: 'DENY',
    xContentTypeOptions: 'nosniff',
    referrerPolicy: 'strict-origin-when-cross-origin',
  })
);

// CORS configuration

const allowedOrigins = ['https://music-online.pages.dev'];

app.use(
  '/api/*',
  cors({
    origin: (origin) => {
      if (process.env.NODE_ENV === 'development') {
        return origin || '*';
      }

      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin) return null;

      // Check against allowed origins
      return allowedOrigins.includes(origin) ? origin : null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    exposeHeaders: ['X-Total-Count', 'X-Request-Id'],
    maxAge: 86400, // 24 hours
    credentials: true,
  })
);

// Timeout protection (30 seconds)
app.use('/api/*', timeout(30000));

// ============================================================================
// API Routes
// ============================================================================

// Mount video routes under /api/videos
app.route('/api/videos', videos);

// ============================================================================
// Health & Info Routes
// ============================================================================

app.get('/', (c) => {
  return c.json({
    name: 'Music Online API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api',
    },
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: Date.now(),
    uptime: Date.now(),
  });
});

// ============================================================================
// Error Handlers
// ============================================================================

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: 'Not found',
      message: `Route ${c.req.method} ${c.req.path} not found`,
    },
    404
  );
});

// Error handler
app.onError((err, c) => {
  const requestId = c.get('requestId');
  console.error(`[${requestId}] Error:`, err);

  return c.json(
    {
      success: false,
      error: 'Internal server error',
      message: err.message,
      requestId,
    },
    500
  );
});

export default app;
