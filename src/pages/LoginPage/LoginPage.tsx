import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, Passwordinput, CheckBox } from '@common/fields'
import { Button } from '@common/buttons'

import styles from './LoginPage.module.css'
import { useMutation, useQuery, useQueryLazy } from '@utils'

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required'
  return null
}

const validatePassword = (value: string) => {
  return validateIsEmpty(value)
}

const validateUserName = (value: string) => {
  return validateIsEmpty(value)
}
const loginFormValidateSchema = {
  username: validateUserName,
  password: validatePassword,
}
const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) => {
  return loginFormValidateSchema[name](value)
}

interface FormErrors {
  username: string | null
  password: string | null
}

interface ApiSuccesResponse<T> {
  data: T
  succes: true
}

interface ApiFailureResponse {
  data: { message: string }
  succes: false
}
type ApiResponse<T> = ApiSuccesResponse<T> & ApiFailureResponse
interface User {
  username: string
  password: string
  id: string
}
export const LoginPage = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    notMyComputer: false,
  })
  const { data } = useQuery('http://localhost:3001/users', [formValues.username])
  const { query } = useQueryLazy<User>('http://localhost:3001/users')
  const { isLoading: authLoading, mutation: authMutation } = useMutation<typeof formValues, User>(
    'http://localhost:3001/auth',
    'post'
  )

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    username: null,
    password: null,
  })

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            // const response = await authMutation(formValues)
            const response = await query()
          }}
        >
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              isError={!!formErrors.username}
              // helperText={formErrors.username}
              value={formValues.username}
              label='username'
              type='text'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value
                setFormValues({ ...formValues, username })
                const error = validateLoginForm('username', username)
                setFormErrors({ ...formErrors, username: error })
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <Passwordinput
              disabled={authLoading}
              isError={!!formErrors.password}
              value={formValues.password}
              label='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value
                setFormValues({ ...formValues, password })
                const error = validateLoginForm('password', password)
                setFormErrors({ ...formErrors, password: error })
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              disabled={authLoading}
              label='This is not my device'
              checked={formValues.notMyComputer}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const notMyComputer = event.target.checked
                setFormValues({ ...formValues, notMyComputer })
              }}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type='submit'>
              Sign in
            </Button>
          </div>
        </form>
        <div className={styles.sing_up_container} onClick={() => navigate('/registration')}>
          Create new account
        </div>
      </div>
    </div>
  )
}

/*  {...(!!formErrors.username && {isError: !!formErrors.username, helperText: formErrors.username,})} */
//тс не ругается так как приходит если есть ошибка (вроде так)
