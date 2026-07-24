import { CATEGORY_LIST } from '@/constants/categories';
import CategoryInfoCard from '@/components/goals/CategoryInfoCard';

export default function Goals() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-start">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-800">
          Why all of these
          <br />
          options?
        </h1>
        <p className="w-[900px] text-right text-[15px] font-semibold leading-relaxed text-gray-600">
          These categories help users organize different types of activities in a simple and
          meaningful way. By separating meetings, learning, events, and general tasks, the
          calendar becomes easier to manage, search, and prioritize.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {CATEGORY_LIST.map((cat) => (
          <CategoryInfoCard key={cat.key} category={cat} />
        ))}
      </div>
    </div>
  );
}
