import { createDate } from './createDate';

export const getWeekDaysnames = (
  firstWeekDay: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1,
  locale: string = 'default'
) => {
  const weekDaysNames: {
    day: ReturnType<typeof createDate>['day'];
    dayShort: ReturnType<typeof createDate>['dayShort'];
  }[] = Array.from({ length: 7 });
  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    });
  });

  return null;
};
