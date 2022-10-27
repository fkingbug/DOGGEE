import { createDate } from './createDate';

export const getMonthNames = (locale: string = 'default') => {
  const monthNames: {
    month: ReturnType<typeof createDate>['month'];
    monthShort: ReturnType<typeof createDate>['monthShort'];
    monthIndex: ReturnType<typeof createDate>['monthIndex'];
  }[] = Array.from({ length: 12 });
  const date = new Date();

  monthNames.forEach((_, i) => {
    const { month, monthIndex, monthShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth() + i, date.getDate())
    });
    monthNames[monthIndex] = { month, monthShort, monthIndex };
  });
  return monthNames;
};

// monthNames : ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
