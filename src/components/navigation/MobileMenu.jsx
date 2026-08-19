import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { navItems } from '../../data/navigation';
import { closeMobileMenu } from '../../store/slices/uiSlice';
import { useScrollLock } from '../../hooks/useScrollLock';
import { staggerFast } from '../../lib/motion';

export function MobileMenu() {
  const dispatch = useDispatch();
  useScrollLock(true);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-navy-dark lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex h-[72px] items-center justify-between px-5">
        <Logo light onClick={() => dispatch(closeMobileMenu())} />
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white"
          aria-label="Close menu"
          onClick={() => dispatch(closeMobileMenu())}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <motion.nav
        className="flex flex-col gap-2 px-5 pt-10"
        aria-label="Mobile"
        variants={staggerFast}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item) => (
          <motion.div key={item.to} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={() => dispatch(closeMobileMenu())}
              className={({ isActive }) =>
                `block border-b border-white/10 py-4 text-2xl font-semibold ${isActive ? 'text-cyan' : 'text-white'}`
              }
            >
              {item.label}
            </NavLink>
          </motion.div>
        ))}
        <motion.div className="pt-8" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <Button to="/contact" variant="light" arrow onClick={() => dispatch(closeMobileMenu())}>
            Start a Project
          </Button>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
