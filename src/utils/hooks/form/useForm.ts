import React from 'react';

interface UseFormParams<Values> {
  initialValues: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Pick<Values, K>[K]) => string | null;
  };
  validateOnChange?: boolean;
  onSubmit?: (values: Values) => void;
}

export const useForm = <Values extends Object>({
  initialValues,
  validateSchema,
  validateOnChange = true,
  onSubmit
}: UseFormParams<Values>) => {
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<{ [K in keyof Values]?: string } | null>(null);

  const setFieldValue = <K extends keyof Values>(field: K, value: Pick<Values, K>[K]) => {
    setValues({ ...values, [field]: value });
    const validateSchemaForField = !!validateSchema && !!validateSchema[field];
    if (!validateSchemaForField || !validateOnChange) return;

    const error = validateSchema[field]!(value);
    setErrors({ ...errors, [field]: error });
  };
  const setFieldError = <K extends keyof Values>(field: K, error: Pick<Values, K>[K]) => {
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmiting(true);
    return onSubmit && onSubmit(values);
  };

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
    handleSubmit,
    setIsSubmiting,
    isSubmiting
  };
};
