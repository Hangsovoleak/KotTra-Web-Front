import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthName } from '@/utils/dateUtils';

export default function CalendarHeader({ month, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center gap-4 bg-cal-header px-6 py-4">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous month"
        className="rounded-full p-1 text-gray-600 hover:bg-white/50 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <h2 className="text-2xl font-extrabold text-gray-800">
        Calendar on {formatMonthName(month)}
      </h2>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next month"
        className="rounded-full p-1 text-gray-600 hover:bg-white/50 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
