import Image from "next/image";
// App.jsx
import React from 'react';
import YAxisCarousel from './YAxisCarousel';



export default function Home() {
  const carouselItems = [
    { id: 1, content: <h2>Slide 1</h2> },
    { id: 2, content: <p>This is the <strong>second</strong> slide.</p> },
    { id: 3, content: <p>mowowowoow</p> },
    { id: 4, content: <h2>Slide 4</h2> },
    { id: 5, content: <h2>Slide 5</h2> },
    { id: 6, content: <h2>Slide 6</h2> },
  ];

  return (


    <div className="tv-container">
      <div className="tv-body">
        <div className="antenna">
          <div className="antenna-rod"></div>
          <div className="antenna-rod"></div>
        </div>

        <div className="tv-screen-container">
          <div className="tv-screen">
            <div className="content ">
              <YAxisCarousel />
            </div>
            <div className="scan-lines"></div>
            <div className="flicker"></div>
          </div>
        </div>

        <div className="tv-controls">
          <div className="speaker-grille"></div>
          <div className="knob-container">
            <div className="knob"></div>
            <div className="knob"></div>
          </div>
        </div>
      </div>
      <div className="tv-stand"></div>
    </div>


  );

}
