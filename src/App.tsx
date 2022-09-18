import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { IntlProvider, ThemeProvider } from '@features';
import { LoginPage, NotFoundPage, RegistrationPage } from '@pages';
import { deleteCookies, getCookies, getLocale, getMessage } from '@utils/helpers';

import './App.css';

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='*' element={<Navigate to='/auth' />} />
  </Routes>
);
const MainRoutes = () => (
  <Routes>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

type Theme = 'light' | 'dark';

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = React.useState({});
  // const locale = getLocale();
  const locale = 'en-US';

  React.useEffect(() => {
    const authCookie = getCookies('doggee-auth-token');
    const isNotMyDevice = getCookies('doggee-isNotMyDevice');

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime();
    if (authCookie && deviceExpire) {
      deleteCookies('doggee-auth-token');
      deleteCookies('doggee-isNotMyDevice');
    }
    if (authCookie && !deviceExpire) {
      setIsAuth(true);
    }
    getMessage(locale).then((msg) => {
      setMessages(msg);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return null;

  const theme = (getCookies('doggee-theme') as Theme) ?? 'light';
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
