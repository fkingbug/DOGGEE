import React from 'react';

import { createMonth, createYear, getMonthNames } from '@utils/helpers';

import styles from './Calendar.module.css';

const locale = 'en-US';

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const monthNames = React.useMemo(() => getMonthNames(), []);
  const year = React.useMemo(
    () =>
      createYear({
        monthNumber: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear()
      }),
    []
  );
  const moth = React.useMemo(() => createMonth({ date: selectedDate, locale }), [year]);
  const monthes = React.useMemo(() => year.createYearMonthes(), []);

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>{moth.monthName}</div>
    </div>
  );
};
