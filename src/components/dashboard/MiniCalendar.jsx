import { useEffect, useState } from 'react';
import { daysInMonth, firstWeekdayOfMonth, formatMonthYear } from '@/utils/dateUtils';

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function toDateInputValue(date) {
  return date.toISOString().slice(0, 10);
}

function parseDateInput(value) {
  if (!value) return new Date();
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function MiniCalendar({ value, onChange }) {
  const [viewDate, setViewDate] = useState(() => (value ? parseDateInput(value) : new Date()));

  useEffect(() => {
    if (value) {
      setViewDate(parseDateInput(value));
    }
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const selectedDate = value ? parseDateInput(value) : null;

  const total = daysInMonth(year, month);
  const startOffset = firstWeekdayOfMonth(year, month);
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  const goToPreviousMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleSelectDay = (day) => {
    const nextDate = new Date(year, month, day);
    onChange?.(toDateInputValue(nextDate));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="rounded-full border border-gray-200 px-2 py-1 text-sm font-semibold text-gray-600"
        >
          ←
        </button>
        <h3 className="text-right text-lg font-bold text-gray-800">
          {formatMonthYear(year, month)}
        </h3>
        <button
          type="button"
          onClick={goToNextMonth}
          className="rounded-full border border-gray-200 px-2 py-1 text-sm font-semibold text-gray-600"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {DAY_LABELS.map((day) => (
          <span key={day} className="text-xs font-semibold text-meeting/70">
            {day}
          </span>
        ))}
        {cells.map((day, index) => {
          const isSelected =
            Boolean(day) &&
            Boolean(selectedDate) &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <button
              key={`${day ?? 'empty'}-${index}`}
              type="button"
              disabled={!day}
              onClick={() => day && handleSelectDay(day)}
              className={`h-8 w-8 rounded-full text-sm font-semibold ${
                day ? 'text-gray-700 hover:bg-gray-100' : 'cursor-default'
              } ${isSelected ? 'bg-learning-bold text-white' : ''}`}
            >
              {day || ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
