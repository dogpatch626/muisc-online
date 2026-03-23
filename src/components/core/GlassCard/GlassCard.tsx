/**
 * GlassCard Component
 * Video preview card with thumbnail and metadata
 */

import type { GlassCardProps } from '../../../types/design-system';

export function GlassCard({
  thumbnail,
  title,
  artist,
  duration,
  meta = [],
  featured = false,
  compact = false,
  onClick,
  className = '',
  children,
  ...props
}: GlassCardProps) {
  const classes = [
    'glass-card',
    compact && 'glass-card--compact',
    featured && 'glass-card--featured',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      {...props}
    >
      {thumbnail && (
        <div className="glass-card__thumbnail">
          <img src={thumbnail} alt={title} />
          {duration && (
            <span className="glass-card__duration">{duration}</span>
          )}
        </div>
      )}

      <div className="glass-card__content">
        <h3 className="glass-card__title">{title}</h3>
        {artist && <p className="glass-card__artist">{artist}</p>}
        {meta.length > 0 && (
          <div className="glass-card__meta">
            {meta.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
