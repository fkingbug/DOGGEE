import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, NotFoundPage, RegistrationPage } from '@pages'
import { deleteCookies, getCookies, getLocale, getMessage } from '@utils'
import { IntlProvider } from '@features'

import './static/css/themes/dark.css'
import './App.css'

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='*' element={<Navigate to='/auth' />} />
  </Routes>
)
const MainRoutes = () => (
  <Routes>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
)
const App = () => {
  const [isAuth, setIsAuth] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [messages, setMessages] = React.useState({})
  const locale = getLocale()

  React.useEffect(() => {
    const authCookie = getCookies('doggee-auth-token')
    const isNotMyDevice = getCookies('doggee-isNotMyDevice')

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime()
    if (authCookie && deviceExpire) {
      deleteCookies('doggee-auth-token')
      deleteCookies('doggee-isNotMyDevice')
    }
    if (authCookie && !deviceExpire) {
      setIsAuth(true)
    }
    getMessage(locale).then(messages => {
      setMessages(messages)
      // setMessages('en-US')

      setIsLoading(false)
    })

    setIsLoading(false)
  }, [])

  if (isLoading) return null

  return (
    <IntlProvider locale={'locale'} messages={messages}>
      <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
    </IntlProvider>
  )
}

export default App
