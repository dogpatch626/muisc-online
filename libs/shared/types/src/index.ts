// Shared types across the monorepo
import type {
  D1Database,
  KVNamespace,
  R2Bucket,
} from '@cloudflare/workers-types';

export interface VideoItem {
  id: string;
  title: string;
  artist: string;
  videoId: string;
  src: string;
  channelId?: string;
  description?: string;
  tags?: string[];
  createdAt?: number;
  updatedAt?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Cloudflare Worker Environment Bindings
export interface WorkerEnv {
  // KV Namespace for caching
  CACHE?: KVNamespace;

  // R2 Bucket for file storage
  UPLOADS?: R2Bucket;

  // D1 Database
  DB?: D1Database;

  // Environment variables
  ENVIRONMENT?: string;
  JWT_SECRET?: string;
  ALLOWED_ORIGINS?: string;
}
