import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@common/buttons';
import { CheckBox, Input, Passwordinput } from '@common/fields';
import { IntlText, useTheme } from '@features';
import { api } from '@utils/api';
import { setCookies } from '@utils/helpers';
import { useForm, useMutation } from '@utils/hooks';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validatePassword = (value: string) => validateIsEmpty(value);

const validateUserName = (value: string) => validateIsEmpty(value);
const loginFormValidateSchema = {
  username: validateUserName,
  password: validatePassword
};
const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) =>
  loginFormValidateSchema[name](value);
interface FormErrors {
  username: string | null;
  password: string | null;
}
interface FormValues {
  username: string;
  password: string;
  isNotMyDevice: boolean;
}
interface User {
  username: string;
  password: string;
  id: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { values, setFieldValue } = useForm<FormValues>({
    initialValues: {
      username: '',
      password: '',
      isNotMyDevice: false
    }
  });
  const { theme, setTheme } = useTheme();
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    isNotMyDevice: false
  });

  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation<
    typeof formValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values));

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    username: null,
    password: null
  });

  return (
    <div className={styles.page}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>change theme</button>
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const response = await authMutation(formValues);
            if (!!response && formValues.isNotMyDevice) {
              setCookies('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
            }
          }}
        >
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              value={values.username}
              label='username'
              type='text'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFieldValue('username', username);
                // setFormValues({ ...formValues, username });
                const error = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username
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
                const password = event.target.value;
                setFormValues({ ...formValues, password });
                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password
              })}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              disabled={authLoading}
              label='This is not my device'
              checked={formValues.isNotMyDevice}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked;
                setFormValues({ ...formValues, isNotMyDevice });
              }}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type='submit'>
              <IntlText path='button.signIn' />
              {/* <IntlText path='button.signIn' values={{ test: 'azazazaza' }}>
                {(txt: any) => <h1>{txt}</h1>}
              </IntlText> */}
              {/* {intl.translateMessage('button.signIn', { test: 'bla bla bla bla' })} */}
            </Button>
          </div>
        </form>
        <div
          role='link'
          tabIndex={0}
          aria-hidden='true'
          className={styles.sing_up_container}
          onClick={() => navigate('/registration')}
        >
          <IntlText
            values={{ test: (text: string) => <b>{text}</b> }}
            path='page.login.createNewAccount'
          />
          {/* <IntlText path='page.login.createNewAccount' /> */}
        </div>
      </div>
    </div>
  );
};

/*  {...(!!formErrors.username && {isError: !!formErrors.username, helperText: formErrors.username,})} */
// тс не ругается так как приходит если есть ошибка (вроде так)
