import { Plus, RotateCcw, Trash2, X } from 'lucide-react';
import IconCircleButton from '@/components/common/IconCircleButton';

export default function ActionButtonsRow({
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
  isEditing = false,
  isSubmitting = false,
}) {
  return (
    <div className="mb-4 flex items-center justify-end gap-2">
      {isEditing ? (
        <>
          <IconCircleButton
            icon={X}
            color="var(--color-event-bold)"
            bg="var(--color-event-light)"
            onClick={onCancel}
            label="Cancel"
            disabled={isSubmitting}
          />
          <IconCircleButton
            icon={RotateCcw}
            color="var(--color-general-bold)"
            bg="var(--color-general-light)"
            onClick={onUpdate}
            label="Update"
            disabled={isSubmitting}
          />
          <IconCircleButton
            icon={Trash2}
            color="var(--color-event-bold)"
            bg="var(--color-event-light)"
            onClick={onDelete}
            label="Delete"
            disabled={isSubmitting}
          />
        </>
      ) : (
        <IconCircleButton
          icon={Plus}
          color="var(--color-learning-bold)"
          bg="var(--color-learning-light)"
          onClick={onAdd}
          label="Add"
          disabled={isSubmitting}
        />
      )}
    </div>
  );
}
