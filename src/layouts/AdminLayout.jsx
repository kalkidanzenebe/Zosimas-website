import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchAdminMe, logoutAdmin } from '../lib/api';
import { Logo } from '../components/common/Logo';
import { ThemeToggle } from '../components/common/SiteControls';
import { NotificationToast } from '../components/common/NotificationToast';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchAdminMe()
      .then((data) => {
        if (!cancelled) setAdmin(data.admin);
      })
      .catch(() => {
        if (!cancelled) setAdmin(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    try {
      await logoutAdmin();
    } catch {
      // Cookie is cleared server-side even if the request is retried.
    }
    navigate('/admin/login', { replace: true });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page text-sm text-muted">
        Checking admin session…
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Logo to="/admin" compact />
            <nav className="hidden items-center gap-4 text-sm font-medium text-muted sm:flex">
              <Link to="/admin" className="hover:text-ink">
                Posts
              </Link>
              <Link to="/" className="hover:text-ink">
                View site
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-muted sm:block">{admin.email}</p>
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              className="h-10 border border-line px-3 text-sm font-semibold text-ink hover:border-teal"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <NotificationToast />
    </div>
  );
}
