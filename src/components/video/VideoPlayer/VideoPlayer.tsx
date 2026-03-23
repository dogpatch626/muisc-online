/**
 * VideoPlayer Component
 * Video player wrapper with glass controls
 */

import { useRef } from 'react';
import type { VideoPlayerProps } from '../../../types/design-system';

export function VideoPlayer({
  src,
  poster,
  autoplay = false,
  controls = true,
  onEnded,
  onPlay,
  onPause,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`video-player ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        controls={controls}
        onEnded={onEnded}
        onPlay={onPlay}
        onPause={onPause}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}
