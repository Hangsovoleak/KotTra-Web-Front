import { daysInMonth, firstWeekdayOfMonth } from '@/utils/dateUtils';
import { CategoryIconBadge } from '@/components/common/CategoryTag';

// Grid week starts on Monday to match the Mon-Sun header bar.
function buildWeeks(year, month) {
  const total = daysInMonth(year, month);
  const firstDow = firstWeekdayOfMonth(year, month); // 0 = Sun
  const mondayOffset = (firstDow + 6) % 7; // convert to Mon-first offset

  const cells = [...Array(mondayOffset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function CalendarGrid({ year, month, tasks, activeFilters }) {
  const weeks = buildWeeks(year, month);

  function eventsForDay(day) {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(
      (t) => t.date === dateStr && t.categories.some((c) => activeFilters.includes(c))
    );
  }

  return (
    <div className="flex-1">
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 border-b border-gray-100 last:border-b-0">
          {week.map((day, di) => {
            const events = eventsForDay(day);
            return (
              <div
                key={di}
                className="min-h-[90px] border-r border-gray-100 px-3 py-2 last:border-r-0"
              >
                {day && <span className="text-sm font-bold text-meeting">{day}</span>}
                <div className="mt-1 flex flex-wrap gap-1">
                  {events.map((e) => (
                    <span key={e.id} className="flex items-center gap-1">
                      {e.categories
                        .filter((c) => activeFilters.includes(c))
                        .map((c) => (
                          <CategoryIconBadge key={c} category={c} size={18} />
                        ))}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
