import { createContext } from 'react';
import {
  ThemeContextObject,
  ThemeProviderProps,
} from './../types/contextTypes';

export const ThemeContext = createContext<ThemeContextObject | null>(null);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = {
    color: 'salmon',
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
