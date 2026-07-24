import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatMonthName } from '@/utils/dateUtils';
import { formatWeekRange } from '@/utils/calendarUtils';

export default function CalendarHeader({
  month,
  year,
  viewMode,
  selectedDate,
  onPrev,
  onNext,
  onToday,
  onToggleViewMode,
}) {
  const displayTitle =
    viewMode === 'month'
      ? `${formatMonthName(month)} ${year}`
      : formatWeekRange(selectedDate);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-cal-header px-6 py-4">
      {/* Left: Navigation Controls */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onToday}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300/50 bg-white/70 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-white transition-all shadow-sm cursor-pointer hover:border-gray-400"
        >
          <Calendar size={13} className="text-gray-500" />
          Today
        </button>
        <div className="flex items-center rounded-lg border border-gray-300/50 bg-white/70 p-0.5 shadow-sm">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous"
            className="rounded-md p-1.5 text-gray-600 hover:bg-white hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <div className="h-4 w-[1px] bg-gray-300/50" />
          <button
            type="button"
            onClick={onNext}
            aria-label="Next"
            className="rounded-md p-1.5 text-gray-600 hover:bg-white hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Center: Title */}
      <h2 className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
        <span className="opacity-45">Calendar on</span>
        <span className="bg-white/40 px-2.5 py-0.5 rounded-lg">{displayTitle}</span>
      </h2>

      {/* Right: View Selector */}
      <div className="flex items-center rounded-lg border border-gray-300/50 bg-white/70 p-0.5 shadow-sm">
        <button
          type="button"
          onClick={() => onToggleViewMode('month')}
          className={`rounded-md px-3.5 py-1.5 text-xs font-extrabold transition-all cursor-pointer ${
            viewMode === 'month'
              ? 'bg-sidebar text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/40'
          }`}
        >
          Month
        </button>
        <button
          type="button"
          onClick={() => onToggleViewMode('week')}
          className={`rounded-md px-3.5 py-1.5 text-xs font-extrabold transition-all cursor-pointer ${
            viewMode === 'week'
              ? 'bg-sidebar text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/40'
          }`}
        >
          Week
        </button>
      </div>
    </div>
  );
}
