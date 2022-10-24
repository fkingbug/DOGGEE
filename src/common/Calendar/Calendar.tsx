import React from 'react';

import {
  createMonth,
  createYear,
  getMonthNames,
  getMonthNumberOfDays,
  getWeekDaysnames
} from '@utils/helpers';

import styles from './Calendar.module.css';

const locale = 'en-US';

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedMonthNumber, setSelectedMonthNumber] = React.useState(selectedDate.getMonth());

  const monthNames = React.useMemo(() => getMonthNames(), []);
  const weekDaysNames = React.useMemo(() => getWeekDaysnames(2, locale), []);

  const month = React.useMemo(
    () => createMonth({ date: new Date(selectedDate.getFullYear(), selectedMonthNumber), locale }),
    [selectedMonthNumber]
  );

  const days = React.useMemo(() => month.createMonthDays(), [selectedMonthNumber]);

  const calendarDays = React.useMemo(() => {
    const monthNumbersOfDays = getMonthNumberOfDays(selectedMonthNumber - 1);

    const prevMonth = createMonth({
      date: new Date(selectedDate.getFullYear(), selectedMonthNumber - 1),
      locale
    });
    const nextMonth = createMonth({
      date: new Date(selectedDate.getFullYear(), selectedMonthNumber + 1),
      locale
    });

    const firstDay = days[0];
    const lastDay = days[monthNumbersOfDays - 1];
    console.log('@@@', prevMonth, nextMonth, firstDay, lastDay);
    // const numberOfPrevDays =
    // const numberOfNextDays =
  }, []);

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div
          aria-hidden='true'
          className={styles.calendar_header__arrow_left}
          onClick={() => setSelectedMonthNumber(selectedMonthNumber - 1)}
        />
        <div>{month.monthName}</div>
        <div
          aria-hidden='true'
          className={styles.calendar_header__arrow_right}
          onClick={() => setSelectedMonthNumber(selectedMonthNumber + 1)}
        />
      </div>
      <div className={styles.calendar_picker_container}>
        <div className={styles.calendar_week_days_container}>
          {weekDaysNames.map((weekDayName) => (
            <div>{weekDayName.dayShort}</div>
          ))}
        </div>
        <div className={styles.calendar_days_container}>
          {days.map((day) => (
            <div className={styles.calendar_day_container}>{day.dayNumber}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
