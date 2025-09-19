'use client';
import Image from 'next/image';
// App.jsx
import React, { useState } from 'react';
import ActiveChannel from './ActiveChannel';

export default function Home() {
  const [position, setPos] = useState(0);
  const [change] = useState(false);

  const carouselItems = [
    {
      id: 1,
      content: (
        <iframe
          className="embed"
          key={'mike'}
          src="https://www.youtube.com/embed/0cDe2pK4SoU?si=Wj_zYXZ5qdB7rX-B"
          title="YouTube video player"
          frameBorder={'none'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      id: 2,
      content: (
        <iframe
          className="embed"
          key={'dj'}
          src="https://www.youtube.com/embed/pfLKzdBxd98?si=FGZAhTytMZp8Ne-Z"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      id: 3,
      content: (
        <iframe
          className="embed"
          key={'sade'}
          src="https://www.youtube.com/embed/kcPc18SG6uA?si=jyhnBzDcvHUjYAKY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      id: 4,
      content: (
        <iframe
          className="embed"
          src="https://www.youtube.com/embed/04mfKJWDSzI?si=6orlk7BtIn4rqutH"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      id: 5,
      content: (
        <iframe
          className="embed"
          src="https://www.youtube.com/embed/04mfKJWDSzI?si=6orlk7BtIn4rqutH"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      id: 6,
      content: (
        <iframe
          className="embed"
          src="https://www.youtube.com/embed/04mfKJWDSzI?si=6orlk7BtIn4rqutH"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ),
    },
  ];

  function moveLeft(): void {
    // circular array
    setPos((position - (1 % 6) + 6) % 6);
  }
  function moveRight(): void {
    setPos((position + 1) % 6);
  }

  return (
    <div className="tv-container">
      <div className="tv-body">
        <div className="tv-screen-container">
          <div className="tv-screen">
            <div className="content ">
              {change && (
                <Image
                  src={
                    'https://media1.tenor.com/m/88dnH_mHRLAAAAAC/static-tv-static.gif'
                  }
                  alt="static"
                  key={'static'}
                  priority={true}
                  width={25}
                  height={25}
                ></Image>
              )}
              {} <ActiveChannel channel={carouselItems[position]} />
            </div>
            <div className="scan-lines"></div>
            <div className="flicker"></div>
          </div>
        </div>

        <div className="tv-controls">
          <div className="speaker-grille"></div>
          <div className="knob-container"></div>
        </div>
      </div>
      <div className="tv-stand"></div>
      <div className="flex flex-row gap-5">
        <button type="button" onClick={moveLeft} className="player-actions">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
              viewBox="0 0 48 48"
              fill="currentColor"
            >
              <path d="M14 12v24h-4V12h4zm3.5 12 15 9V15l-15 9z" />
            </svg>
          </div>
        </button>
        {/* pause button */}
        <button type="button" onClick={moveRight} className="player-actions">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
              viewBox="0 0 48 48"
              fill="currentColor"
              className="player-actions"
            >
              <path d="M14 42V6h8v36Zm16 0V6h8v36Z" />
            </svg>
          </div>
        </button>
        <button type="button" className="player-actions" onClick={moveRight}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
              viewBox="0 0 48 48"
              fill="currentColor"
            >
              <path d="m16 33 15-9-15-9v18Zm18-21v24h4V12Z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
