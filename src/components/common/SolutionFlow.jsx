import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function SolutionFlow({ steps, className, dark = false }) {
  const prefersReduced = useReducedMotion();
  const text = dark ? '#F5F8FC' : '#0B2855';
  const muted = dark ? 'rgba(245,248,252,0.62)' : '#4A6280';
  const line = dark ? 'rgba(24,199,192,0.45)' : 'rgba(11,40,85,0.2)';

  return (
    <svg
      viewBox="0 0 920 180"
      className={cn('h-auto w-full overflow-visible', className)}
      role="img"
      aria-label="Business challenge to business value"
    >
      <motion.path
        d="M 60 70 H 860"
        fill="none"
        stroke={line}
        strokeWidth="1.6"
        initial={{ pathLength: prefersReduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      {!prefersReduced && (
        <circle r="4" fill="#13B8B2">
          <animateMotion dur="7s" repeatCount="indefinite" path="M 60 70 H 860" />
        </circle>
      )}
      {steps.map((step, index) => {
        const x = 60 + index * 260;
        return (
          <g key={step.id}>
            <motion.circle
              cx={x}
              cy="70"
              r="10"
              fill={index === steps.length - 1 ? '#13B8B2' : dark ? '#18C7C0' : '#0B2855'}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * index }}
              style={{ transformOrigin: `${x}px 70px` }}
            />
            <text x={x} y="112" textAnchor="middle" fill={text} fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              {step.name}
            </text>
            <foreignObject x={x - 110} y="122" width="220" height="52">
              <p xmlns="http://www.w3.org/1999/xhtml" style={{ margin: 0, fontSize: '11px', lineHeight: 1.4, color: muted, textAlign: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {step.description}
              </p>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
}
