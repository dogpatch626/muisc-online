export interface Video {
  /** YouTube video ID, e.g. `0cDe2pK4SoU` */
  id: string;
  title: string;
  artist: string;
  description?: string;
}

export const embedUrl = (v: Video) =>
  `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&controls=0&rel=0`;

export const thumbnailUrl = (v: Video) =>
  `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
