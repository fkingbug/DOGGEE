import React from 'react';

import { Input, Passwordinput } from '@common/fields';
import { IntlText, useIntl } from '@features';
import { useForm } from '@utils/hooks';

import styles from './RegistrationPage.module.css';

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
}

export const RegistrationPage: React.FC = () => {
  const intl = useIntl();
  const { values, errors, setFieldValue, handleSubmit } = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: ''
    },
    // validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('values', values);
      // const response = await authMutation(values);
      // if (!!response && values.isNotMyDevice) {
      //   setCookies('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
      // }
      // console.log('response', response);
    }
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <h1 className={styles.form_title}>
            <IntlText path='page.registration.fillYourLoginData' />
          </h1>
          <form className={styles.form_container}>
            <div className={styles.input_container}>
              <Input
                // disabled={authLoading}
                value={values.username}
                label={intl.translateMessage('field.input.username.label')}
                type='text'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const username = event.target.value;
                  setFieldValue('username', username);
                }}
                {...(!!errors &&
                  !!errors.username && {
                    isError: !!errors.username,
                    helperText: errors.username
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <Passwordinput
                // disabled={authLoading}
                value={values.password}
                label={intl.translateMessage('field.input.password.label')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const password = event.target.value;
                  setFieldValue('password', password);
                }}
                {...(!!errors &&
                  !!errors.password && {
                    isError: !!errors.password,
                    helperText: errors.password
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <Passwordinput
                // disabled={authLoading}
                value={values.password}
                label={intl.translateMessage('field.input.password.label')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const password = event.target.value;
                  setFieldValue('password', password);
                }}
                {...(!!errors &&
                  !!errors.password && {
                    isError: !!errors.password,
                    helperText: errors.password
                  })}
              />
            </div>
          </form>
        </div>
        <div className={styles.panel_container}>123</div>
      </div>
    </div>
  );
};
