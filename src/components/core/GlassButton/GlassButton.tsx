/**
 * GlassButton Component
 * Interactive button with glow effects
 */

import { useGlassTheme } from '../../../hooks';
import type { GlassButtonProps } from '../../../types/design-system';

export function GlassButton({
  variant = 'default',
  size = 'md',
  glowColor,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children,
  ...props
}: GlassButtonProps) {
  const { reducedMotion } = useGlassTheme();

  const classes = [
    'glass-button',
    variant !== 'default' && `glass-button--${variant}`,
    size !== 'md' && `glass-button--${size}`,
    loading && 'glass-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (!loading && !disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {!loading && children}
    </button>
  );
}
