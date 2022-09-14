import React from 'react';

import type { IntlContextProps } from './IntlContext';
import { IntlContext } from './IntlContext';

// type IntlProviderProps = IntlContextProps
interface IntlProviderProps extends IntlContextProps {
  children: React.ReactNode;
}

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => {
  const value = React.useMemo(() => ({ locale, messages }), []);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};
// export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => (
//   // eslint-disable-next-line react/jsx-no-constructed-context-values
//   <IntlContext.Provider value={{ locale, messages }}>{children}</IntlContext.Provider>
// );
