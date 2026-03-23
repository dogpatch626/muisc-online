/**
 * GlowOrb Component
 * Floating glow orb for ambient effects
 */

import { useGlassTheme } from '../../../hooks';
import type { GlowOrbProps } from '../../../types/design-system';

export function GlowOrb({
  color = 'cyan',
  size = 200,
  position = { x: 50, y: 50 },
  animate = true,
  className = '',
}: GlowOrbProps) {
  const { reducedMotion } = useGlassTheme();

  const shouldAnimate = animate && !reducedMotion;

  const colorMap = {
    cyan: 'var(--color-cyber-cyan)',
    magenta: 'var(--color-neon-magenta)',
    purple: 'var(--color-electric-purple)',
    pink: 'var(--color-plasma-pink)',
    none: 'transparent',
  };

  const orbStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: `radial-gradient(circle at center, ${colorMap[color]}, transparent 70%)`,
    opacity: 0.3,
    filter: 'blur(40px)',
    pointerEvents: 'none',
    animation: shouldAnimate ? 'float 6s ease-in-out infinite' : 'none',
  };

  return <div className={`glow-orb ${className}`} style={orbStyle} />;
}
