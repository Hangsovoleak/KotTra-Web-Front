import { CategoryIconBadge } from '@/components/common/CategoryTag';
import { formatEventDate } from '@/utils/dateUtils';

export default function ActivityCard({ task, onView, onEdit, onDelete }) {
  const date = task.date ? new Date(task.date) : new Date();
  const displayDate = Number.isNaN(date.getTime()) ? task.date : formatEventDate(date);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={() => onView?.(task)}
          className="flex-1 text-left"
        >
          <div className="flex items-center gap-4">
            <h4 className="text-[15px] font-extrabold text-gray-800">{task.title}</h4>
            <div className="flex items-center gap-1.5">
              {(task.categories || []).map((cat) => (
                <CategoryIconBadge key={cat} category={cat} size={26} />
              ))}
            </div>
          </div>
          <div className="mt-3 text-sm font-semibold text-gray-500">
            <p>
              {task.from} - {task.to} {task.period}
            </p>
            <p>{displayDate}</p>
          </div>
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(task)}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(task.id)}
            className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
