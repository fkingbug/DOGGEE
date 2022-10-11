import React from 'react';

import { getMonthNames } from '@utils/helpers';

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const monthNames = React.useMemo(() => getMonthNames(), []);

  console.log('monthNames', monthNames);
  return <div>123</div>;
};
