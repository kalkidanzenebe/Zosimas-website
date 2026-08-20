import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { SiteControls } from '../common/SiteControls';
import { MobileMenu } from './MobileMenu';
import { localizedNav } from '../../i18n/data';
import { cn } from '../../lib/utils';
import { openMobileMenu } from '../../store/slices/uiSlice';
import { useI18n } from '../../hooks/useI18n';

export function Navbar() {
  const dispatch = useDispatch();
  const mobileMenuOpen = useSelector((state) => state.ui.mobileMenuOpen);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();
  const location = useLocation();
  const { t } = useI18n();
  const darkHero = location.pathname === '/';
  const items = localizedNav(t);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const inverted = darkHero && !scrolled && !mobileMenuOpen;

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          scrolled || mobileMenuOpen
            ? 'border-b border-line/80 bg-page/90 shadow-[0_8px_30px_rgba(7,27,58,0.06)] backdrop-blur-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.28)]'
            : inverted
              ? 'border-b border-transparent bg-transparent'
              : 'border-b border-transparent bg-page/70 backdrop-blur-sm',
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-3">
          <Logo light={inverted} />
          <nav className="hidden items-center gap-5 xl:flex xl:gap-6" aria-label={t('nav.primary')}>
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative py-1 text-sm font-medium tracking-wide transition-colors',
                    inverted ? 'text-white/80 hover:text-white' : 'text-ink/70 hover:text-ink',
                    isActive && (inverted ? 'text-white' : 'text-ink'),
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <motion.span
                      className={cn('absolute inset-x-0 -bottom-1 h-px origin-left', inverted ? 'bg-cyan' : 'bg-teal')}
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={prefersReduced ? undefined : { scaleX: 1 }}
                      transition={{ duration: 0.22 }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 xl:flex">
            <SiteControls inverted={inverted} />
            <Button to="/contact" variant={inverted ? 'ghost' : 'primary'} arrow>
              {t('nav.startProject')}
            </Button>
          </div>
          <div className="flex items-center gap-2 xl:hidden">
            <SiteControls inverted={inverted} />
            <button
              type="button"
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center border',
                inverted ? 'border-white/20 text-white' : 'border-line text-ink',
              )}
              aria-label={t('nav.openMenu')}
              aria-expanded={mobileMenuOpen}
              onClick={() => dispatch(openMobileMenu())}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </motion.header>
      <AnimatePresence>{mobileMenuOpen && <MobileMenu />}</AnimatePresence>
    </>
  );
}
