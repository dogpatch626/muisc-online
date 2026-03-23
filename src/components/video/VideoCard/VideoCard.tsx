/**
 * VideoCard Component
 * Video preview card wrapper around GlassCard
 */

import { GlassCard } from '../../core';
import type { VideoCardProps } from '../../../types/design-system';

export function VideoCard({
  video,
  featured = false,
  compact = false,
  onClick,
  className = '',
}: VideoCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(video);
    }
  };

  const meta = [];
  if (video.views !== undefined) {
    meta.push(`${video.views.toLocaleString()} views`);
  }
  if (video.publishedAt) {
    meta.push(video.publishedAt);
  }

  return (
    <GlassCard
      thumbnail={video.thumbnail}
      title={video.title}
      artist={video.artist}
      duration={video.duration}
      meta={meta}
      featured={featured}
      compact={compact}
      onClick={handleClick}
      className={className}
    />
  );
}
