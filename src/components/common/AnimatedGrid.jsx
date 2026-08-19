import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function AnimatedGrid({ className, dark = false }) {
  const prefersReduced = useReducedMotion();
  const stroke = dark ? 'rgba(24,199,192,0.16)' : 'rgba(11,40,85,0.1)';

  return (
    <svg viewBox="0 0 800 400" className={cn('h-full w-full', className)} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={50 + i * 90}
          y1="20"
          x2={50 + i * 90}
          y2="380"
          stroke={stroke}
          strokeWidth="1"
          initial={{ pathLength: prefersReduced ? 1 : 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: i * 0.04 }}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="40"
          y1={40 + i * 80}
          x2="760"
          y2={40 + i * 80}
          stroke={stroke}
          strokeWidth="1"
          initial={{ pathLength: prefersReduced ? 1 : 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}
