/**
 * ParticleField Component
 * Floating particle effect background
 */

import { useGlassTheme } from '../../../hooks';
import type { ParticleFieldProps } from '../../../types/design-system';

export function ParticleField({
  density = 20,
  colors = ['var(--color-cyber-cyan)', 'var(--color-neon-magenta)'],
  speed = 1,
  className = '',
}: ParticleFieldProps) {
  const { reducedMotion } = useGlassTheme();

  if (reducedMotion) {
    return null;
  }

  // Generate particles
  const particles = Array.from({ length: density }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: (Math.random() * 20 + 10) / speed,
    delay: Math.random() * -20,
  }));

  return (
    <div
      className={`particle-field ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            backgroundColor: particle.color,
            opacity: 0.4,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
