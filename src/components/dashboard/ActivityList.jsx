import ActivityCard from '@/components/dashboard/ActivityCard';
import EmptyState from '@/components/common/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ActivityList({ tasks, isLoading, onView, onEdit, onDelete }) {
  if (isLoading) return <LoadingSpinner />;
  if (!tasks.length) return <EmptyState message="No activities yet. Add your first task above." />;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <ActivityCard key={task.id} task={task} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
