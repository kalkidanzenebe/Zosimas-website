import { useId } from 'react';
import { cn } from '../../lib/utils';

export function GeometricPattern({ className, dark = false }) {
  const uid = useId().replace(/:/g, '');
  const stroke = dark ? 'rgba(24,199,192,0.18)' : 'rgba(11,40,85,0.08)';

  return (
    <svg viewBox="0 0 400 400" className={cn('h-full w-full', className)} aria-hidden="true">
      <defs>
        <pattern id={`geo-grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill={`url(#geo-grid-${uid})`} />
      <rect x="80" y="80" width="48" height="48" fill="none" stroke="#13B8B2" strokeWidth="1.2" opacity="0.5" />
      <rect x="248" y="220" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="300" cy="96" r="4" fill="#13B8B2" opacity="0.7" />
      <circle cx="120" cy="280" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
