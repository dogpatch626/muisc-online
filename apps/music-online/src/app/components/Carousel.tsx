import React, { JSX } from 'react';

type carouselProps = {
  songs: { id: number; content: JSX.Element }[];
};

export default function Carousel({ songs }: carouselProps) {
  return (
    <div className="carousel-item-container w-12/12 h-12/12">
      <table className="song-table">
        <thead>
          <tr>
            <th>Songs</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((val, i) => (
            <tr className={`word${i + 1}`} key={`song-id-${val.id}`}>
              <td>{val.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
