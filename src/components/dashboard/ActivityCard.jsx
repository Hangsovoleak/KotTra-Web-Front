import { CategoryIconBadge } from '@/components/common/CategoryTag';
import { formatEventDate } from '@/utils/dateUtils';

export default function ActivityCard({ task }) {
  const date = new Date(task.date);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <h4 className="text-[15px] font-extrabold text-gray-800">{task.title}</h4>
        <div className="flex items-center gap-1.5">
          {task.categories.map((cat) => (
            <CategoryIconBadge key={cat} category={cat} size={26} />
          ))}
        </div>
      </div>
      <div className="text-right text-sm font-semibold text-gray-500">
        <p>
          {task.from} - {task.to} {task.period}
        </p>
        <p>{formatEventDate(date)}</p>
      </div>
    </div>
  );
}
