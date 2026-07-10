import { useState } from 'react';
import { daysInMonth, firstWeekdayOfMonth, formatMonthYear } from '@/utils/dateUtils';

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function MiniCalendar({ initialYear = 2026, initialMonth = 1 }) {
  const [year] = useState(initialYear);
  const [month] = useState(initialMonth);

  const total = daysInMonth(year, month);
  const startOffset = firstWeekdayOfMonth(year, month);
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  return (
    <div>
      <h3 className="mb-4 text-right text-lg font-bold text-gray-800">
        {formatMonthYear(year, month)}
      </h3>
      <div className="grid grid-cols-7 gap-y-3 text-center">
        {DAY_LABELS.map((d) => (
          <span key={d} className="text-xs font-semibold text-meeting/70">
            {d}
          </span>
        ))}
        {cells.map((day, i) => (
          <span
            key={i}
            className={`text-sm font-semibold ${day ? 'text-gray-700' : ''}`}
          >
            {day || ''}
          </span>
        ))}
      </div>
    </div>
  );
}
