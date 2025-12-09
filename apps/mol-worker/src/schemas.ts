import { z } from 'zod';

/**
 * Video validation schema
 */
export const videoSchema = z.object({
  title: z.string().min(1).max(200),
  artist: z.string().min(1).max(100),
  videoId: z.string().regex(/^[a-zA-Z0-9_-]{11}$/, 'Invalid YouTube video ID'),
  src: z.string().url(),
  channelId: z.string().optional(),
  description: z.string().max(1000).optional(),
  tags: z.array(z.string()).max(10).optional(),
});

/**
 * Video update schema (all fields optional)
 */
export const videoUpdateSchema = videoSchema.partial();

/**
 * Query parameters schema for pagination
 */
export const paginationSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default(1),
  limit: z.string().regex(/^\d+$/).transform(Number).default(10),
  tag: z.string().optional(),
  artist: z.string().optional(),
});

export type VideoInput = z.infer<typeof videoSchema>;
export type VideoUpdate = z.infer<typeof videoUpdateSchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
