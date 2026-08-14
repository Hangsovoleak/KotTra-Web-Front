import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, AlertCircle, ArrowRight } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import PasswordInput from '@/components/auth/PasswordInput';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, clearError } = useAuth();

  const [form, setForm] = useState({
    email: localStorage.getItem('kottra_remember_email') || '',
    password: '',
    rememberMe: Boolean(localStorage.getItem('kottra_remember_email')),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');

  useEffect(() => {
    clearError();
    if (location.state?.message) {
      setSuccessNotice(location.state.message);
    }
  }, [location.state, clearError]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessNotice('');
    setIsSubmitting(true);

    try {
      if (form.rememberMe) {
        localStorage.setItem('kottra_remember_email', form.email);
      } else {
        localStorage.removeItem('kottra_remember_email');
      }

      await login({ email: form.email, password: form.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to manage tasks and goals."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {successNotice && (
          <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 font-medium">
            <span>{successNotice}</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600 font-medium">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

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
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-xs font-semibold text-gray-700">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-learning-bold hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={form.rememberMe}
            onChange={(e) => setForm((prev) => ({ ...prev, rememberMe: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-learning-bold focus:ring-learning-bold/20 cursor-pointer"
          />
          <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-600 select-none cursor-pointer">
            Remember my email
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-learning-bold py-2.5 px-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
        >
          <span>{isSubmitting ? 'Signing in...' : 'Sign in'}</span>
          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <SocialLoginButtons onError={(msg) => setError(msg)} />

      <div className="mt-6 text-center text-xs text-gray-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-learning-bold hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
