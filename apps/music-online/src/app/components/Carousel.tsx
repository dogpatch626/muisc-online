'use client';
import { JSX, useState } from 'react';
import CarouselItem from './CarouselItem';

type carouselProps = {
  songs: { id: number; content: JSX.Element }[];
};

export default function Carousel({ songs }: carouselProps) {
  const [active, setActive] = useState(0);
  function dispatchSetActive(event: React.MouseEvent): void {
    const caughtClick = event.currentTarget.className.split('-')[1];

    setActive(parseInt(caughtClick));
    event.preventDefault();
  }
  return (
    <div className="carousel-item-container">
      <table className="song-table">
        <thead>
          <tr>
            <th>Songs</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((val, i) => (
            <tr
              className={`song-${i}`}
              key={`song-id-${val.id}`}
              onClick={dispatchSetActive}
            >
              <CarouselItem
                activeItem={active}
                setActiveItem={setActive}
                index={i}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
