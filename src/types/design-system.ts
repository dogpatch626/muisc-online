/**
 * Design System TypeScript Types
 * Type definitions for component props and design tokens
 */

// Glass component variants
export type GlassVariant = 'default' | 'elevated' | 'bordered' | 'heavy-blur' | 'subtle-blur';

// Glow colors
export type GlowColor = 'cyan' | 'magenta' | 'purple' | 'pink' | 'none';

// Size variants
export type Size = 'sm' | 'md' | 'lg' | 'xl';

// Button variants
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'ghost';

// Animation presets
export type AnimationPreset =
  | 'glow-pulse'
  | 'float'
  | 'fade-slide-in'
  | 'scale-pop'
  | 'shimmer'
  | 'none';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Glass panel props
export interface GlassPanelProps extends BaseComponentProps {
  variant?: GlassVariant;
  glow?: GlowColor;
  padding?: Size;
  interactive?: boolean;
  as?: React.ElementType;
}

// Glass button props
export interface GlassButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: Size;
  glowColor?: GlowColor;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Glass card props
export interface GlassCardProps extends BaseComponentProps {
  thumbnail?: string;
  title: string;
  artist?: string;
  duration?: string;
  meta?: string[];
  featured?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

// Glass input props
export interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  icon?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  onClear?: () => void;
}

// Glass modal props
export interface GlassModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size | 'full';
  variant?: 'default' | 'video';
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

// XMB Navigation props
export interface XMBNavProps extends BaseComponentProps {
  categories: XMBCategory[];
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

export interface XMBCategory {
  id: string;
  label: string;
  icon?: React.ReactNode;
  items: XMBItem[];
}

export interface XMBItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

// Video types
export interface Video {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
  duration: string;
  views?: number;
  publishedAt?: string;
  description?: string;
  tags?: string[];
}

// Video card props
export interface VideoCardProps extends BaseComponentProps {
  video: Video;
  featured?: boolean;
  compact?: boolean;
  onClick?: (video: Video) => void;
}

// Video player props
export interface VideoPlayerProps extends BaseComponentProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

// Effect components
export interface GlowOrbProps extends BaseComponentProps {
  color: GlowColor;
  size?: number;
  position?: { x: number; y: number };
  animate?: boolean;
}

export interface ParticleFieldProps extends BaseComponentProps {
  density?: number;
  colors?: string[];
  speed?: number;
}

// Theme context
export interface ThemeContextValue {
  accentColor: GlowColor;
  setAccentColor: (color: GlowColor) => void;
  reducedMotion: boolean;
}

// Page shell props
export interface PageShellProps extends BaseComponentProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentWidth?: 'narrow' | 'default' | 'wide' | 'full';
}

// Dreamscape background props
export interface DreamscapeBackgroundProps extends BaseComponentProps {
  showParticles?: boolean;
  animateGradient?: boolean;
}
