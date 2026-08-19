import { motion, useReducedMotion } from 'framer-motion';

const visuals = {
  web: (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#071B3A" />
      <rect x="72" y="64" width="496" height="272" fill="none" stroke="#13B8B2" strokeWidth="1.2" opacity="0.5" />
      <line x1="72" y1="108" x2="568" y2="108" stroke="#13B8B2" strokeWidth="1" opacity="0.35" />
      <circle cx="96" cy="86" r="5" fill="#13B8B2" />
      <circle cx="118" cy="86" r="5" fill="#18C7C0" />
      <circle cx="140" cy="86" r="5" fill="#FFFFFF" opacity="0.5" />
      <rect x="104" y="140" width="180" height="12" fill="#0B2855" />
      <rect x="104" y="168" width="280" height="8" fill="#13B8B2" opacity="0.35" />
      <rect x="104" y="192" width="240" height="8" fill="#13B8B2" opacity="0.2" />
      <rect x="360" y="148" width="160" height="120" fill="none" stroke="#18C7C0" strokeWidth="1" />
      <circle cx="440" cy="208" r="18" fill="none" stroke="#13B8B2" strokeWidth="1.4" />
      <path d="M72 336 L200 260 L320 300 L420 220 L568 248" fill="none" stroke="#18C7C0" strokeWidth="1.4" opacity="0.7" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#071B3A" />
      <rect x="240" y="48" width="160" height="304" rx="18" fill="none" stroke="#18C7C0" strokeWidth="1.6" />
      <rect x="262" y="88" width="116" height="10" fill="#0B2855" />
      <rect x="262" y="112" width="90" height="8" fill="#13B8B2" opacity="0.4" />
      <circle cx="320" cy="200" r="28" fill="none" stroke="#13B8B2" strokeWidth="1.4" />
      <circle cx="320" cy="200" r="6" fill="#18C7C0" />
      <line x1="180" y1="160" x2="240" y2="200" stroke="#13B8B2" strokeWidth="1" opacity="0.5" />
      <line x1="400" y1="200" x2="470" y2="150" stroke="#13B8B2" strokeWidth="1" opacity="0.5" />
      <circle cx="180" cy="160" r="5" fill="#13B8B2" />
      <circle cx="470" cy="150" r="5" fill="#18C7C0" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#071B3A" />
      <circle cx="320" cy="200" r="86" fill="none" stroke="#13B8B2" strokeWidth="1" opacity="0.4" />
      <circle cx="320" cy="200" r="46" fill="none" stroke="#18C7C0" strokeWidth="1.2" />
      <circle cx="320" cy="200" r="8" fill="#18C7C0" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 320 + Math.cos(rad) * 86;
        const y = 200 + Math.sin(rad) * 86;
        return <circle key={angle} cx={x} cy={y} r="5" fill={angle % 120 === 0 ? '#13B8B2' : '#FFFFFF'} />;
      })}
      <path d="M140 300 L230 220 L320 200 L430 140 L520 170" fill="none" stroke="#13B8B2" strokeWidth="1.2" opacity="0.6" />
    </svg>
  ),
  enterprise: (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#071B3A" />
      <rect x="80" y="80" width="150" height="240" fill="none" stroke="#13B8B2" strokeWidth="1" />
      <rect x="250" y="80" width="150" height="240" fill="none" stroke="#18C7C0" strokeWidth="1.2" />
      <rect x="420" y="80" width="140" height="240" fill="none" stroke="#13B8B2" strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="120" x2="210" y2="120" stroke="#18C7C0" strokeWidth="6" opacity="0.35" />
      <line x1="270" y1="140" x2="380" y2="140" stroke="#13B8B2" strokeWidth="6" opacity="0.45" />
      <line x1="440" y1="160" x2="540" y2="160" stroke="#18C7C0" strokeWidth="6" opacity="0.25" />
      <circle cx="320" cy="80" r="5" fill="#18C7C0" />
      <circle cx="155" cy="320" r="5" fill="#13B8B2" />
      <circle cx="490" cy="320" r="5" fill="#FFFFFF" />
    </svg>
  ),
};

export function ProjectVisual({ type = 'web' }) {
  return visuals[type] || visuals.web;
}
