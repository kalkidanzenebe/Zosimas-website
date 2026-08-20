import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/footer/Footer';
import { NotificationToast } from '../components/common/NotificationToast';
import { closeMobileMenu } from '../store/slices/uiSlice';
import { useI18n } from '../hooks/useI18n';

export default function MainLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useI18n();

  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location.pathname, dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <a href="#main-content" className="skip-link">
        {t('skip')}
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <NotificationToast />
    </div>
  );
}
