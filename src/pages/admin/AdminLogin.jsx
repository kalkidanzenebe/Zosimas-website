import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { FormInput } from '../../components/forms/FormInput';
import { ThemeToggle } from '../../components/common/SiteControls';
import { fetchAdminMe, loginAdmin } from '../../lib/api';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useDocumentMeta({
    title: 'Admin | ZOSIMAS',
    description: 'Sign in to manage ZOSIMAS blog posts.',
  });

  useEffect(() => {
    fetchAdminMe()
      .then(() => setSignedIn(true))
      .catch(() => setSignedIn(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page text-sm text-muted">
        Loading…
      </div>
    );
  }

  if (signedIn) {
    return <Navigate to={location.state?.from || '/admin'} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await loginAdmin(email, password);
      navigate(location.state?.from || '/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Could not sign in.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <div className="flex items-center justify-between px-6 py-5">
        <Logo to="/" compact />
        <ThemeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md border border-line bg-card p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Admin</p>
          <h1 className="mt-3 text-2xl font-bold text-ink">Sign in to manage the blog</h1>
          <p className="mt-2 text-sm text-muted">
            Use the admin email and password from your <code className="text-ink">.env</code> file.
          </p>
          <div className="mt-8 space-y-4">
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="mt-4 text-sm text-ink">{error}</p>}
          <div className="mt-8">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
