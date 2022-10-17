export const checkIsToDay = (date: Date) => {
  const today = new Date();

  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getDate() &&
    today.getFullYear() === date.getFullYear()
  );
};
