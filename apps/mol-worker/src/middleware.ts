import { Context } from 'hono';
import type { WorkerEnv } from '@online-music/types';

/**
 * Simple rate limiter using Cloudflare KV
 * @param c Hono context
 * @param limit Maximum requests per window
 * @param window Time window in seconds
 */
export async function rateLimit(
  c: Context<{ Bindings: WorkerEnv }>,
  limit = 100,
  window = 60
) {
  const cache = c.env.CACHE;
  if (!cache) return null; // No rate limiting if KV not configured

  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  const key = `ratelimit:${ip}`;

  const current = await cache.get(key);
  const count = current ? parseInt(current) : 0;

  if (count >= limit) {
    return c.json(
      {
        success: false,
        error: 'Too many requests',
        message: `Rate limit exceeded. Try again in ${window} seconds.`,
      },
      429
    );
  }

  await cache.put(key, String(count + 1), {
    expirationTtl: window,
  });

  return null;
}

/**
 * Bearer token authentication middleware
 */
export async function authenticate(c: Context<{ Bindings: WorkerEnv }>) {
  const authorization = c.req.header('Authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return c.json(
      {
        success: false,
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      },
      401
    );
  }

  const token = authorization.substring(7);

  // Verify token (example using KV)
  const cache = c.env.CACHE;
  if (cache) {
    const valid = await cache.get(`token:${token}`);
    if (!valid) {
      return c.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'Invalid or expired token',
        },
        401
      );
    }
  }

  return null;
}
