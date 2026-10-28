import { useState, useEffect } from 'react';
import { AmbientBackground } from './components/ambient/AmbientBackground';
import { ChannelTile } from './components/stage/ChannelTile';
import { WatchMode } from './components/watch/WatchMode';
import { embedUrl, thumbnailUrl, type Video } from './types/video';
import type { Post } from './types/post';
import currentEntry from './entries/002.json';
import './App.css';

// Weekly entries live in src/entries/NNN.json; bump this import for a new week.
const videos: Video[] = currentEntry.videos;

// Mailbox posts. Append new ones at the end; the last is the newest.
const posts: Post[] = [

  {
    id: 'welcome',
    title: 'Welcome to Music Online', // TODO: your post
    date: '10/13/2026',
    body: 'Welcome to Music Online, a place to find new music and new music videos to watch! For as long as I can remember I\'ve not only been passionate about music but passionate about the videos attached to them. Music videos are an incredible way to enhance the storytelling of a song, but sometimes they\'re also just cool visuals to pair with it, and so here I present to you a fun project to share the things I love.',
  },
  {
    id: "week two",
    title: 'Nostalgia Week', // TODO: your post
    date: '10/28/2026',
    body: 'Hey yall, its another week of music videos and this week I decided to reminice. To Pander to those who grew up in the 2000\'s and 2010\'s.',
  },
];

// Keep in sync with the @media queries in App.css and WatchMode.css.
// max-height excludes tablets, which are also coarse-pointer.
const PHONE_LANDSCAPE = '(orientation: landscape) and (pointer: coarse) and (max-height: 500px)';

// Cookie holds the newest post id the visitor has read
const LAST_READ_COOKIE = 'mol_last_read';
const readLastRead = () =>
  document.cookie.match(new RegExp(`(?:^|; )${LAST_READ_COOKIE}=([^;]*)`))?.[1];
// Everything after the last-read post is unread; no/unknown cookie means all unread
const countUnread = (lastRead?: string) => posts.length - 1 - posts.findIndex((p) => p.id === lastRead);

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unread, setUnread] = useState(() => countUnread(readLastRead()));

  const markMailRead = () => {
    document.cookie = `${LAST_READ_COOKIE}=${posts[posts.length - 1].id}; max-age=31536000; path=/; SameSite=Lax`;
    setUnread(0);
  };
  const [mode, setMode] = useState<'browse' | 'watch'>(() =>
    window.matchMedia(PHONE_LANDSCAPE).matches ? 'watch' : 'browse'
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          if (mode === 'watch') setMode('browse');
          break;
        case 'ArrowLeft':
          if (mode === 'browse')
            setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
          break;
        case 'ArrowRight':
          if (mode === 'browse')
            setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
          break;
        case ' ':
        case 'Enter':
          if (mode === 'browse' && event.target === document.body) {
            event.preventDefault();
            setMode('watch');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  // Phones: landscape enters watch mode, portrait returns to browse
  useEffect(() => {
    const mq = window.matchMedia(PHONE_LANDSCAPE);
    const onChange = () => setMode(mq.matches ? 'watch' : 'browse');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const current = videos[currentIndex];

  return (
    <>
      <AmbientBackground />

      {mode === 'browse' ? (
        <div className="app">
          <div className="app-logo">
            <img src="/logo.png" alt="Music Online" />
          </div>
          <div className="wii-stage">
            <ChannelTile
              thumbnail={thumbnailUrl(current)}
              embed={embedUrl(current)}
              title={current.title}
              artist={current.artist}
              description={current.description}
              currentIndex={currentIndex}
              totalCount={videos.length}
              onNavigate={setCurrentIndex}
              onExpand={() => setMode('watch')}
              posts={posts}
              unread={unread}
              onMailOpen={markMailRead}
            />
          </div>
          <footer className="app-footer">© Music Online — a sterile dreams project</footer>
        </div>
      ) : (
        <WatchMode
          video={current}
          onExit={() => setMode('browse')}
        />
      )}

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Now viewing: {current.title} by {current.artist}.
        Video {currentIndex + 1} of {videos.length}.
      </div>
    </>
  );
}

export default App;
