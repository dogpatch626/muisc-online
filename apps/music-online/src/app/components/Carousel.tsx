import React, { JSX } from 'react';

type carouselProps = {
  songs: { id: number; content: JSX.Element }[];
};

export default function Carousel({ songs }: carouselProps) {
  return (
    <div className="circle block">
      {songs.map((val, i) => (
        <span className={`word${i + 1}`} key={`song-id-${val.id}`}>
          SONG NAME
        </span>
      ))}
    </div>
  );
}
