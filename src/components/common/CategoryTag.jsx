import { CATEGORIES } from '@/constants/categories';

/**
 * Small colored pill showing a category icon + label.
 * Used in the task form's multi-select, calendar filters, and event cards.
 */
export default function CategoryTag({ category, size = 'md', showLabel = true }) {
  const cat = CATEGORIES[category];
  if (!cat) return null;
  const Icon = cat.icon;

  const sizes = {
    sm: { pad: 'px-2 py-0.5', icon: 12, text: 'text-xs' },
    md: { pad: 'px-3 py-1', icon: 14, text: 'text-sm' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${s.pad} ${s.text}`}
      style={{ backgroundColor: cat.light, color: cat.color }}
    >
      <Icon size={s.icon} strokeWidth={2.25} />
      {showLabel && cat.label}
    </span>
  );
}

/** Circular icon-only badge, used on event cards to show which categories apply. */
export function CategoryIconBadge({ category, size = 28 }) {
  const cat = CATEGORIES[category];
  if (!cat) return null;
  const Icon = cat.icon;
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{ backgroundColor: cat.light, color: cat.color, width: size, height: size }}
    >
      <Icon size={size * 0.55} strokeWidth={2.25} />
    </span>
  );
}
