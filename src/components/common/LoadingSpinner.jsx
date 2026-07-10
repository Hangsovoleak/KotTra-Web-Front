export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-gray-400">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-meeting-bold" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
