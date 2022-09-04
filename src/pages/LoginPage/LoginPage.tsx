import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Input, Passwordinput, CheckBox } from '@common/fields'
import { Button } from '@common/buttons'

import styles from './LoginPage.module.css'
import { api, setCookies, useMutation, useQuery, useQueryLazy } from '@utils'

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
    isNotMyDevice: false,
  })
  // const { data } = useQuery<User[]>(() => api.get('users'))
  // const { query } = useQueryLazy<User[]>(() => api.get('users'))
  const { isLoading: authLoading, mutation: authMutation } = useMutation<typeof formValues, User>(
    values => api.post('auth', values)
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
            const response = await authMutation(formValues)
            if (!!response && formValues.isNotMyDevice) {
              setCookies('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000)
            }
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
              checked={formValues.isNotMyDevice}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked
                setFormValues({ ...formValues, isNotMyDevice })
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
