import React from 'react';

import { InputProps } from '../input';

import styles from '../input.module.css';

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  onChange,
  label,
  mask,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <div
        aria-hidden='true'
        aria-disabled={props.disabled}
        className={`${styles.input_container}  ${isError ? styles.input_error : ''}`}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          className={styles.input}
          onChange={(e) => {
            if (!!onChange && !e.target.value) return onChange(e);
            if (!onChange || (mask && mask.test(e.target.value))) return;
            onChange(e);
          }}
          {...props}
        />
        <label htmlFor={props.id} className={styles.input_label}>
          {label}
        </label>
      </div>
      {isError && helperText && <div className={styles.helper_test}>{helperText}</div>}
    </>
  );
};
