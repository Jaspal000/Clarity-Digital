interface LogoProps {
  variant?: 'header' | 'footer';
  color?: 'navy' | 'ivory';
}

export default function Logo({ variant = 'header', color = 'navy' }: LogoProps) {
  const isHeader = variant === 'header';
  const isNavy = color === 'navy';

  const textColor = isNavy ? '#0E1A2B' : '#F4F1EA';
  const accentColor = '#B89C5E';
  const lightTextColor = isNavy ? 'rgba(14, 26, 43, 0.7)' : 'rgba(244, 241, 234, 0.7)';

  if (isHeader) {
    // Compact header version
    return (
      <div className="flex items-baseline gap-0.5">
        {/* CLARTÉ */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-0.5"
        >
          {/* Letter C with subtle geometric foundation */}
          <text
            x="50"
            y="70"
            fontSize="72"
            fontFamily="'Inter', 'Helvetica', sans-serif"
            fontWeight="700"
            letterSpacing="-2"
            textAnchor="middle"
            fill={textColor}
          >
            C
          </text>
        </svg>

        {/* LARTÉ text */}
        <span
          className="font-sans font-bold text-lg lg:text-xl tracking-tight"
          style={{ color: textColor, letterSpacing: '-0.02em' }}
        >
          LARTÉ
        </span>

        {/* DIGITAL in light weight below */}
        <div className="absolute ml-0.5 mt-7">
          <span
            className="font-sans font-light text-xs lg:text-sm tracking-wide"
            style={{ color: lightTextColor, letterSpacing: '0.08em' }}
          >
            DIGITAL
          </span>
        </div>
      </div>
    );
  }

  // Footer version - larger and more prominent
  return (
    <div className="flex flex-col items-start gap-3">
      {/* CLARTÉ DIGITAL full logo */}
      <div className="flex items-baseline gap-1">
        {/* Stylized C + LARTÉ */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1"
        >
          {/* Letter C */}
          <text
            x="50"
            y="70"
            fontSize="80"
            fontFamily="'Inter', 'Helvetica', sans-serif"
            fontWeight="700"
            letterSpacing="-2"
            textAnchor="middle"
            fill={textColor}
          >
            C
          </text>
        </svg>

        <div className="flex flex-col">
          <span
            className="font-sans font-bold text-2xl leading-tight"
            style={{ color: textColor, letterSpacing: '-0.02em' }}
          >
            LARTÉ
          </span>
          <span
            className="font-sans font-light text-sm tracking-widest"
            style={{ color: lightTextColor, letterSpacing: '0.1em' }}
          >
            DIGITAL
          </span>
        </div>
      </div>

      {/* Tagline under footer logo */}
      <div className="pt-2">
        <p
          className="font-sans text-xs tracking-wide"
          style={{ color: accentColor, letterSpacing: '0.05em' }}
        >
          Clarté dans la stratégie.
        </p>
        <p
          className="font-sans text-xs tracking-wide"
          style={{ color: accentColor, letterSpacing: '0.05em' }}
        >
          Impact dans la visibilité.
        </p>
      </div>
    </div>
  );
}
