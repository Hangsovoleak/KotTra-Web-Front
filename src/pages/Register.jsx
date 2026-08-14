import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import PasswordInput from '@/components/auth/PasswordInput';
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const { register, clearError } = useAuth();

  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    clearError();
  }, [clearError]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.acceptTerms) {
      setError('You must accept the Terms of Service and Privacy Policy to continue.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        email: form.email,
        password: form.password,
        displayName: form.displayName,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up for free to start planning your tasks and calendar."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600 font-medium">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="displayName" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              value={form.displayName}
              onChange={(e) => setForm((prev) => ({ ...prev, displayName: e.target.value }))}
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-learning-bold focus:ring-2 focus:ring-learning-bold/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Email address
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
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-learning-bold focus:ring-2 focus:ring-learning-bold/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Create a strong password"
            autoComplete="new-password"
          />
          <PasswordStrengthMeter password={form.password} />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Re-enter password"
            autoComplete="new-password"
          />
        </div>

        <div className="flex items-start">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={form.acceptTerms}
            onChange={(e) => setForm((prev) => ({ ...prev, acceptTerms: e.target.checked }))}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-learning-bold focus:ring-learning-bold/20 cursor-pointer"
          />
          <label htmlFor="acceptTerms" className="ml-2 text-xs text-gray-600 select-none leading-normal">
            I agree to the{' '}
            <span className="text-learning-bold underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-learning-bold underline cursor-pointer">Privacy Policy</span>.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-learning-bold py-2.5 px-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
        >
          <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <SocialLoginButtons onError={(msg) => setError(msg)} />

      <div className="mt-6 text-center text-xs text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-learning-bold hover:underline">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
