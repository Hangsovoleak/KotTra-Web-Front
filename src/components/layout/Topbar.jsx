import Avatar from '@/components/common/Avatar';
import { useAuth } from '@/context/AuthContext';

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-end gap-3 border-b border-gray-100 bg-white px-8 py-4">
      <Avatar size={48} />
      <div className="text-right leading-tight">
        <p className="text-[15px] font-bold text-gray-800">{user?.name || 'Guest'}</p>
        <p className="text-xs text-gray-400">{user?.email || ''}</p>
      </div>
    </header>
  );
}
