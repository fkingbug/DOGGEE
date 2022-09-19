import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@common/buttons';
import { Input, Passwordinput } from '@common/fields';
import { IntlText, useIntl } from '@features';
import { ROUTES } from '@utils/constants';
import { useForm } from '@utils/hooks';

import { PasswordRules } from './PasswordRules/PasswordRules';

import styles from './RegistrationPage.module.css';

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
}

export const RegistrationPage: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { values, errors, setFieldValue, handleSubmit } = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: ''
    },
    // validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
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
                value={values.passwordAgain}
                label={intl.translateMessage('field.input.passwordAgain.label')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const passwordAgain = event.target.value;
                  setFieldValue('passwordAgain', passwordAgain);
                }}
                {...(!!errors &&
                  !!errors.passwordAgain && {
                    isError: !!errors.passwordAgain,
                    helperText: errors.passwordAgain
                  })}
              />
            </div>
            <Button type='submit'>
              <IntlText path='button.done' />
            </Button>
          </form>
        </div>
        <div className={styles.panel_container}>
          <div className={styles.panel_header}>DOGGEE</div>
          <div className={styles.panel_data}>
            <PasswordRules
              password={values.password}
              passwordAgain={values.passwordAgain}
              hasPasswordErrors={!!errors?.password}
            />
          </div>
          <div>
            <div
              role='link'
              tabIndex={0}
              aria-hidden='true'
              className={styles.panel_have_account}
              onClick={() => navigate(ROUTES.AUTH)}
            >
              <IntlText
                values={{ test: (text: string) => <b>{text}</b> }}
                path='page.registration.iAlreadyHaveAnAccount'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
