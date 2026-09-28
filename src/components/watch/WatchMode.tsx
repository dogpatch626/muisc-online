import { WatchHUD } from './WatchHUD';
import type { Video } from '@/types/video';
import './WatchMode.css';

interface WatchModeProps {
  video: Video;
  onExit: () => void;
}

export function WatchMode({ video, onExit }: WatchModeProps) {
  return (
    <div className="watch-mode" onClick={(e) => {
      if (e.target === e.currentTarget) onExit();
    }}>
      <div className="watch-viewport">
        <div className="watch-card">
          <iframe
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <WatchHUD title={video.title} artist={video.artist} />
          <div className="watch-accent-line">
            <div className="watch-accent-fill" />
          </div>
        </div>
      </div>

      <div className="watch-hint">
        Press ESC to return &middot; {video.title}
      </div>
    </div>
  );
}
