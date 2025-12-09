import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type {
  WorkerEnv,
  VideoItem,
  ApiResponse,
  PaginatedResponse,
} from '@online-music/types';
import { videoSchema, videoUpdateSchema, paginationSchema } from '../schemas';
import { rateLimit, authenticate } from '../middleware';

const videos = new Hono<{ Bindings: WorkerEnv }>();

// Rate limiting middleware for all video routes
videos.use('*', async (c, next) => {
  const limited = await rateLimit(c);
  if (limited) return limited;
  return await next();
});

/**
 * GET /api/videos
 * List all videos with pagination and filtering
 */
videos.get('/', zValidator('query', paginationSchema), async (c) => {
  const { page, limit, tag, artist } = c.req.valid('query');
  const cache = c.env.CACHE;

  try {
    // Try to get from cache first
    let allVideos: VideoItem[] = [];

    if (cache) {
      const cached = await cache.get('videos:all', 'json');
      if (cached) {
        allVideos = cached as VideoItem[];
      }
    }

    // Filter by tag or artist if provided
    let filtered = allVideos;
    if (tag) {
      filtered = filtered.filter((v) => v.tags?.includes(tag));
    }
    if (artist) {
      filtered = filtered.filter((v) =>
        v.artist.toLowerCase().includes(artist.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVideos = filtered.slice(startIndex, endIndex);

    const response: PaginatedResponse<VideoItem> = {
      data: paginatedVideos,
      page,
      limit,
      total: filtered.length,
      hasMore: endIndex < filtered.length,
    };

    return c.json(response);
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch videos',
        message: error instanceof Error ? error.message : 'Unknown error',
      } as ApiResponse,
      500
    );
  }
});

/**
 * GET /api/videos/:id
 * Get a single video by ID
 */
videos.get('/:id', async (c) => {
  const id = c.req.param('id');
  const cache = c.env.CACHE;

  try {
    if (cache) {
      const video = await cache.get(`video:${id}`, 'json');

      if (!video) {
        return c.json(
          {
            success: false,
            error: 'Not found',
            message: `Video with ID ${id} not found`,
          } as ApiResponse,
          404
        );
      }

      return c.json({
        success: true,
        data: video,
      } as ApiResponse<VideoItem>);
    }

    return c.json(
      {
        success: false,
        error: 'Service unavailable',
        message: 'Cache not configured',
      } as ApiResponse,
      503
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch video',
        message: error instanceof Error ? error.message : 'Unknown error',
      } as ApiResponse,
      500
    );
  }
});

/**
 * POST /api/videos
 * Create a new video (requires authentication)
 */
videos.post(
  '/',
  async (c, next) => {
    const authError = await authenticate(c);
    if (authError) return authError;
    return await next();
  },
  zValidator('json', videoSchema),
  async (c) => {
    const validData = c.req.valid('json');
    const cache = c.env.CACHE;

    try {
      const id = crypto.randomUUID();
      const now = Date.now();

      const video: VideoItem = {
        id,
        ...validData,
        createdAt: now,
        updatedAt: now,
      };

      if (cache) {
        // Store the video
        await cache.put(`video:${id}`, JSON.stringify(video));

        // Update the videos list
        const allVideos =
          ((await cache.get('videos:all', 'json')) as VideoItem[]) || [];
        allVideos.push(video);
        await cache.put('videos:all', JSON.stringify(allVideos));
      }

      return c.json(
        {
          success: true,
          data: video,
          message: 'Video created successfully',
        } as ApiResponse<VideoItem>,
        201
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          error: 'Failed to create video',
          message: error instanceof Error ? error.message : 'Unknown error',
        } as ApiResponse,
        500
      );
    }
  }
);

/**
 * PUT /api/videos/:id
 * Update a video (requires authentication)
 */
videos.put(
  '/:id',
  async (c, next) => {
    const authError = await authenticate(c);
    if (authError) return authError;
    return await next();
  },
  zValidator('json', videoUpdateSchema),
  async (c) => {
    const id = c.req.param('id');
    const updates = c.req.valid('json');
    const cache = c.env.CACHE;

    try {
      if (!cache) {
        return c.json(
          {
            success: false,
            error: 'Service unavailable',
            message: 'Cache not configured',
          } as ApiResponse,
          503
        );
      }

      // Get existing video
      const existing = await cache.get(`video:${id}`, 'json');
      if (!existing) {
        return c.json(
          {
            success: false,
            error: 'Not found',
            message: `Video with ID ${id} not found`,
          } as ApiResponse,
          404
        );
      }

      // Update video
      const updated: VideoItem = {
        ...(existing as VideoItem),
        ...updates,
        updatedAt: Date.now(),
      };

      await cache.put(`video:${id}`, JSON.stringify(updated));

      // Update videos list
      const allVideos =
        ((await cache.get('videos:all', 'json')) as VideoItem[]) || [];
      const index = allVideos.findIndex((v) => v.id === id);
      if (index !== -1) {
        allVideos[index] = updated;
        await cache.put('videos:all', JSON.stringify(allVideos));
      }

      return c.json({
        success: true,
        data: updated,
        message: 'Video updated successfully',
      } as ApiResponse<VideoItem>);
    } catch (error) {
      return c.json(
        {
          success: false,
          error: 'Failed to update video',
          message: error instanceof Error ? error.message : 'Unknown error',
        } as ApiResponse,
        500
      );
    }
  }
);

/**
 * DELETE /api/videos/:id
 * Delete a video (requires authentication)
 */
videos.delete(
  '/:id',
  async (c, next) => {
    const authError = await authenticate(c);
    if (authError) return authError;
    return await next();
  },
  async (c) => {
    const id = c.req.param('id');
    const cache = c.env.CACHE;

    try {
      if (!cache) {
        return c.json(
          {
            success: false,
            error: 'Service unavailable',
            message: 'Cache not configured',
          } as ApiResponse,
          503
        );
      }

      // Check if video exists
      const existing = await cache.get(`video:${id}`, 'json');
      if (!existing) {
        return c.json(
          {
            success: false,
            error: 'Not found',
            message: `Video with ID ${id} not found`,
          } as ApiResponse,
          404
        );
      }

      // Delete video
      await cache.delete(`video:${id}`);

      // Update videos list
      const allVideos =
        ((await cache.get('videos:all', 'json')) as VideoItem[]) || [];
      const filtered = allVideos.filter((v) => v.id !== id);
      await cache.put('videos:all', JSON.stringify(filtered));

      return c.json({
        success: true,
        message: 'Video deleted successfully',
      } as ApiResponse);
    } catch (error) {
      return c.json(
        {
          success: false,
          error: 'Failed to delete video',
          message: error instanceof Error ? error.message : 'Unknown error',
        } as ApiResponse,
        500
      );
    }
  }
);

export default videos;
