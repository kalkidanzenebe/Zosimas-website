function Frame({ children }) {
  return (
    <svg viewBox="0 0 560 420" className="h-full w-full" aria-hidden="true">
      <rect width="560" height="420" fill="#071B3A" />
      <rect x="24" y="24" width="512" height="372" fill="none" stroke="rgba(24,199,192,0.18)" strokeWidth="1" />
      {children}
    </svg>
  );
}

const visuals = {
  globe: (
    <>
      <rect x="72" y="78" width="416" height="264" fill="none" stroke="#13B8B2" strokeWidth="1.4" />
      <line x1="72" y1="118" x2="488" y2="118" stroke="rgba(24,199,192,0.35)" />
      <circle cx="96" cy="98" r="5" fill="#13B8B2" />
      <circle cx="118" cy="98" r="5" fill="#18C7C0" />
      <circle cx="140" cy="98" r="5" fill="#FFFFFF" opacity="0.45" />
      <path d="M110 250 L190 180 L270 220 L360 150 L448 190" fill="none" stroke="#18C7C0" strokeWidth="1.6" />
      <circle cx="190" cy="180" r="6" fill="#13B8B2" />
      <circle cx="360" cy="150" r="6" fill="#18C7C0" />
      <rect x="300" y="230" width="148" height="86" fill="none" stroke="#13B8B2" strokeWidth="1" />
    </>
  ),
  smartphone: (
    <>
      <rect x="208" y="54" width="144" height="292" rx="22" fill="none" stroke="#18C7C0" strokeWidth="1.8" />
      <rect x="230" y="92" width="100" height="8" fill="#0B2855" />
      <circle cx="280" cy="200" r="34" fill="none" stroke="#13B8B2" strokeWidth="1.4" />
      <circle cx="280" cy="200" r="6" fill="#18C7C0" />
      <line x1="88" y1="150" x2="208" y2="190" stroke="#13B8B2" strokeWidth="1" opacity="0.6" />
      <line x1="352" y1="210" x2="470" y2="140" stroke="#13B8B2" strokeWidth="1" opacity="0.6" />
      <circle cx="88" cy="150" r="5" fill="#13B8B2" />
      <circle cx="470" cy="140" r="5" fill="#18C7C0" />
    </>
  ),
  brain: (
    <>
      <circle cx="280" cy="210" r="96" fill="none" stroke="rgba(19,184,178,0.35)" />
      <circle cx="280" cy="210" r="52" fill="none" stroke="#18C7C0" strokeWidth="1.4" />
      <circle cx="280" cy="210" r="8" fill="#18C7C0" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 280 + Math.cos(rad) * 96;
        const y = 210 + Math.sin(rad) * 96;
        return (
          <g key={angle}>
            <line x1="280" y1="210" x2={x} y2={y} stroke="rgba(24,199,192,0.28)" />
            <circle cx={x} cy={y} r="5" fill={angle % 90 === 0 ? '#13B8B2' : '#FFFFFF'} />
          </g>
        );
      })}
    </>
  ),
  code: (
    <>
      <rect x="64" y="86" width="150" height="248" fill="none" stroke="#13B8B2" />
      <rect x="230" y="86" width="150" height="248" fill="none" stroke="#18C7C0" strokeWidth="1.4" />
      <rect x="396" y="86" width="100" height="248" fill="none" stroke="rgba(19,184,178,0.45)" />
      <line x1="84" y1="128" x2="194" y2="128" stroke="#18C7C0" strokeWidth="6" opacity="0.35" />
      <line x1="250" y1="156" x2="360" y2="156" stroke="#13B8B2" strokeWidth="6" opacity="0.4" />
      <line x1="414" y1="184" x2="476" y2="184" stroke="#18C7C0" strokeWidth="6" opacity="0.25" />
      <circle cx="305" cy="86" r="5" fill="#18C7C0" />
    </>
  ),
  'pen-tool': (
    <>
      <rect x="80" y="90" width="400" height="240" fill="none" stroke="rgba(24,199,192,0.25)" />
      <rect x="108" y="118" width="180" height="120" fill="none" stroke="#13B8B2" />
      <rect x="312" y="150" width="140" height="88" fill="none" stroke="#18C7C0" />
      <circle cx="108" cy="118" r="4" fill="#18C7C0" />
      <circle cx="288" cy="238" r="4" fill="#13B8B2" />
      <path d="M108 300 L220 260 L340 280 L452 220" fill="none" stroke="#13B8B2" strokeWidth="1.3" />
    </>
  ),
  network: (
    <>
      <path d="M90 300 L180 160 L280 220 L390 90 L470 170" fill="none" stroke="#18C7C0" strokeWidth="1.6" />
      <path d="M90 300 L200 250 L320 310 L470 170" fill="none" stroke="rgba(19,184,178,0.4)" />
      <circle cx="90" cy="300" r="7" fill="#0B2855" stroke="#13B8B2" />
      <circle cx="180" cy="160" r="7" fill="#13B8B2" />
      <circle cx="280" cy="220" r="9" fill="#18C7C0" />
      <circle cx="390" cy="90" r="7" fill="#13B8B2" />
      <circle cx="470" cy="170" r="7" fill="#FFFFFF" />
    </>
  ),
  cloud: (
    <>
      <ellipse cx="280" cy="168" rx="110" ry="48" fill="none" stroke="#18C7C0" strokeWidth="1.6" />
      <ellipse cx="280" cy="230" rx="150" ry="36" fill="none" stroke="rgba(19,184,178,0.45)" />
      <ellipse cx="280" cy="286" rx="190" ry="28" fill="none" stroke="rgba(24,199,192,0.22)" />
      <line x1="280" y1="120" x2="280" y2="314" stroke="#13B8B2" strokeDasharray="4 8" />
      <circle cx="280" cy="120" r="6" fill="#18C7C0" />
      <circle cx="190" cy="168" r="4" fill="#13B8B2" />
      <circle cx="370" cy="168" r="4" fill="#13B8B2" />
    </>
  ),
  compass: (
    <>
      <circle cx="280" cy="210" r="108" fill="none" stroke="rgba(24,199,192,0.3)" />
      <circle cx="280" cy="210" r="64" fill="none" stroke="#13B8B2" />
      <path d="M280 118 L304 210 L280 302 L256 210 Z" fill="none" stroke="#18C7C0" strokeWidth="1.5" />
      <circle cx="280" cy="210" r="6" fill="#18C7C0" />
      <circle cx="280" cy="102" r="4" fill="#13B8B2" />
      <circle cx="388" cy="210" r="4" fill="#FFFFFF" />
    </>
  ),
};

export function ServiceVisual({ icon = 'globe' }) {
  return (
    <div className="overflow-hidden border border-white/10">
      <Frame>{visuals[icon] || visuals.globe}</Frame>
    </div>
  );
}
