export default function CategoryInfoCard({ category }) {
  const Icon = category.icon;
  return (
    <div
      className="rounded-2xl border-2 bg-white px-8 py-6"
      style={{ borderColor: category.border }}
    >
      <div className="mb-3 flex items-center gap-4">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: category.light, color: category.color }}
        >
          <Icon size={24} strokeWidth={2.25} />
        </span>
        <h3 className="text-2xl font-extrabold text-gray-800">{category.title}</h3>
      </div>
      <p className="text-[15px] font-semibold leading-relaxed text-gray-500">
        {category.description}
      </p>
    </div>
  );
}
