import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-event-light bg-white py-14 text-center">
      <AlertTriangle size={28} className="text-event-bold" />
      <p className="text-sm font-semibold text-gray-500">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-event-light px-4 py-1.5 text-sm font-bold text-event-bold cursor-pointer"
        >
          Try again
        </button>
      )}
    </div>
  );
}
