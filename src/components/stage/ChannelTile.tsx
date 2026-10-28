import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import type { Post } from '@/types/post';
import './ChannelTile.css';

interface ChannelTileProps {
  thumbnail: string;
  embed: string;
  title: string;
  artist: string;
  description?: string;
  currentIndex: number;
  totalCount: number;
  onNavigate: (index: number) => void;
  onExpand: () => void;
  posts: Post[];
  unread: number;
  onMailOpen: () => void;
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
  embed,
  title,
  artist,
  description,
  currentIndex,
  totalCount,
  onNavigate,
  onExpand,
  posts,
  unread,
  onMailOpen,
}: ChannelTileProps) {
  const prev = currentIndex === 0 ? totalCount - 1 : currentIndex - 1;
  const next = currentIndex === totalCount - 1 ? 0 : currentIndex + 1;
  const now = useClockTime();
  // Bubbles and playback are tied to an index, so navigating away resets both
  const [bubble, setBubble] = useState<{ kind: 'notes' | 'mail'; index: number; newCount: number } | null>(null);
  const openBubble = bubble?.index === currentIndex ? bubble.kind : null;
  // Keeps the bubble mounted while the slide-down animation plays
  const [bubbleClosing, setBubbleClosing] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const notesBtnRef = useRef<HTMLButtonElement>(null);
  const mailBtnRef = useRef<HTMLButtonElement>(null);

  // Click anywhere outside the open bubble closes it; the bubble buttons handle themselves
  useEffect(() => {
    if (!openBubble) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if ([bubbleRef, notesBtnRef, mailBtnRef].some((r) => r.current?.contains(target))) return;
      setBubbleClosing(true);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openBubble]);

  // Phones cap the bubble to the space left below it (see ChannelTile.css). offsetTop
  // ignores the pop-in transform, so this is right even mid-animation.
  useLayoutEffect(() => {
    if (!openBubble) return;
    const fit = () => bubbleRef.current?.style.setProperty('--bubble-top', `${bubbleRef.current.offsetTop}px`);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [openBubble]);

  const toggleBubble = (kind: 'notes' | 'mail') => {
    if (openBubble === kind) {
      setBubbleClosing(true);
    } else {
      setBubbleClosing(false);
      // Snapshot unread before onMailOpen clears it, so the bubble can still highlight them
      setBubble({ kind, index: currentIndex, newCount: unread });
      if (kind === 'mail') onMailOpen();
    }
  };
  const [showLibrary, setShowLibrary] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const playing = playingIndex === currentIndex;

  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <>
    <div className="channel-tile">
      {/* Video area */}
      <div className="channel-screen">
        {playing ? (
          <iframe
            src={embed}
            title={title}
            className="channel-thumb"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            className="channel-screen-btn"
            onClick={() => setPlayingIndex(currentIndex)}
            aria-label={`Play ${title}`}
          >
            <img src={thumbnail} alt={title} className="channel-thumb" />
          </button>
        )}
        <div className="channel-shine" />
        <div className="scanlines" />
        <button className="channel-expand" onClick={onExpand} aria-label="Expand to watch mode">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>

      </div>

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
            className={`wii-footer-btn ${openBubble === 'notes' ? 'wii-footer-btn-active' : ''}`}
            ref={notesBtnRef}
            aria-label="Notes"
            onClick={() => toggleBubble('notes')}
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
          <div className="wii-footer-group">
            <button className="wii-footer-btn" aria-label="Library" onClick={() => setShowLibrary(true)}>
              <svg className="wii-footer-btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button
              className={`wii-footer-btn wii-mail ${openBubble === 'mail' ? 'wii-footer-btn-active' : ''}`}
              ref={mailBtnRef}
              aria-label={unread ? `Mail, ${unread} unread` : 'Mail'}
              onClick={() => toggleBubble('mail')}
            >
              <svg className="wii-footer-btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22 6 12 13 2 6" />
              </svg>
              {unread > 0 && <span className="wii-mail-badge" aria-hidden="true">{unread}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Library modal */}
      {showLibrary && (
        <div className="library-modal-backdrop" onClick={() => setShowLibrary(false)}>
          <div className="library-modal" onClick={e => e.stopPropagation()}>
            <p className="library-modal-text">Library coming soon</p>
            <button className="library-modal-btn" onClick={() => setShowLibrary(false)}>OK</button>
          </div>
        </div>
      )}
    </div>

    {/* Notes / mail bubble, below the tile in page flow */}
    {(openBubble === 'mail' || (openBubble === 'notes' && description)) && (
      <div
        key={openBubble}
        ref={bubbleRef}
        className={`notes-content ${openBubble === 'mail' ? 'mail-content' : ''} ${bubbleClosing ? 'notes-closing' : ''}`}
        onAnimationEnd={(e) => {
          if (bubbleClosing && e.target === e.currentTarget) {
            setBubble(null);
            setBubbleClosing(false);
          }
        }}
      >
        <div className="notes-scroll">
        {openBubble === 'notes' ? (
          <>
            <span className="notes-label">About this video</span>
            <p className="notes-text">{description}</p>
          </>
        ) : (
          <>
            <span className="notes-label">Mail</span>
            {[...posts].reverse().map((post, i) => (
              <article key={post.id} className={`mail-post ${i < (bubble?.newCount ?? 0) ? 'mail-post-new' : ''}`}>
                <h3 className="mail-post-title">
                  {post.title}
                  {i < (bubble?.newCount ?? 0) && <span className="mail-post-badge">New</span>}
                </h3>
                <span className="mail-post-date">{post.date}</span>
                <p className="notes-text">{post.body}</p>
              </article>
            ))}
          </>
        )}
        </div>
      </div>
    )}
    </>
  );
}
