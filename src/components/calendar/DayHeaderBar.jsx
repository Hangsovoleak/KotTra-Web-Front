import { WEEKDAYS_SHORT } from '@/constants/categories';

export default function DayHeaderBar() {
  return (
    <div className="grid grid-cols-[176px_repeat(7,1fr)] items-center gap-3 border-b border-gray-200 bg-cal-daybar px-4 py-3">
      <div />
      {WEEKDAYS_SHORT.map((day) => (
        <span
          key={day}
          className="mx-auto rounded-full bg-sidebar px-6 py-2 text-sm font-bold text-white"
        >
          {day}
        </span>
      ))}
    </div>
  );
}
