import React from 'react';

import { setCookies } from '@utils/helpers';

import type { Theme, ThemeContextProps } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

import darkTheme from '../../../static/theme/dark/dark.module.css';
import lightTheme from '../../../static/theme/light/light.module.css';

// type IntlProviderProps = IntlContextProps
interface ThemingProviderProps extends Omit<ThemeContextProps, 'setTheme'> {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemingProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  const setTheme = (theme: Theme) => {
    setCookies('doggee-theme', theme);
    setCurrentTheme(theme);
  };
  // const value = React.useMemo(() => (), []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <div className={currentTheme === 'dark' ? darkTheme.container : lightTheme.container}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
