import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">404</h1>
      <p className="text-sm font-semibold text-gray-400">This page doesn't exist.</p>
      <Link
        to="/dashboard"
        className="mt-2 rounded-full bg-meeting-light px-4 py-1.5 text-sm font-bold text-meeting-bold"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
