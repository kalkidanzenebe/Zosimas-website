import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const Solutions = lazy(() => import('../pages/Solutions'));
const Projects = lazy(() => import('../pages/Projects'));
const Careers = lazy(() => import('../pages/Careers'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-surface text-sm text-muted" role="status">
      Loading…
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="projects" element={<Projects />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
