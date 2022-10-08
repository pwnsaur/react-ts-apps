import { createContext, useReducer } from 'react';
import {
  ThemeContextObject,
  ThemeProviderProps,
} from './../types/contextTypes';

export const ThemeContext = createContext<ThemeContextObject | null>(null);

type ACTIONTYPE = {
  type: 'CHANGE_COLOR' | 'CHANGE_MODE';
  payload: string;
};
type State = { color: string; mode: string };
type Action = ACTIONTYPE;

const themeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload };
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(themeReducer, {
    color: '#58249c',
    mode: 'dark',
  });

  const changeColor = (color: string) => {
    dispatch({ type: 'CHANGE_COLOR', payload: color });
  };

  const changeMode = (mode: string) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
