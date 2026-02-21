interface LogoProps {
  variant?: 'header' | 'footer';
  color?: 'navy' | 'ivory';
}

export default function Logo({ variant = 'header', color = 'navy' }: LogoProps) {
  const isNavy = color === 'navy';
  const textColor = isNavy ? '#0E1A2B' : '#F4F1EA';
  const accentColor = '#B89C5E';

  if (variant === 'header') {
    // Compact horizontal header version - enlarged for premium presence
    return (
      <div className="flex items-center gap-3.5">
        {/* Geometric Icon: Vertical line + arc - 30% larger */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
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

        {/* Wordmark: Clarté Digital - larger text sizes */}
        <div className="flex flex-col items-start leading-tight">
          <span
            className="font-sans font-bold text-lg lg:text-xl tracking-tight"
            style={{ color: textColor, letterSpacing: '-0.01em' }}
          >
            Clarté
          </span>
          <span
            className="font-sans font-medium text-xs tracking-widest"
            style={{ color: textColor, letterSpacing: '0.05em', opacity: 0.65 }}
          >
            Digital
          </span>
        </div>
      </div>
    );
  }

  // Footer version - larger and more prominent
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Full Logo */}
      <div className="flex items-center gap-3">
        {/* Geometric Icon: Vertical line + arc (larger) */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          {/* Vertical gold line */}
          <line x1="10" y1="2" x2="10" y2="18" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          {/* Subtle circular arc */}
          <path
            d="M 10 10 Q 16 10 16 4"
            stroke={textColor}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Wordmark */}
        <div className="flex flex-col items-start leading-tight">
          <span
            className="font-sans font-semibold text-2xl tracking-tight"
            style={{ color: textColor, letterSpacing: '-0.01em' }}
          >
            Clarté
          </span>
          <span
            className="font-sans font-medium text-sm tracking-wide"
            style={{ color: textColor, letterSpacing: '0.04em', opacity: 0.7 }}
          >
            Digital
          </span>
        </div>
      </div>

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
