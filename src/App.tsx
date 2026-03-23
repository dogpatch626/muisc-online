import { useState } from "react";
import "./App.css";

// Sample video data
const videos = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    thumbnail: "https://picsum.photos/seed/video1/1280/720",
    url: "https://www.youtube.com/watch?v=0cDe2pK4SoU&list=RD0cDe2pK4SoU&start_radio=1",
  },
  {
    id: 2,
    title: "Electric Pulse",
    artist: "Digital Horizon",
    thumbnail: "https://picsum.photos/seed/video2/1280/720",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 3,
    title: "Cyber Rain",
    artist: "Tokyo Nights",
    thumbnail: "https://picsum.photos/seed/video3/1280/720",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    title: "Midnight Drive",
    artist: "RetroWave",
    thumbnail: "https://picsum.photos/seed/video4/1280/720",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 5,
    title: "Quantum Echo",
    artist: "Future Bass",
    thumbnail: "https://picsum.photos/seed/video5/1280/720",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const currentVideo = videos[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      {/* Ambient background */}
      <div className="ambient-bg">
        <div className="ambient-gradient ambient-gradient-1"></div>
        <div className="ambient-gradient ambient-gradient-2"></div>
        <div className="ambient-gradient ambient-gradient-3"></div>
      </div>

      {/* Grid overlay */}
      <div className="grid-overlay"></div>

      {/* Theme toggle */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <div className="theme-toggle-track">
          <div className="theme-toggle-thumb"></div>
        </div>
      </button>

      {/* Main container */}
      <div className="container">
        {/* Floating TV Screen */}
        <div className="tv-container">
          <div className="tv-screen">
            {/* Screen bezel */}
            <div className="screen-bezel">
              {/* Video display */}
              <div className="video-display">
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="video-thumbnail"
                />
                <div className="video-overlay">
                  <button className="play-button" aria-label="Play video">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Info bar */}
              <div className="info-bar">
                <div className="info-content">
                  <h2 className="video-title">{currentVideo.title}</h2>
                  <p className="video-artist">{currentVideo.artist}</p>
                </div>
                <div className="video-counter">
                  <span className="counter-current">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="counter-separator">/</span>
                  <span className="counter-total">
                    {String(videos.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* TV stand */}
            <div className="tv-stand">
              <div className="stand-neck"></div>
              <div className="stand-base"></div>
            </div>

            {/* Glow effects */}
            <div className="screen-glow"></div>
            <div className="screen-reflection"></div>
          </div>

          {/* Control Panel */}
          <div className="control-panel">
            {/* Navigation buttons */}
            <div className="nav-controls">
              <button
                className="nav-button"
                onClick={handlePrevious}
                aria-label="Previous video"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="pagination-dots">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentIndex ? "active" : ""}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="nav-button"
                onClick={handleNext}
                aria-label="Next video"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Progress indicator */}
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentIndex + 1) / videos.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="thumbnail-strip">
          {videos.map((video, index) => (
            <button
              key={video.id}
              className={`thumbnail-item ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            >
              <img src={video.thumbnail} alt={video.title} />
              <div className="thumbnail-overlay">
                <span className="thumbnail-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
