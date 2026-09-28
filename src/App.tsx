import { useState, useEffect } from 'react';
import { AmbientBackground } from './components/ambient/AmbientBackground';
import { ChannelTile } from './components/stage/ChannelTile';
import { WatchMode } from './components/watch/WatchMode';
import type { Video } from './types/video';
import './App.css';

const videos: Video[] = [
  {
    id: 1,
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    thumbnail: 'https://picsum.photos/seed/video1/1280/720',
    url: 'https://www.youtube-nocookie.com/embed/0cDe2pK4SoU?si=ZBtbDhW4dMFobigD&controls=0',
    description: 'A pulsing journey through neon-lit cityscapes. Synthwave Collective captures the electric energy of late-night Tokyo with cascading arpeggios and warm analog pads.',
  },
  {
    id: 2,
    title: 'Electric Pulse',
    artist: 'Digital Horizon',
    thumbnail: 'https://picsum.photos/seed/video2/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Digital Horizon pushes boundaries with layered bass textures and glitchy percussion. A meditation on technology and human connection.',
  },
  {
    id: 3,
    title: 'Cyber Rain',
    artist: 'Tokyo Nights',
    thumbnail: 'https://picsum.photos/seed/video3/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Rain-soaked streets and reflections. Tokyo Nights blends lo-fi beats with ambient field recordings captured across Shibuya.',
  },
  {
    id: 4,
    title: 'Midnight Drive',
    artist: 'RetroWave',
    thumbnail: 'https://picsum.photos/seed/video4/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Windows down, stereo up. RetroWave delivers the perfect soundtrack for cruising empty highways under a starlit sky.',
  },
  {
    id: 5,
    title: 'Quantum Echo',
    artist: 'Future Bass',
    thumbnail: 'https://picsum.photos/seed/video5/1280/720',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Future Bass explores the space between sound and silence. Shimmering chords dissolve into granular textures and re-emerge transformed.',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<'browse' | 'watch'>('browse');

  const handlePlay = () => setMode('watch');

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
              thumbnail={current.thumbnail}
              title={current.title}
              artist={current.artist}
              description={current.description}
              currentIndex={currentIndex}
              totalCount={videos.length}
              onNavigate={setCurrentIndex}
              onClick={handlePlay}
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
