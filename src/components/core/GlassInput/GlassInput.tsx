/**
 * GlassInput Component
 * Form input matching the glass aesthetic
 */

import type { GlassInputProps } from '../../../types/design-system';

export function GlassInput({
  size = 'md',
  icon,
  error = false,
  success = false,
  onClear,
  className = '',
  value,
  ...props
}: GlassInputProps) {
  const classes = [
    'glass-input',
    size !== 'md' && `glass-input--${size}`,
    error && 'glass-input--error',
    success && 'glass-input--success',
    onClear && 'glass-input--search',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showClearButton = onClear && value;

  return (
    <div className={classes}>
      {icon && <span className="glass-input__icon">{icon}</span>}

      <input
        className="glass-input__field"
        value={value}
        {...props}
      />

      {showClearButton && (
        <button
          type="button"
          className="glass-input__clear"
          onClick={onClear}
          aria-label="Clear input"
        >
          ✕
        </button>
      )}
    </div>
  );
}
