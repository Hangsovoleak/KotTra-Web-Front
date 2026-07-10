import { useForm, Controller } from 'react-hook-form';
import { Plus } from 'lucide-react';
import CategoryMultiSelect from '@/components/dashboard/CategoryMultiSelect';
import MiniCalendar from '@/components/dashboard/MiniCalendar';
import { useNotifications } from '@/context/NotificationContext';

export default function TaskForm({ onCreate }) {
  const { notify } = useNotifications();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: { title: '', description: '', categories: [], from: '', to: '' },
  });

  const onSubmit = async (data) => {
    await onCreate?.(data);
    notify('Task created', 'success');
    reset();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr_auto]">
          {/* Left: title + options */}
          <div>
            <button
              type="submit"
              aria-label="Create task"
              className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-learning-bold text-learning-bold cursor-pointer"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>

            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Title</label>
            <input
              {...register('title')}
              type="text"
              className="mb-5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
              placeholder="Task title"
            />

            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Options</label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <CategoryMultiSelect value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Middle: description + time */}
          <div>
            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="mb-5 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
              placeholder="Add a description"
            />

            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Time</label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-semibold text-gray-600">From:</span>
                <input
                  {...register('from')}
                  type="text"
                  className="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
                />
                <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-500">
                  AM
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-semibold text-gray-600">To:</span>
                <input
                  {...register('to')}
                  type="text"
                  className="w-28 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
                />
                <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-500">
                  PM
                </span>
              </div>
            </div>
          </div>

          {/* Right: mini calendar */}
          <div className="w-full md:w-64">
            <MiniCalendar />
          </div>
        </div>
      </form>
    </div>
  );
}
