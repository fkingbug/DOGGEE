import React from 'react';

import { InputProps } from '../input/Input';

import styles from '../input.module.css';

export const Oldinput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = React.useState<boolean>(!!props.value ?? false);
  return (
    <>
      <div
        aria-hidden='true'
        role='button'
        className={`${styles.input_container}  ${isError ? styles.error : ''} ${
          isFocus ? styles.focused : ''
        }`}
        onClick={() => {
          inputRef.current?.focus();
          setIsFocus(true);
        }}
      >
        <label htmlFor={props.id} className={styles.input_label}>
          {label}
        </label>
        <input
          ref={inputRef}
          className={styles.input}
          onBlur={() => !props.value && setIsFocus(false)}
          {...props}
        />
      </div>
      {isError && helperText && <div className={styles.helper_test}>{helperText}</div>}
    </>
  );
};
