import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ActionButtonsRow from '@/components/dashboard/ActionButtonsRow';
import CategoryMultiSelect from '@/components/dashboard/CategoryMultiSelect';
import MiniCalendar from '@/components/dashboard/MiniCalendar';
import { useNotifications } from '@/context/NotificationContext';
import { requiredField } from '@/utils/validation';

function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function normalizePayload(data) {
  return {
    title: data.title?.trim() || 'Untitled task',
    description: data.description?.trim() || '',
    categories: data.categories || [],
    from: data.from || '09:00',
    to: data.to || '10:00',
    period: data.period || 'AM',
    date: data.date || todayInputValue(),
  };
}

export default function TaskForm({
  onCreate,
  initialValues,
  onCancel,
  onDelete,
  submitLabel = 'Create task',
  successMessage = 'Task created',
}) {
  const { notify } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      categories: [],
      from: '',
      to: '',
      period: 'AM',
      date: todayInputValue(),
    },
  });

  const selectedDate = watch('date') || todayInputValue();

  useEffect(() => {
    reset({
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      categories: initialValues?.categories || [],
      from: initialValues?.from || '',
      to: initialValues?.to || '',
      period: initialValues?.period || 'AM',
      date: initialValues?.date || todayInputValue(),
    });
  }, [initialValues, reset]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = normalizePayload(data);
      await onCreate?.(payload);
      notify(successMessage, 'success');

      if (!initialValues?.id) {
        reset({
          title: '',
          description: '',
          categories: [],
          from: '',
          to: '',
          period: 'AM',
          date: todayInputValue(),
        });
      }
    } catch (error) {
      notify(error?.message || 'Unable to save task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ActionButtonsRow
          isEditing={Boolean(initialValues?.id)}
          isSubmitting={isSubmitting}
          onAdd={isSubmitting ? undefined : handleSubmit(onSubmit)}
          onUpdate={isSubmitting ? undefined : handleSubmit(onSubmit)}
          onDelete={isSubmitting ? undefined : () => onDelete?.(initialValues?.id)}
          onCancel={isSubmitting ? undefined : onCancel}
        />

        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-400">
              {initialValues?.id ? 'Update task' : 'Plan activity'}
            </p>
            <h3 className="text-xl font-bold text-gray-800">
              {initialValues?.id ? 'Edit a task' : 'Create a new task'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Title</label>
            <input
              {...register('title', { validate: requiredField })}
              type="text"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
              placeholder="Task title"
            />
            {errors.title ? <p className="mb-5 mt-1 text-xs font-semibold text-red-500">{errors.title.message}</p> : <div className="mb-5" />}

            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Options</label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <CategoryMultiSelect value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="mb-5 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
              placeholder="Add a description"
            />

            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Date</label>
            <input
              {...register('date')}
              type="date"
              className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
            />

            <label className="mb-1.5 block text-[15px] font-bold text-gray-800">Time</label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-semibold text-gray-600">From:</span>
                <input
                  {...register('from')}
                  type="time"
                  className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-semibold text-gray-600">To:</span>
                <input
                  {...register('to')}
                  type="time"
                  className="w-32 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-meeting/40"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-64">
            <MiniCalendar value={selectedDate} onChange={(value) => setValue('date', value, { shouldDirty: true })} />
          </div>
        </div>

      </form>
    </div>
  );
}
