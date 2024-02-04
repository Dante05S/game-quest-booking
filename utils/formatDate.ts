import dayjs from 'dayjs';

export const getDate = (
  date: Date | dayjs.Dayjs | string | undefined
): string => {
  if (date === undefined) return '';
  return dayjs(date).format('DD/MM/YYYY');
};
