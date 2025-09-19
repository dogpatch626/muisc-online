import React from 'react';

type PropTypes = {
  moveLeft: () => void;
  moveRight: () => void;
};

export default function PlayerControlComponents({
  moveLeft,
  moveRight,
}: PropTypes) {
  return (
    <div className="flex flex-row ">
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
  );
}
