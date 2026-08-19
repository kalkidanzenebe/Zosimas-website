import { motion, useReducedMotion } from 'framer-motion';
import { useId, useMemo } from 'react';
import { useFinePointer, useIsMobile } from '../../hooks/useMediaQuery';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { cn } from '../../lib/utils';

const VARIANT_PRESETS = {
  hero: { density: 'high', speed: 1, interactive: true, tone: 'light' },
  about: { density: 'medium', speed: 0.85, interactive: true, tone: 'light' },
  solutions: { density: 'medium', speed: 0.7, interactive: false, tone: 'dark' },
  cta: { density: 'low', speed: 0.75, interactive: false, tone: 'dark' },
  services: { density: 'medium', speed: 0.9, interactive: false, tone: 'light' },
  footer: { density: 'low', speed: 0.6, interactive: false, tone: 'dark' },
  compact: { density: 'low', speed: 0.8, interactive: false, tone: 'light' },
};

function buildGraph(density) {
  const zNodes = [
    { id: 'z1', x: 78, y: 92, r: 5, pulse: true },
    { id: 'z2', x: 168, y: 88, r: 3.5 },
    { id: 'z3', x: 258, y: 92, r: 4.2, pulse: true },
    { id: 'z4', x: 348, y: 86, r: 3.2 },
    { id: 'z5', x: 430, y: 96, r: 5.4, pulse: true },
    { id: 'z6', x: 372, y: 162, r: 3.6 },
    { id: 'z7', x: 304, y: 228, r: 4.8, pulse: true },
    { id: 'z8', x: 236, y: 292, r: 3.4 },
    { id: 'z9', x: 168, y: 356, r: 4.1 },
    { id: 'z10', x: 86, y: 424, r: 5.2, pulse: true },
    { id: 'z11', x: 176, y: 430, r: 3.3 },
    { id: 'z12', x: 268, y: 426, r: 4.4, pulse: true },
    { id: 'z13', x: 356, y: 432, r: 3.1 },
    { id: 'z14', x: 438, y: 422, r: 5, pulse: true },
  ];

  const extra = [
    { id: 'a', x: 54, y: 188, r: 2.8 },
    { id: 'b', x: 96, y: 260, r: 3.2, pulse: true },
    { id: 'c', x: 48, y: 336, r: 2.6 },
    { id: 'd', x: 470, y: 176, r: 3 },
    { id: 'e', x: 488, y: 268, r: 2.4 },
    { id: 'f', x: 456, y: 338, r: 3.4, pulse: true },
    { id: 'g', x: 120, y: 150, r: 2.2 },
    { id: 'h', x: 400, y: 360, r: 2.4 },
  ];

  const sparse = extra.slice(0, 4);
  const nodes = density === 'high' ? [...zNodes, ...extra] : density === 'medium' ? [...zNodes, ...sparse] : zNodes;

  const edges = [
    ['z1', 'z2'],
    ['z2', 'z3'],
    ['z3', 'z4'],
    ['z4', 'z5'],
    ['z5', 'z6'],
    ['z6', 'z7'],
    ['z7', 'z8'],
    ['z8', 'z9'],
    ['z9', 'z10'],
    ['z10', 'z11'],
    ['z11', 'z12'],
    ['z12', 'z13'],
    ['z13', 'z14'],
    ['z1', 'g'],
    ['z7', 'b'],
    ['z5', 'd'],
    ['z14', 'f'],
    ['z3', 'z7'],
    ['z7', 'z12'],
    ['z10', 'c'],
    ['a', 'b'],
    ['d', 'e'],
    ['e', 'f'],
  ];

  return { nodes, edges };
}

function nodeById(nodes, id) {
  return nodes.find((node) => node.id === id);
}

function edgePath(from, to) {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

export function DigitalNetwork({
  variant = 'hero',
  density,
  speed,
  color,
  interactive,
  className,
  showZ = false,
}) {
  const uid = useId().replace(/:/g, '');
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const finePointer = useFinePointer();
  const preset = VARIANT_PRESETS[variant] || VARIANT_PRESETS.hero;

  const resolvedDensity = density || (isMobile ? 'low' : preset.density);
  const resolvedSpeed = speed ?? preset.speed;
  const resolvedInteractive = interactive ?? preset.interactive;
  const tone = preset.tone;
  const dark = tone === 'dark';
  const accent = color || (dark ? '#18C7C0' : '#13B8B2');
  const line = dark ? 'rgba(24,199,192,0.28)' : 'rgba(11,40,85,0.18)';
  const nodeFill = dark ? '#18C7C0' : '#0B2855';

  const canInteract = resolvedInteractive && finePointer && !prefersReduced && !isMobile;
  const { ref, offset, onMove, onLeave } = usePointerParallax({
    enabled: canInteract,
    strength: 10,
  });

  const { nodes, edges } = useMemo(() => buildGraph(resolvedDensity), [resolvedDensity]);
  const duration = prefersReduced ? 0 : 2.4 / resolvedSpeed;

  const particles = prefersReduced || resolvedDensity === 'low' ? [] : [
    { id: 'p1', d: 'M 78 92 L 430 96 L 304 228 L 86 424 L 438 422', delay: 0 },
    { id: 'p2', d: 'M 430 96 L 168 356 L 268 426', delay: 1.6 },
  ];

  return (
    <div
      ref={ref}
      onMouseMove={canInteract ? onMove : undefined}
      onMouseLeave={canInteract ? onLeave : undefined}
      className={cn('relative aspect-square w-full max-w-[min(100%,560px)]', className)}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 520 520"
        className="h-full w-full overflow-visible"
        animate={prefersReduced ? undefined : { x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 0.6 }}
      >
        <defs>
          <linearGradient id={`net-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0B2855" stopOpacity={dark ? 0.2 : 0.55} />
          </linearGradient>
          <radialGradient id={`net-glow-${uid}`} cx="50%" cy="48%" r="48%">
            <stop offset="0%" stopColor={accent} stopOpacity={dark ? 0.16 : 0.12} />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="260" r="210" fill={`url(#net-glow-${uid})`} />

        {!prefersReduced && (
          <motion.g
            style={{ transformOrigin: '260px 260px' }}
            animate={{ rotate: dark ? 0 : 360 }}
            transition={{ duration: 80 / resolvedSpeed, repeat: Infinity, ease: 'linear' }}
            opacity="0.35"
          >
            <circle cx="260" cy="260" r="196" fill="none" stroke={line} strokeWidth="0.6" strokeDasharray="3 10" />
          </motion.g>
        )}

        {showZ && (
          <motion.path
            d="M118 128 H392 L128 392 H404"
            fill="none"
            stroke={`url(#net-grad-${uid})`}
            strokeWidth="7"
            strokeLinejoin="miter"
            strokeLinecap="square"
            initial={{ pathLength: prefersReduced ? 1 : 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: duration + 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {edges.map(([fromId, toId], index) => {
          const from = nodeById(nodes, fromId);
          const to = nodeById(nodes, toId);
          if (!from || !to) return null;
          const d = edgePath(from, to);
          return (
            <motion.path
              key={`${fromId}-${toId}`}
              d={d}
              fill="none"
              stroke={line}
              strokeWidth="1.1"
              initial={{ pathLength: prefersReduced ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration, delay: prefersReduced ? 0 : 0.04 * index, ease: 'easeOut' }}
            />
          );
        })}

        {particles.map((particle) => (
          <circle key={particle.id} r="3" fill={accent} opacity="0.9">
            <animateMotion dur={`${5.8 / resolvedSpeed}s`} begin={`${particle.delay}s`} repeatCount="indefinite" path={particle.d} />
          </circle>
        ))}

        {nodes.map((node, index) => (
          <g key={node.id}>
            {node.pulse && !prefersReduced && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 7}
                fill={accent}
                opacity="0.16"
                className="animate-network-pulse"
                style={{ animationDelay: `${index * 0.18}s` }}
              />
            )}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.pulse ? accent : nodeFill}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: prefersReduced ? 0 : 0.3 + index * 0.03, duration: 0.35 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          </g>
        ))}

        <motion.rect
          x="402"
          y="214"
          width="18"
          height="18"
          fill="none"
          stroke={accent}
          strokeWidth="1.2"
          opacity="0.7"
          animate={prefersReduced ? undefined : { y: [214, 204, 214], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.rect
          x="72"
          y="300"
          width="12"
          height="12"
          fill="none"
          stroke={dark ? '#18C7C0' : '#0B2855'}
          strokeWidth="1"
          opacity="0.45"
          animate={prefersReduced ? undefined : { y: [300, 310, 300] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>
  );
}
