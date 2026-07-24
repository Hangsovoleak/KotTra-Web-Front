import { useState } from 'react';
import StatsRow from '@/components/dashboard/StatsRow';
import TaskForm from '@/components/dashboard/TaskForm';
import ActivityList from '@/components/dashboard/ActivityList';
import { useTasks } from '@/hooks/useTasks';
import { useNotifications } from '@/context/NotificationContext';

export default function Dashboard() {
  const { tasks, isLoading, addTask, updateTask, removeTask } = useTasks();
  const { notify } = useNotifications();
  const [editingTask, setEditingTask] = useState(null);

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

  async function handleToggleComplete(task) {
    try {
      const nextCompletedState = !task.completed;
      await updateTask(task.id, { completed: nextCompletedState });
      notify(
        nextCompletedState ? 'Task marked as completed' : 'Task marked as incomplete',
        'success'
      );
    } catch (error) {
      notify(error?.message || 'Failed to update task status', 'error');
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <StatsRow />

      <TaskForm
        key={editingTask?.id || 'new-task'}
        initialValues={editingTask}
        onCreate={editingTask?.id ? handleUpdate : handleCreate}
        onCancel={() => setEditingTask(null)}
        onDelete={handleDelete}
        submitLabel={editingTask?.id ? 'Save task' : 'Create task'}
        successMessage={editingTask?.id ? 'Task updated' : 'Task created'}
      />

      <ActivityList
        tasks={tasks}
        isLoading={isLoading}
        onView={setEditingTask}
        onEdit={setEditingTask}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

