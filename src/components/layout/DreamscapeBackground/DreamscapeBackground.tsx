/**
 * DreamscapeBackground Component
 * Animated gradient background with optional particles
 */

import { useGlassTheme } from '../../../hooks';
import type { DreamscapeBackgroundProps } from '../../../types/design-system';

export function DreamscapeBackground({
  showParticles = false,
  animateGradient = true,
  className = '',
  children,
}: DreamscapeBackgroundProps) {
  const { reducedMotion } = useGlassTheme();

  // Disable animations if user prefers reduced motion
  const shouldAnimate = animateGradient && !reducedMotion;

  return (
    <div className={`dreamscape-background ${className}`}>
      {children}
    </div>
  );
}
