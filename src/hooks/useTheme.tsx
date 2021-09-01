import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components';

import light from '../utils/light';

const themes = [light];

type ThemeTitle = typeof themes[number];

interface ThemeContextData {
  theme: DefaultTheme;
  changeTheme(title: ThemeTitle): void;
}

const ThemeContext = createContext({} as ThemeContextData);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(light);

  const changeTheme = useCallback((title: ThemeTitle) => {
    setCurrentTheme(light);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextData => useContext(ThemeContext);

export { ThemeProvider, useTheme };
