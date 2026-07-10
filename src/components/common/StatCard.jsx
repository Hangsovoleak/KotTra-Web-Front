import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, category }) {
  return (
    <div className="flex-1 min-w-[210px] rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-[15px] font-bold text-gray-800">{title}</p>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full shrink-0"
          style={{ backgroundColor: category.light, color: category.color }}
        >
          <Icon size={18} strokeWidth={2.25} />
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-4xl font-extrabold" style={{ color: category.bold }}>
          {value}
        </span>
        <TrendingUp size={20} className="text-gray-300 mb-1" />
      </div>
    </div>
  );
}
