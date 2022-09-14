import React from 'react';

interface UseFormParams<T> {
  initialValues: T;
}

export const useForm = <T>({ initialValues }: UseFormParams<T>) => {
  const [values, setValues] = React.useState(initialValues);
  console.log('custom hook', values);
  const setFieldValue = (field: keyof T, value: T[keyof T]) => {
    setValues({ ...values, [field]: value });
  };

  return { values, setFieldValue };
};
