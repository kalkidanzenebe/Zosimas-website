import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, motionSafe, viewportReveal } from '../../lib/motion';
import { cn } from '../../lib/utils';

export function Reveal({ children, className, delay = 0, variants, as = 'div' }) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={cn(className)}
      variants={motionSafe(prefersReduced, variants || fadeUp)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
