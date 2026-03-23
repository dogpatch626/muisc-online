/**
 * useGlassTheme Hook
 * Accesses the theme context
 */

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import type { ThemeContextValue } from '../types/design-system';

export function useGlassTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useGlassTheme must be used within a ThemeProvider');
  }

  return context;
}
