import { useState } from 'react';
import StatsRow from '@/components/dashboard/StatsRow';
import ActionButtonsRow from '@/components/dashboard/ActionButtonsRow';
import TaskForm from '@/components/dashboard/TaskForm';
import ActivityList from '@/components/dashboard/ActivityList';
import { useTasks } from '@/hooks/useTasks';
import { useNotifications } from '@/context/NotificationContext';

export default function Dashboard() {
  const { tasks, isLoading, addTask, updateTask, refresh, removeTask } = useTasks();
  const { notify } = useNotifications();
  const [editingTask, setEditingTask] = useState(null);

  async function handleClearAll() {
    await Promise.all(tasks.map((task) => removeTask(task.id)));
    setEditingTask(null);
    notify('All tasks cleared', 'info');
  }

  async function handleCreate(task) {
    await addTask(task);
    setEditingTask(null);
  }

  async function handleUpdate(task) {
    if (!editingTask?.id) return;
    await updateTask(editingTask.id, task);
    setEditingTask(null);
  }

  async function handleDelete(id) {
    await removeTask(id);
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
    notify('Task deleted', 'success');
  }

  return (
    <div className="flex flex-col gap-6">
      <StatsRow />

      <ActionButtonsRow onAdd={() => setEditingTask(null)} onRefresh={refresh} onClear={handleClearAll} />

      <TaskForm
        key={editingTask?.id || 'new-task'}
        initialValues={editingTask}
        onCreate={editingTask?.id ? handleUpdate : handleCreate}
        onCancel={() => setEditingTask(null)}
        submitLabel={editingTask?.id ? 'Save task' : 'Create task'}
        successMessage={editingTask?.id ? 'Task updated' : 'Task created'}
      />

      <ActivityList
        tasks={tasks}
        isLoading={isLoading}
        onView={setEditingTask}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  );
}
