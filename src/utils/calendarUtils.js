/**
 * Builds a grid of 6 weeks representing a full calendar month,
 * including overlapping days from the previous and next months to ensure
 * a consistent layout and complete interactivity.
 */
export function buildMonthWeeks(year, month) {
  const firstDay = new Date(year, month, 1);
  const firstDow = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...
  const mondayOffset = (firstDow + 6) % 7; // Convert to Monday-first offset

  // Start date of the grid (Monday of the first row)
  const startDate = new Date(year, month, 1 - mondayOffset);

  const weeks = [];
  // Use a fixed 6-week layout to keep calendar grid height consistent
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const current = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + w * 7 + d
      );
      week.push({
        day: current.getDate(),
        month: current.getMonth(),
        year: current.getFullYear(),
        dateStr: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`,
        isCurrentMonth: current.getMonth() === month,
      });
    }
    weeks.push(week);
  }
  return weeks;
}

/**
 * Builds a single week containing the selected date.
 * Returns an array containing one week (array of 7 days) to match
 * the row rendering structure of the grid.
 */
export function buildWeekDays(selectedDateStr) {
  const date = new Date(selectedDateStr);
  if (isNaN(date.getTime())) {
    // Fallback to today if invalid
    const today = new Date();
    return buildWeekDays(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
  }

  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
  const offset = day === 0 ? 6 : day - 1; // Days to offset back to Monday
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset);

  const week = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    week.push({
      day: current.getDate(),
      month: current.getMonth(),
      year: current.getFullYear(),
      dateStr: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`,
      isCurrentMonth: true,
    });
  }
  return [week];
}

/**
 * Converts a 24-hour time string (e.g. "14:30") to 12-hour format with AM/PM (e.g. "2:30 PM").
 */
export function formatTime12Hour(time24h) {
  if (!time24h) return '';
  const parts = time24h.split(':');
  if (parts.length < 2) return time24h;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return time24h;

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = String(minutes).padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${period}`;
}

/**
 * Returns a beautiful range label for a given week (e.g. "Jul 20 – 26, 2026" or "Jul 27 – Aug 2, 2026").
 */
export function formatWeekRange(selectedDateStr) {
  const date = new Date(selectedDateStr);
  if (isNaN(date.getTime())) return '';

  const day = date.getDay();
  const offset = day === 0 ? 6 : day - 1;
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset);
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);

  const mMonth = monday.toLocaleDateString('en-US', { month: 'short' });
  const mDay = monday.getDate();
  const mYear = monday.getFullYear();

  const sMonth = sunday.toLocaleDateString('en-US', { month: 'short' });
  const sDay = sunday.getDate();
  const sYear = sunday.getFullYear();

  if (mYear !== sYear) {
    return `${mMonth} ${mDay}, ${mYear} – ${sMonth} ${sDay}, ${sYear}`;
  }
  if (mMonth !== sMonth) {
    return `${mMonth} ${mDay} – ${sMonth} ${sDay}, ${mYear}`;
  }
  return `${mMonth} ${mDay} – ${sDay}, ${mYear}`;
}

/**
 * Sorts an array of tasks chronologically by their start time (`from`).
 */
export function sortTasksChronologically(tasks) {
  return [...tasks].sort((a, b) => {
    const timeA = a.from || '00:00';
    const timeB = b.from || '00:00';
    return timeA.localeCompare(timeB);
  });
}
