import { createDate } from './createDate';

export const getMonthNames = (locale: string = 'default') => {
  const monthNames: ReturnType<typeof createDate>['month'][] = Array.from({ length: 12 });
  const date = new Date();

  monthNames.forEach((_, i) => {
    const { month, monthIndex } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth() + i, date.getDate())
    });
    monthNames[monthIndex] = month;
  });
  return monthNames;
};

// monthNames : ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
