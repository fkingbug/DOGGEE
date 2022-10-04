export const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
  const pastDayesOfYear = (date.getTime() - firstDayOfTheYear.getTime()) / 86400000;
  return Math.ceil((pastDayesOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};
// Находит неделю в году
