import { useState, useEffect } from 'react';
import './WatchHUD.css';

interface WatchHUDProps {
  title: string;
  artist: string;
}

export function WatchHUD({ title, artist }: WatchHUDProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleMouseMove = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timer = setTimeout(() => setVisible(false), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="watch-hud" data-visible={visible}>
      <div className="watch-hud-title">{title}</div>
      <div className="watch-hud-artist">{artist}</div>
    </div>
  );
}
