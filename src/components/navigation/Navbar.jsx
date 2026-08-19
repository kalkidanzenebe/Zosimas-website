import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { MobileMenu } from './MobileMenu';
import { navItems } from '../../data/navigation';
import { cn } from '../../lib/utils';
import { openMobileMenu } from '../../store/slices/uiSlice';

export function Navbar() {
  const dispatch = useDispatch();
  const mobileMenuOpen = useSelector((state) => state.ui.mobileMenuOpen);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();
  const location = useLocation();
  const darkHero = location.pathname === '/';

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
            ? 'border-b border-line/80 bg-white/90 shadow-[0_8px_30px_rgba(7,27,58,0.06)] backdrop-blur-md'
            : inverted
              ? 'border-b border-transparent bg-transparent'
              : 'border-b border-transparent bg-white/70 backdrop-blur-sm',
        )}
      >
        <Container className="flex h-[72px] items-center justify-between">
          <Logo light={inverted} />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative py-1 text-sm font-medium tracking-wide transition-colors',
                    inverted ? 'text-white/80 hover:text-white' : 'text-navy/70 hover:text-navy',
                    isActive && (inverted ? 'text-white' : 'text-navy'),
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
          <div className="hidden lg:block">
            <Button to="/contact" variant={inverted ? 'ghost' : 'primary'} arrow>
              Start a Project
            </Button>
          </div>
          <button
            type="button"
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center border lg:hidden',
              inverted ? 'border-white/20 text-white' : 'border-line text-navy',
            )}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => dispatch(openMobileMenu())}
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </motion.header>
      <AnimatePresence>{mobileMenuOpen && <MobileMenu />}</AnimatePresence>
    </>
  );
}
