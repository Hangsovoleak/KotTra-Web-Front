import { MONTHS } from '@/constants/categories';

/** Returns number of days in a given month (0-indexed month, matching Date). */
export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/** Returns the weekday index (0 = Sunday) of the first day of the month. */
export function firstWeekdayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function formatMonthYear(year, month) {
  return `${MONTHS[month]} ${year}`;
}

export function formatMonthName(month) {
  return MONTHS[month];
}

/** Formats a date as "Mon 11/Feb/2026" style used on event cards. */
export function formatEventDate(date) {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${weekday} ${day}/${month}/${year}`;
}

export function formatTimeRange(from, to) {
  return `${from} \u2013 ${to}`;
}
