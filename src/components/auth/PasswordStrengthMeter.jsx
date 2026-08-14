import { Check, X } from 'lucide-react';

export default function PasswordStrengthMeter({ password = '' }) {
  if (!password) return null;

  const checks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Contains number', valid: /[0-9]/.test(password) },
    { label: 'Contains special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const passedCount = checks.filter((c) => c.valid).length;

  let strengthLabel = 'Weak';
  let strengthColor = 'bg-red-500';
  let widthPercent = '25%';

  if (passedCount === 2) {
    strengthLabel = 'Fair';
    strengthColor = 'bg-amber-500';
    widthPercent = '50%';
  } else if (passedCount === 3) {
    strengthLabel = 'Good';
    strengthColor = 'bg-blue-500';
    widthPercent = '75%';
  } else if (passedCount === 4) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-emerald-500';
    widthPercent = '100%';
  }

  return (
    <div className="mt-2 space-y-2 rounded-xl bg-gray-50 p-3.5 border border-gray-200 text-xs">
      <div className="flex items-center justify-between font-medium text-gray-700">
        <span>Password strength:</span>
        <span className={`font-semibold ${passedCount <= 1 ? 'text-red-500' : passedCount === 2 ? 'text-amber-600' : passedCount === 3 ? 'text-blue-600' : 'text-emerald-600'}`}>
          {strengthLabel}
        </span>
      </div>

      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strengthColor}`}
          style={{ width: widthPercent }}
        />
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            {check.valid ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            )}
            <span className={check.valid ? 'text-gray-700 font-medium' : 'text-gray-400'}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
