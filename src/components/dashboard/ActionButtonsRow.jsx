import { Plus, RotateCcw, X } from 'lucide-react';
import IconCircleButton from '@/components/common/IconCircleButton';

export default function ActionButtonsRow({ onAdd, onRefresh, onClear }) {
  return (
    <div className="flex justify-end gap-3">
      <IconCircleButton
        icon={Plus}
        color="var(--color-learning-bold)"
        bg="var(--color-learning-light)"
        onClick={onAdd}
        label="Add"
      />
      <IconCircleButton
        icon={RotateCcw}
        color="var(--color-general-bold)"
        bg="var(--color-general-light)"
        onClick={onRefresh}
        label="Reset"
      />
      <IconCircleButton
        icon={X}
        color="var(--color-event-bold)"
        bg="var(--color-event-light)"
        onClick={onClear}
        label="Clear"
      />
    </div>
  );
}
