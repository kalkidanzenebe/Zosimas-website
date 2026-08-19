import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, motionSafe, staggerContainer, viewportReveal } from '../../lib/motion';
import { cn } from '../../lib/utils';

export function SectionReveal({ children, className, as = 'section', id }) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as] || motion.section;

  return (
    <Component
      id={id}
      className={cn(className)}
      variants={prefersReduced ? undefined : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      {children}
    </Component>
  );
}

export function SectionRevealItem({ children, className }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div className={className} variants={motionSafe(prefersReduced, fadeUp)}>
      {children}
    </motion.div>
  );
}
