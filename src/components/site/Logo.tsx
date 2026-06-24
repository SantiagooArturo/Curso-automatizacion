interface LogoProps {
  width?: number;
  className?: string;
}

export default function Logo({ width = 220, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 220 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width={width}
      className={className}
    >
      <g>
        {/* Globe icon */}
        <circle cx="25" cy="25" r="20" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <ellipse cx="25" cy="25" rx="20" ry="8" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <ellipse cx="25" cy="25" rx="8" ry="20" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <line x1="5" y1="25" x2="45" y2="25" stroke="#ffffff" strokeWidth="2.2" />
        <line x1="25" y1="5" x2="25" y2="45" stroke="#ffffff" strokeWidth="2.2" />
        {/* Diagonal swoosh */}
        <path d="M5 41 L45 9" stroke="#28d4ff" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <text
        x="58"
        y="34"
        fill="#ffffff"
        fontFamily="Mulish, sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="-0.6"
      >
        cineplanet
      </text>
    </svg>
  );
}
