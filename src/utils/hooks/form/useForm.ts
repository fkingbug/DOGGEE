import React from 'react';

interface UseFormParams<Values> {
  initialValues: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Pick<Values, K>[K]) => string | null;
  };
}

export const useForm = <Values extends Object>({
  initialValues,
  validateSchema
}: UseFormParams<Values>) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<{ [K in keyof Values]?: string } | null>(null);

  const setFieldValue = <K extends keyof Values>(
    field: keyof Values,
    value: Pick<Values, K>[K]
  ) => {
    setValues({ ...values, [field]: value });
    const error = validateLoginForm('username', username);
    setFormErrors({ ...formErrors, username: error });
  };

  return { values, errors, setFieldValue };
};
