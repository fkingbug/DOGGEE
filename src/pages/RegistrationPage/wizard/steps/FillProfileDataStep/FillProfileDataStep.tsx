import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useIntl } from '@features';

import { validateIsEmpty } from '../../../../LoginPage/LoginPage';
import { api, useForm, useMutation } from 'utils';

const registrationFormValidateSchema = {
  name: (value: string) => validateIsEmpty(value),
  registrationAddress: (value: string) => validateIsEmpty(value)
};

interface ProfileFormValues {
  name: string;
  registrationAddress: string;
  birthDate: Date;
}

interface FillProfileDataStepProps {
  nextStep: () => void;
}

const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({ nextStep }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { mutationAsync: registrationMutation, isLoading: registrationLoading } = useMutation<
    Omit<ProfileFormValues, 'passwordAgain'>,
    ApiResponse<User[]>
  >((values) => api.post('registration', values));

  const { values, errors, setFieldValue, handleSubmit } = useForm<ProfileFormValues>({
    initialValues: {
      name: '',
      registrationAddress: '',
      birthDate: new Date()
    },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false
    // onSubmit: async (values) => {
    //   const response = await registrationMutation({
    //     username: values.username,
    //     password: values.password
    //   });
    //   if(!response){
    //     return
    //   }
    //   nextStep()
    // }
  });

  return <div>FillProfileDataStep</div>;
};

export default FillProfileDataStep;
