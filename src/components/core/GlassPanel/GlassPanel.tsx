/**
 * GlassPanel Component
 * Foundational glassmorphic container
 */

import type { GlassPanelProps } from '../../../types/design-system';

export function GlassPanel({
  variant = 'default',
  glow = 'none',
  padding = 'md',
  interactive = false,
  as: Component = 'div',
  className = '',
  children,
  ...props
}: GlassPanelProps) {
  const classes = [
    'glass-panel',
    variant !== 'default' && `glass-panel--${variant}`,
    glow !== 'none' && `glass-panel--glow-${glow}`,
    padding && `glass-panel--p-${padding}`,
    interactive && 'glass-panel--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
