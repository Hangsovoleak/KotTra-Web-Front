import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPassword() {
  const { resetPassword, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await resetPassword(email);
      setIsSubmitted(true);
      setResendCooldown(60);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title={isSubmitted ? 'Check your email' : 'Forgot password?'}
      subtitle={
        isSubmitted
          ? `We sent password reset instructions to ${email}`
          : 'No worries! Enter your email address below and we will send you a reset link.'
      }
    >
      {isSubmitted ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">Reset link sent!</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              If an account exists with <span className="font-semibold text-gray-800">{email}</span>, you will receive an email shortly with steps to reset your password.
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || resendCooldown > 0}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>
                {resendCooldown > 0
                  ? `Resend email in ${resendCooldown}s`
                  : isSubmitting
                  ? 'Sending...'
                  : 'Resend reset link'}
              </span>
            </button>

            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-learning-bold py-2.5 px-4 text-sm font-semibold text-white hover:opacity-90 transition duration-150 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
              Your registered email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-learning-bold focus:ring-2 focus:ring-learning-bold/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-learning-bold py-2.5 px-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
          >
            <span>{isSubmitting ? 'Sending instructions...' : 'Send Reset Link'}</span>
          </button>

          <div className="pt-2 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-learning-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
