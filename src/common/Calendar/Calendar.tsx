import React from 'react';

import {
  checkDateIsEqual,
  checkIsToDay,
  createDate,
  createMonth,
  createYear,
  getMonthNames,
  getMonthNumberOfDays,
  getWeekDaysnames
} from '@utils/helpers';

import styles from './Calendar.module.css';

const locale = 'en-US';

export const Calendar = () => {
  const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days');
  const [selectedDate, setSelectedDate] = React.useState(createDate());
  const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(selectedDate.monthIndex);
  const [selectedyear, setSelectedYear] = React.useState(selectedDate.year);

  const monthNames = React.useMemo(() => getMonthNames(locale), []);
  const weekDaysNames = React.useMemo(() => getWeekDaysnames(1, locale), []);

  const month = React.useMemo(
    () => createMonth({ date: new Date(selectedDate.year, selectedMonthIndex), locale }),
    [selectedMonthIndex]
  );

  const days = React.useMemo(() => month.createMonthDays(), [selectedMonthIndex]);

  const calendarDays = React.useMemo(() => {
    const monthNumbersOfDays = getMonthNumberOfDays(selectedMonthIndex);

    const prevMonthDays = createMonth({
      date: new Date(selectedDate.year, selectedMonthIndex - 1),
      locale
    }).createMonthDays();
    const nextMonthDays = createMonth({
      date: new Date(selectedDate.year, selectedMonthIndex + 1),
      locale
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumbersOfDays - 1];

    const numberOfPrevDays = firstDay.dayNumberInWeek - 1;
    const numberOfNextDays = 7 - lastDay.dayNumberInWeek;

    const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }
    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result[i] = days[i - numberOfPrevDays];
    }
    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }
    return result;
  }, [selectedMonthIndex]);

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div
          aria-hidden='true'
          className={styles.calendar_header__arrow_left}
          onClick={() => setSelectedMonthIndex(selectedMonthIndex - 1)}
        />
        {mode === 'days' && (
          <div aria-hidden onClick={() => setMode('monthes')}>
            {month.monthName}
          </div>
        )}
        {mode === 'monthes' && (
          <div aria-hidden onClick={() => setMode('years')}>
            {selectedyear}
          </div>
        )}
        <div
          aria-hidden='true'
          className={styles.calendar_header__arrow_right}
          onClick={() => setSelectedMonthIndex(selectedMonthIndex + 1)}
        />
      </div>
      <div className={styles.calendar_picker_container}>
        {mode === 'days' && (
          <>
            <div className={styles.calendar_week_days_container}>
              {weekDaysNames.map((weekDayName) => (
                <div>{weekDayName.dayShort}</div>
              ))}
            </div>
            <div className={styles.calendar_days_container}>
              {calendarDays.map((day) => (
                <div
                  aria-hidden
                  onClick={() => setSelectedDate(day)}
                  className={`${styles.calendar_day_container}
              ${
                checkDateIsEqual(day.date, selectedDate.date)
                  ? styles.calendar_selected_day_container
                  : ''
              }
              ${checkIsToDay(day.date) ? styles.calendar_today_day_container : ''}
              ${
                day.monthIndex !== selectedMonthIndex
                  ? styles.calendar_additional_day_container
                  : ''
              }`}
                >
                  {day.dayNumber}
                </div>
              ))}
            </div>
          </>
        )}
        {mode === 'monthes' && (
          <div className={styles.calendar_monthes_container}>
            {monthNames.map((monthName) => (
              <div
                aria-hidden
                onClick={() => {
                  setSelectedMonthIndex(monthName.monthIndex);
                  setMode('days');
                }}
                className={styles.calendar_month_container}
              >
                {monthName.monthShort}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
