import { CATEGORY_LIST } from '@/constants/categories';

export default function FilterSidebar({ activeFilters, onToggle }) {
  return (
    <div className="h-full w-44 shrink-0 bg-cal-sidebar px-5 py-6">
      <p className="mb-4 text-[15px] font-bold text-gray-700">view for:</p>
      <div className="flex flex-col gap-3">
        {CATEGORY_LIST.map((cat) => {
          const Icon = cat.icon;
          const active = activeFilters.includes(cat.key);
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onToggle(cat.key)}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-opacity"
              style={{
                backgroundColor: cat.light,
                color: cat.color,
                opacity: active ? 1 : 0.4,
              }}
            >
              <Icon size={13} strokeWidth={2.25} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
