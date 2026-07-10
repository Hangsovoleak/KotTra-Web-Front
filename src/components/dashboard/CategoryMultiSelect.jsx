import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CATEGORY_LIST } from '@/constants/categories';
import CategoryTag from '@/components/common/CategoryTag';
import { useClickOutside } from '@/hooks/useClickOutside';

export default function CategoryMultiSelect({ value = [], onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  function toggle(key) {
    if (value.includes(key)) {
      onChange(value.filter((k) => k !== key));
    } else {
      onChange([...value, key]);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-left"
      >
        <span className="flex flex-wrap gap-2">
          {value.length === 0 && <span className="text-sm text-gray-400">Select options</span>}
          {value.map((key) => (
            <CategoryTag key={key} category={key} size="sm" />
          ))}
        </span>
        <ChevronDown size={16} className="shrink-0 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => toggle(cat.key)}
              className={`mb-1 flex w-full items-center rounded-md px-1 py-1 last:mb-0 transition-colors hover:bg-gray-50 ${
                value.includes(cat.key) ? 'ring-1 ring-gray-200' : ''
              }`}
            >
              <CategoryTag category={cat.key} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
