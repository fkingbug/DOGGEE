import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, NotFoundPage, RegistrationPage } from '@pages'
import { deleteCookies, getCookies } from '@utils'

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

    setIsLoading(false)
  }, [])
  if (isLoading) return null

  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
}

export default App
