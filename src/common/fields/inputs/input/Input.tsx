import React from 'react';

import styles from '../input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
  isError?: boolean;
  helperText?: string;
  mask?: RegExp;
  components?: {
    indicator?: () => React.ReactElement;
  };
}

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  onChange,
  label,
  mask,
  components,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <div className={`${styles.field_container}  ${isError ? styles.input_error : ''}`}>
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
              if (!onChange || (mask && !mask.test(e.target.value))) return;
              onChange(e);
            }}
            {...props}
          />
          <label htmlFor={props.id} className={styles.input_label}>
            {label}
          </label>
        </div>
        {components?.indicator && <components.indicator />}
      </div>
      {isError && helperText && <div className={styles.helper_test}>{helperText}</div>}
    </>
  );
};
