import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function EcosystemHub({ items, className }) {
  const prefersReduced = useReducedMotion();
  const positions = [
    { x: 260, y: 52 },
    { x: 430, y: 140 },
    { x: 430, y: 320 },
    { x: 260, y: 408 },
    { x: 90, y: 320 },
    { x: 90, y: 140 },
  ];

  return (
    <svg
      viewBox="0 0 520 460"
      className={cn('h-auto w-full overflow-visible', className)}
      role="img"
      aria-label="ZOSIMAS capability ecosystem"
    >
      {positions.map((point, index) => (
        <motion.line
          key={`spoke-${items[index]?.id || index}`}
          x1="260"
          y1="230"
          x2={point.x}
          y2={point.y}
          stroke="rgba(11,40,85,0.18)"
          strokeWidth="1.2"
          initial={{ pathLength: prefersReduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.08 * index }}
        />
      ))}

      <motion.circle
        cx="260"
        cy="230"
        r="36"
        fill="#0B2855"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: '260px 230px' }}
      />
      <circle cx="248" cy="218" r="3" fill="#18C7C0" />
      <circle cx="272" cy="226" r="2.4" fill="#13B8B2" />
      <circle cx="258" cy="244" r="2.2" fill="#FFFFFF" />
      <path d="M248 218 L272 226 L258 244 Z" fill="none" stroke="#18C7C0" strokeWidth="1" opacity="0.7" />

      {items.map((item, index) => {
        const point = positions[index];
        if (!point) return null;
        return (
          <g key={item.id}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="7"
              fill={index % 2 === 0 ? '#13B8B2' : '#0B2855'}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + index * 0.08 }}
              style={{ transformOrigin: `${point.x}px ${point.y}px` }}
            />
          </g>
        );
      })}
    </svg>
  );
}
