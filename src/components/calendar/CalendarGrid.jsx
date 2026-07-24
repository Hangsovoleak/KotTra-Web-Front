import { CATEGORIES, WEEKDAYS_SHORT } from '@/constants/categories';
import {
  buildMonthWeeks,
  buildWeekDays,
  formatTime12Hour,
  sortTasksChronologically,
} from '@/utils/calendarUtils';

export default function CalendarGrid({
  year,
  month,
  tasks,
  activeFilters,
  selectedDate,
  onSelectDate,
  viewMode = 'month',
  onPlanActivity,
}) {
  // Build weeks based on viewMode
  const weeks =
    viewMode === 'month'
      ? buildMonthWeeks(year, month)
      : buildWeekDays(selectedDate);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  function eventsForDay(dateStr) {
    if (!dateStr) return [];
    const filtered = tasks.filter(
      (t) => t.date === dateStr && t.categories.some((c) => activeFilters.includes(c))
    );
    return sortTasksChronologically(filtered);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      {/* Integrated Weekday Headers - Guarantees perfect alignment with columns */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-cal-daybar/80 py-2.5 shadow-sm">
        {WEEKDAYS_SHORT.map((day) => (
          <span
            key={day}
            className="text-center text-xs font-black uppercase tracking-wider text-gray-700/80"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Rows */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {weeks.map((week, wi) => (
          <div
            key={wi}
            className="grid grid-cols-7 border-b border-gray-100 last:border-b-0"
          >
            {week.map((dayObj, di) => {
              const { day, dateStr, isCurrentMonth } = dayObj;
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === todayStr;
              const events = eventsForDay(dateStr);

              // Grid cell classes
              const cellClass = `min-h-[115px] border-r border-gray-100 px-3 py-2.5 last:border-r-0 transition-all duration-200 select-none flex flex-col relative group cursor-pointer ${!isCurrentMonth ? 'text-gray-400 bg-gray-50/40 opacity-70' : 'bg-white hover:bg-gray-50/50'
                } ${isSelected ? 'bg-indigo-50/30 ring-2 ring-indigo-500/80 ring-inset z-10' : ''
                } ${isToday && !isSelected ? 'bg-emerald-50/20' : ''
                }`;

              return (
                <div
                  key={di}
                  onClick={() => onSelectDate?.(dateStr)}
                  className={cellClass}
                >
                  <div className="flex items-center justify-between">
                    {/* Day Number badge */}
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black transition-all ${isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : isToday
                            ? 'bg-learning text-white shadow-sm ring-2 ring-learning/20'
                            : 'text-gray-800'
                        }`}
                    >
                      {day}
                    </span>

                    {/* Task count */}
                    {events.length > 0 && (
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">
                        {events.length} {events.length === 1 ? 'task' : 'tasks'}
                      </span>
                    )}
                  </div>

                  {/* Events list inside cell */}
                  <div className="mt-2 flex-1 space-y-1 overflow-hidden">
                    {events.slice(0, 3).map((e) => {
                      const primaryCat = e.categories[0] || 'general';
                      const catConfig = CATEGORIES[primaryCat] || CATEGORIES.general;
                      return (
                        <div
                          key={e.id}
                          className={`truncate rounded px-1.5 py-0.5 text-[9px] font-bold border transition-all duration-150 ${e.completed
                              ? 'opacity-45 line-through decoration-gray-400'
                              : 'shadow-sm hover:translate-x-0.5'
                            }`}
                          style={{
                            backgroundColor: catConfig.light,
                            borderColor: catConfig.border,
                            color: catConfig.bold,
                          }}
                          title={`${e.title} (${formatTime12Hour(e.from)} - ${formatTime12Hour(e.to)})`}
                        >
                          <span className="opacity-60 mr-1 text-[8px] font-semibold">
                            {formatTime12Hour(e.from)}
                          </span>
                          {e.title}
                        </div>
                      );
                    })}

                    {/* More tasks indicator */}
                    {events.length > 3 && (
                      <div className="pl-1 text-[8px] font-extrabold text-indigo-500 uppercase tracking-wider">
                        + {events.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

