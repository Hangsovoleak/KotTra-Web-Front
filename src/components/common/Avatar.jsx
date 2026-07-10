import { User } from 'lucide-react';

/**
 * Generic avatar placeholder. The original screenshot shows a custom
 * illustrated character avatar; since that artwork isn't included as an
 * asset in the source ZIP, this renders a clean circular fallback in the
 * same position/size instead of copying someone else's illustration.
 */
export default function Avatar({ size = 48 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full border-2 border-meeting-bold bg-meeting-light shrink-0"
      style={{ width: size, height: size, color: 'var(--color-meeting-bold)' }}
    >
      <User size={size * 0.55} strokeWidth={2} />
    </span>
  );
}
