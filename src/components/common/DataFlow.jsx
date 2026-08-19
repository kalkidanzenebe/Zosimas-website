import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

const STEPS = [
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'transform', label: 'Transform' },
];

export function DataFlow({ className, dark = false, steps = STEPS }) {
  const prefersReduced = useReducedMotion();
  const stroke = dark ? 'rgba(24,199,192,0.45)' : 'rgba(11,40,85,0.22)';
  const fill = dark ? '#18C7C0' : '#0B2855';
  const width = steps.length * 140 - 40;

  return (
    <svg
      viewBox={`0 0 ${width} 92`}
      className={cn('h-auto w-full overflow-visible', className)}
      role="img"
      aria-label={steps.map((step) => step.label).join(' to ')}
    >
      <motion.path
        d={`M 24 36 H ${width - 24}`}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        initial={{ pathLength: prefersReduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {!prefersReduced && (
        <circle r="3.5" fill="#13B8B2">
          <animateMotion dur="6s" repeatCount="indefinite" path={`M 24 36 H ${width - 24}`} />
        </circle>
      )}
      {steps.map((step, index) => {
        const x = 24 + index * 140;
        return (
          <g key={step.id}>
            <motion.circle
              cx={x}
              cy="36"
              r="7"
              fill={index % 2 === 0 ? fill : '#13B8B2'}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * index, duration: 0.35 }}
              style={{ transformOrigin: `${x}px 36px` }}
            />
            <text
              x={x}
              y="72"
              textAnchor="middle"
              fill={dark ? '#F5F8FC' : '#0B2855'}
              fontSize="12"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="600"
            >
              {step.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
