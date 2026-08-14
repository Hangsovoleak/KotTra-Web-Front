import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import PasswordInput from '@/components/auth/PasswordInput';
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter';
import { useAuth } from '@/hooks/useAuth';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode') || '';

  const { confirmPasswordReset, clearError } = useAuth();

  const [form, setForm] = useState({
    code: oobCode,
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    clearError();
  }, [clearError]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const targetCode = form.code || oobCode;
    if (!targetCode) {
      setError('Invalid or missing password reset code.');
      return;
    }

    if (form.newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      await confirmPasswordReset(targetCode, form.newPassword);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Your password has been successfully reset! Please sign in.' },
        });
      }, 2500);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Link may be expired or invalid.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title={isSuccess ? 'Password Reset Successful' : 'Set new password'}
      subtitle={
        isSuccess
          ? 'Redirecting you to sign in...'
          : 'Please enter a strong new password for your account.'
      }
    >
      {isSuccess ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-800">Password Updated!</h3>
          <p className="text-xs text-gray-600">
            Your password has been changed. You will be redirected to the sign-in page in a moment...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!oobCode && (
            <div>
              <label htmlFor="code" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Reset Code / Token
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={form.code}
                onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
                placeholder="Paste code from email"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-learning-bold focus:ring-2 focus:ring-learning-bold/20"
              />
            </div>
          )}

          <div>
            <label htmlFor="newPassword" className="block text-xs font-semibold text-gray-700 mb-1.5">
              New Password
            </label>
            <PasswordInput
              id="newPassword"
              name="newPassword"
              value={form.newPassword}
              onChange={(e) => setForm((prev) => ({ ...prev, newPassword: e.target.value }))}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
            <PasswordStrengthMeter password={form.newPassword} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Confirm New Password
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Re-enter new password"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-learning-bold py-2.5 px-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
          >
            <span>{isSubmitting ? 'Updating password...' : 'Update Password'}</span>
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>

          <div className="pt-2 text-center text-xs text-gray-500">
            Remembered your password?{' '}
            <Link to="/login" className="font-semibold text-learning-bold hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
