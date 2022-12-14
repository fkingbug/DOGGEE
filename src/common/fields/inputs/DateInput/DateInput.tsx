import React from 'react';

import type { InputProps } from '../input/Input';
import { Input } from '../input/Input';

import styles from './DateInput.module.css';

interface DateInputProps extends Omit<InputProps, 'value'> {
  value: Date;
}

export const DateInput: React.FC<DateInputProps> = ({ value, disabled, ...props }) => {
  const showPasswordToggle = !!value;

  const CalendarIcon = React.useCallback(
    () => (
      <div aria-hidden='true' role='button'>
        <div className={styles.calendar_icon} />
      </div>
    ),
    [disabled]
  );

  return (
    <Input
      {...(showPasswordToggle && {
        components: {
          indicator: CalendarIcon
        }
      })}
      disabled={disabled}
      {...props}
    />
  );
};
