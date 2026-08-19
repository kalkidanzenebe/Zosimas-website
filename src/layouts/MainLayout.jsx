import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/footer/Footer';
import { NotificationToast } from '../components/common/NotificationToast';
import { closeMobileMenu } from '../store/slices/uiSlice';

export default function MainLayout() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location.pathname, dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a href="#main-content" className="skip-link">
        Skip to content
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
