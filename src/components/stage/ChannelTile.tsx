import { useState, useEffect } from 'react';
import './ChannelTile.css';

interface ChannelTileProps {
  thumbnail: string;
  title: string;
  artist: string;
  description?: string;
  currentIndex: number;
  totalCount: number;
  onNavigate: (index: number) => void;
  onClick: () => void;
}

function useClockTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function ChannelTile({
  thumbnail,
  title,
  artist,
  description,
  currentIndex,
  totalCount,
  onNavigate,
  onClick,
}: ChannelTileProps) {
  const prev = currentIndex === 0 ? totalCount - 1 : currentIndex - 1;
  const next = currentIndex === totalCount - 1 ? 0 : currentIndex + 1;
  const now = useClockTime();
  const [showNotes, setShowNotes] = useState(false);

  // Close notes when video changes
  useEffect(() => setShowNotes(false), [currentIndex]);

  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div className="channel-tile">
      {/* Video area */}
      <button
        className="channel-screen-btn"
        onClick={onClick}
        aria-label={`Play ${title}`}
      >
        <div className="channel-screen">
          <img src={thumbnail} alt={title} className="channel-thumb" />
          <div className="channel-shine" />
          <div className="channel-scanlines" />

          {/* Notes overlay */}
          {showNotes && description && (
            <div className="notes-overlay">
              <div className="notes-content">
                <span className="notes-label">About this video</span>
                <p className="notes-text">{description}</p>
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Nav controls */}
      <div className="crt-panel">
        <button
          className="crt-arrow"
          onClick={() => onNavigate(prev)}
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="crt-info">
          <span className="crt-title">{title}</span>
          <span className="crt-artist">{artist} · {currentIndex + 1}/{totalCount}</span>
        </div>
        <button
          className="crt-arrow"
          onClick={() => onNavigate(next)}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Wii footer */}
      <div className="wii-footer">
        <svg className="wii-curve" viewBox="0 0 400 10" preserveAspectRatio="none">
          <path d="M0,0 L120,0 C160,0 170,7 200,7 C230,7 240,0 280,0 L400,0 L400,10 L0,10 Z" fill="rgba(210,215,220,0.5)" />
          <path d="M0,0 L120,0 C160,0 170,7 200,7 C230,7 240,0 280,0 L400,0" fill="none" stroke="url(#curveGrad)" strokeWidth="1.5" />
          <defs>
            <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a0daf0" />
              <stop offset="25%" stopColor="#6ec6e6" />
              <stop offset="50%" stopColor="#4db8d8" />
              <stop offset="75%" stopColor="#6ec6e6" />
              <stop offset="100%" stopColor="#a0daf0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="wii-footer-content">
          <button
            className={`wii-footer-btn ${showNotes ? 'wii-footer-btn-active' : ''}`}
            aria-label="Notes"
            onClick={() => setShowNotes(!showNotes)}
          >
            <svg className="wii-footer-btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </button>
          <div className="wii-footer-center">
            <div className="wii-clock">
              <span className="wii-clock-time">{hours}:{minutes}</span>
              <span className="wii-clock-ampm">{ampm}</span>
            </div>
            <div className="wii-date">{dateStr}</div>
          </div>
          <button className="wii-footer-btn" aria-label="Browse all videos">
            <svg className="wii-footer-btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
