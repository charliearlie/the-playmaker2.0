import dayjs from 'dayjs';

export function formatDateToUsersPreference(date: Date, format?: string) {
  // Of course this will read a date format from a config
  return dayjs(date).format('ddd DD MMM, YYYY');
}

export function getYear(date: Date) {
  return dayjs(date).year();
}
