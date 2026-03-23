/**
 * Theme Context
 * Provides theme state and controls across the app
 */

import { createContext, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { GlowColor, ThemeContextValue } from '../types/design-system';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [accentColor, setAccentColor] = useState<GlowColor>('cyan');
  const reducedMotion = useReducedMotion();

  const value: ThemeContextValue = {
    accentColor,
    setAccentColor,
    reducedMotion,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
