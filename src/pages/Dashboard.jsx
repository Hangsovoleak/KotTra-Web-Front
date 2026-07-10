import StatsRow from '@/components/dashboard/StatsRow';
import ActionButtonsRow from '@/components/dashboard/ActionButtonsRow';
import TaskForm from '@/components/dashboard/TaskForm';
import ActivityList from '@/components/dashboard/ActivityList';
import { useTasks } from '@/hooks/useTasks';
import { useNotifications } from '@/context/NotificationContext';

export default function Dashboard() {
  const { tasks, isLoading, addTask, refresh, removeTask } = useTasks();
  const { notify } = useNotifications();

  async function handleClearAll() {
    await Promise.all(tasks.map((t) => removeTask(t.id)));
    notify('All tasks cleared', 'info');
  }

  return (
    <div className="flex flex-col gap-6">
      <StatsRow />

      <ActionButtonsRow onAdd={() => {}} onRefresh={refresh} onClear={handleClearAll} />

      <TaskForm onCreate={addTask} />

      <ActivityList tasks={tasks} isLoading={isLoading} />
    </div>
  );
}
