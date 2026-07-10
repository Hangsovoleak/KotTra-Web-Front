import { Inbox } from 'lucide-react';

export default function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white py-14 text-center">
      <Inbox size={28} className="text-gray-300" />
      <p className="text-sm font-semibold text-gray-400">{message}</p>
    </div>
  );
}
