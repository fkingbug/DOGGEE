import { getWeekNumber } from './getWeekNumber';

interface CreateDatePrarams {
  date: Date;
  locale?: string;
}
export const createDate = (params?: CreateDatePrarams) => {
  const locale = params?.locale ?? 'default';

  const d = params?.date ?? new Date();
  const dayNumber = d.getDate(); // число
  const day = d.toLocaleDateString(locale, { weekday: 'long' }); // День полное название
  const dayNumberInWeek = d.getDay() + 1; // Порядок дня в неделю
  const dayShort = d.toLocaleDateString(locale, { weekday: 'short' }); // День короткое название
  const year = d.getFullYear();
  const yearShort = d.toLocaleString(locale, { year: '2-digit' });
  const month = d.toLocaleString(locale, { month: 'long' });
  const monthShort = d.toLocaleString(locale, { month: 'short' });
  const monthNumber = d.getMonth() + 1;
  const monthIndex = d.getMonth();
  const timestamp = d.getTime();
  const week = getWeekNumber(d);

  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week
  };
};
