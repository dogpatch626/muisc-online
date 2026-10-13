import { useState, useEffect } from 'react';
import { AmbientBackground } from './components/ambient/AmbientBackground';
import { ChannelTile } from './components/stage/ChannelTile';
import { WatchMode } from './components/watch/WatchMode';
import { embedUrl, thumbnailUrl, type Video } from './types/video';
import type { Post } from './types/post';
import './App.css';

const videos: Video[] = [
  {
    id: '0cDe2pK4SoU',
    title: 'man in the mirror & Artist of the century',
    artist: 'MIKE',
    description: 'We\'re starting off the week with something more recent. MIKE brings two songs together to help present us something so simple yet complicated in all of the small details. This is one that really inspired me to get this project running.',
  },
  {
    id: 'OH9A6tn_P6g', // TODO: real YouTube ID
    title: 'Ignorance',
    artist: 'Paramore',
    description: 'Imagine 2012, playing AdventureQuest Worlds, and suddenly I\'m enthralled by this video popping up on YouTube. Truly one of my first inspirations.',
  },
  {
    id: 'IVNub204dOY', // TODO: real YouTube ID
    title: 'Go Up ft. Cat Power',
    artist: 'Cassius, Pharrell Williams',
    description: 'Cassius, Pharrell and Cat Power work to create an incredible electronic dance track and top it off with a masterclass in creativity by the director Alexandre Courtès.',
  },
  {
    id: 'nhPaWIeULKk', // TODO: real YouTube ID
    title: 'Stylo',
    artist: 'Gorillaz',
    description: 'With such striking vocals from Bobby Womack and an appearance from Bruce Willis, this video embodies what the track feels like, quite the chase.',
  },
  {
    id: 'SBjQ9tuuTJQ', // TODO: real YouTube ID
    title: 'The Pretender',
    artist: 'Foo Fighters',
    description: 'It was hard to choose what to put last, but this is another one of those formative videos that I first saw on MTV growing up. Foo Fighters, while not my favorite band these days, will always be so important because of how early I was introduced to them.',
  },
];

// Mailbox posts. Append new ones at the end; the last is the newest.
const posts: Post[] = [
  {
    id: 'welcome',
    title: 'Welcome to Music Online', // TODO: your post
    date: '10/13/2026',
    body: 'Welcome to Music Online, a place to find new music and new music videos to watch! For as long as I can remember I\'ve not only been passionate about music but passionate about the videos attached to them. Music videos are an incredible way to enhance the storytelling of a song, but sometimes they\'re also just cool visuals to pair with it, and so here I present to you a fun project to share the things I love.',
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
