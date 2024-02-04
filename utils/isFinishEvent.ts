import dayjs from 'dayjs';

export const isFinishEvent = (startDate: Date): boolean => {
  return dayjs().isAfter(dayjs(startDate));
};
