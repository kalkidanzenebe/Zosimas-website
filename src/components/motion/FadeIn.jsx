import { motion, useReducedMotion } from 'framer-motion';
import { fadeIn, motionSafe } from '../../lib/motion';

export function FadeIn({ children, className, delay = 0 }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={motionSafe(prefersReduced, fadeIn)}
      initial="hidden"
      animate="visible"
      transition={{ delay, duration: prefersReduced ? 0.2 : 0.6 }}
    >
      {children}
    </motion.div>
  );
}
