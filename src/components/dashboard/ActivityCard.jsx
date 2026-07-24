import { CategoryIconBadge } from '@/components/common/CategoryTag';
import { formatEventDate } from '@/utils/dateUtils';

export default function ActivityCard({ task, onView }) {
  const date = task.date ? new Date(task.date) : new Date();
  const displayDate =
    Number.isNaN(date.getTime()) ? task.date : formatEventDate(date);

  return (
    <button
      type="button"
      onClick={() => onView?.(task)}
      className="w-full rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-6">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-5">
          <h3 className="truncate text-2xl font-extrabold text-gray-800">
            {task.title}
          </h3>

          <div className="flex items-center gap-2">
            {(task.categories || []).map((cat) => (
              <CategoryIconBadge
                key={cat}
                category={cat}
                size={34}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="shrink-0 text-right">
          <p className="text-xl font-bold text-gray-600">
            {task.from} - {task.to} {task.period}
          </p>

          <p className="text-lg font-semibold text-gray-500">
            {displayDate}
          </p>
        </div>
      </div>
    </button>
  );
}