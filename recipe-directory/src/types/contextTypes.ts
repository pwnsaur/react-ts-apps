export type ThemeContextObject = {
  mode: string;
  color: string;
  changeColor: (color: string) => void;
  changeMode: (color: string) => void;
};

export type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[];
};
