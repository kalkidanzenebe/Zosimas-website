import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function AnimatedLine({ className, dark = false }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={cn('block h-px origin-left', dark ? 'bg-cyan/50' : 'bg-teal', className)}
      initial={{ scaleX: prefersReduced ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
