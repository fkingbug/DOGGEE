import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, NotFoundPage, RegistrationPage } from '@pages'
import { getCookie } from '@utils'

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
    const authCookie = getCookie('doggee-auth-token')

    if (authCookie) setIsAuth(true)

    setIsLoading(false)
  }, [])
  if (isLoading) return null

  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
}

export default App
