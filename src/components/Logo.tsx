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
    <div className="flex items-center gap-3">
      {/* Geometric Icon: Vertical line + arc */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 w-[30px] h-[30px] lg:w-[36px] lg:h-[36px]"
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

      {/* Wordmark: Clarté Digital */}
      <div className="flex flex-col items-start leading-tight">
        <span
          className="font-sans text-[19px] lg:text-[22px]"
          style={{ color: textColor, letterSpacing: '-0.01em', fontWeight: 620 }}
        >
          Clarté
        </span>
        <span
          className="font-sans font-normal text-[13px] lg:text-[15px] tracking-wide"
          style={{ color: textColor, letterSpacing: '0.04em', opacity: 0.7, fontWeight: 450 }}
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
