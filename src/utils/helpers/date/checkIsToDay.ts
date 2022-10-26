import { checkDateIsEqual } from './checkDateIsEqual';

export const checkIsToDay = (date: Date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};
