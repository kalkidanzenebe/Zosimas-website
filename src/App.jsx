import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ScrollToTop } from './routes/ScrollToTop';
import { PreferencesSync } from './components/common/PreferencesSync';

export default function App() {
  return (
    <BrowserRouter>
      <PreferencesSync />
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
