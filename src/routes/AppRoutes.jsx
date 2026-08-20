import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';
import { useI18n } from '../hooks/useI18n';

const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const Solutions = lazy(() => import('../pages/Solutions'));
const Projects = lazy(() => import('../pages/Projects'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const Careers = lazy(() => import('../pages/Careers'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminPosts = lazy(() => import('../pages/admin/AdminPosts'));
const AdminPostForm = lazy(() => import('../pages/admin/AdminPostForm'));

function PageFallback() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-surface text-sm text-muted" role="status">
      {t('loading')}
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminPosts />} />
          <Route path="posts/new" element={<AdminPostForm />} />
          <Route path="posts/:id/edit" element={<AdminPostForm />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
