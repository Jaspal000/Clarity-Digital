interface LogoProps {
  variant?: 'header' | 'footer';
  color?: 'navy' | 'ivory';
}

/**
 * Shared logo mark used identically in both header and footer.
 * Same SVG size, same font sizes, same font weights, same spacing.
 */
function LogoMark({ textColor, accentColor }: { textColor: string; accentColor: string }) {
  return (
    <div className="flex items-center gap-3.5">
      {/* Geometric Icon: Vertical line + arc — 32px mobile, 40px desktop */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px]"
      >
        {/* Vertical gold line */}
        <line x1="10" y1="2" x2="10" y2="18" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Subtle circular arc (quarter circle) */}
        <path
          d="M 10 10 Q 16 10 16 4"
          stroke={textColor}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark: Clarte Digital */}
      <div className="flex flex-col items-start leading-tight">
        <span
          className="font-sans text-[20px] lg:text-[24px]"
          style={{ color: textColor, letterSpacing: '-0.01em', fontWeight: 600 }}
        >
          Clarte
        </span>
        <span
          className="font-sans text-[13px] lg:text-[15px] tracking-wide"
          style={{ color: textColor, letterSpacing: '0.04em', opacity: 0.65, fontWeight: 450 }}
        >
          Digital
        </span>
      </div>
    </div>
  );
}

export default function Logo({ variant = 'header', color = 'navy' }: LogoProps) {
  const isNavy = color === 'navy';
  const textColor = isNavy ? '#0E1A2B' : '#F4F1EA';
  const accentColor = '#B89C5E';

  if (variant === 'header') {
    return <LogoMark textColor={textColor} accentColor={accentColor} />;
  }

  // Footer version - same logo mark + tagline below
  return (
    <div className="flex flex-col items-start gap-4">
      <LogoMark textColor={textColor} accentColor={accentColor} />

      {/* Tagline under footer logo */}
      <div className="pt-2 border-t border-gold/20">
        <p
          className="font-sans text-xs tracking-wide leading-relaxed"
          style={{ color: accentColor, letterSpacing: '0.03em' }}
        >
          Clarté dans la stratégie.
          <br />
          Impact dans la visibilité.
        </p>
      </div>
    </div>
  );
}
