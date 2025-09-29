'use client';

import { ComponentProps } from 'react';

type ActiveChannelProps = ComponentProps<'div'> & {
  channel: { id: number; artist: string; src: string };
};

export default function ActiveChannel({
  channel,
  ...props
}: ActiveChannelProps) {
  return (
    <div className="w-12/12 h-12/12">
      {' '}
      <iframe
        id="video-player"
        className="embed"
        key={channel.artist}
        src={channel.src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        seamless
        sandbox="allow-scripts allow-same-origin allow-presentation"
      ></iframe>
    </div>
  );
}
