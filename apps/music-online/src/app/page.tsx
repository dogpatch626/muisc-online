'use client';
import Image from 'next/image';
// App.jsx
import React, { useState } from 'react';
import ActiveChannel from './ActiveChannel';
import PlayerControlComponents from './components/PlayerControlComponents';
import Carousel from './components/Carousel';

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
    setPos((position + (1 % 6) + 6) % 6);
  }

  return (
    <div className="main-container w-12/12">
      <div className="content-body w-8/12">
        <div className="tv-container w-12/12">
          <div className="tv-body w-12/12">
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
                  <ActiveChannel channel={carouselItems[position]} />
                </div>
                <div className="scan-lines"></div>
                <div className="flicker"></div>
              </div>
            </div>
          </div>
          <PlayerControlComponents moveLeft={moveLeft} moveRight={moveRight} />
        </div>
        {/* temporary for placements */}
      </div>
      <div className="carousel-container w-4/12 h-12/12 flex flex-col justify-center">
        <Carousel songs={carouselItems} />
      </div>
    </div>
  );
}
