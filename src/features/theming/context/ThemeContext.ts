import React from 'react'

type Theme = 'light' | 'dark'

export interface ThemingContextProps {
  theme: Theme
}

export const ThemingContext = React.createContext<ThemingContextProps>({ theme: 'light' })
