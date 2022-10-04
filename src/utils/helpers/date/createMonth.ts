interface CreateMonthParams {
  date?: Date;
  locale?: string;
}
export const createMonth = (params?: CreateMonthParams) => {
  const date = params?.date;
  const locale = params?.locale ?? 'default';

  const d = createDate({ date: date ?? new Date(), locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  const getDay = (dayNumber: number) => createDeflate({});
};
