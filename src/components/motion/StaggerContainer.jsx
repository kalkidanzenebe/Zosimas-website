import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, motionSafe, staggerContainer, viewportReveal } from '../../lib/motion';

export function StaggerContainer({ children, className, as = 'div' }) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      variants={prefersReduced ? undefined : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div className={className} variants={motionSafe(prefersReduced, fadeUp)}>
      {children}
    </motion.div>
  );
}
