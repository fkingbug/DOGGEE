import React from 'react'
import { ThemingContext, ThemingContextProps } from './ThemeContext'

// type IntlProviderProps = IntlContextProps
interface ThemingProviderProps extends ThemingContextProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemingProviderProps> = ({ theme, children }) => {
  return <ThemingContext.Provider value={{ theme }}>{children}</ThemingContext.Provider>
}
