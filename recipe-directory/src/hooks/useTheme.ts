import { useContext } from 'react';
import { ThemeContext } from '../context/index';
import { ThemeContextObject } from '../types/contextTypes';

export const useTheme = () => {
  const context = useContext(ThemeContext) as ThemeContextObject;

  if (context === undefined) {
    throw new Error('useTheme() must be used within a ThemeProvider');
  }
  return context;
};
