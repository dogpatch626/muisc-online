'use client';
import { useState, useContext } from 'react';
import CarouselItem from './CarouselItem';
import { VideoContext } from '../page';

type carouselProps = {
  songs: { id: number; content: React.JSX.Element }[];
};

export default function Carousel({ songs }: carouselProps) {
  const [active, setActive] = useState(0);
  const context = useContext(VideoContext);
  function dispatchSetActive(event: React.MouseEvent): void {
    const caughtClick = event.currentTarget.className.split('-')[1];
    // console.log(context);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    context.updatePosition(parseInt(caughtClick));
    setActive(parseInt(caughtClick));
    event.preventDefault();
  }

  return (
    <div className="carousel-item-container">
      <table className="carousel-song-table">
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
