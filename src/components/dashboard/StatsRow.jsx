import StatCard from '@/components/common/StatCard';
import { CATEGORIES } from '@/constants/categories';
import { useTaskStats } from '@/hooks/useTaskStats';

export default function StatsRow() {
  const { stats } = useTaskStats();

  return (
    <div className="flex flex-wrap gap-5">
      <StatCard
        title="Meeting Total"
        value={stats.meeting}
        icon={CATEGORIES.meeting.icon}
        category={CATEGORIES.meeting}
      />
      <StatCard
        title="Learning Total"
        value={stats.learning}
        icon={CATEGORIES.learning.icon}
        category={CATEGORIES.learning}
      />
      <StatCard
        title="Events Total"
        value={stats.event}
        icon={CATEGORIES.event.icon}
        category={CATEGORIES.event}
      />
      <StatCard
        title="General Total"
        value={stats.general}
        icon={CATEGORIES.general.icon}
        category={CATEGORIES.general}
      />
    </div>
  );
}
