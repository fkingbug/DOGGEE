import React from 'react'

import type { IntlContextProps } from './IntlContext'
import { IntlContext } from './IntlContext'
type IntlProviderProps = IntlContextProps
// interface IntlProviderProps {
//   locale: string
//   messages: Record<string, any>
//   children: React.ReactNode
// }

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => {
  return <IntlContext.Provider value={{ locale, messages }}>{children}</IntlContext.Provider>
}
