/** Decorative creative-studio scene: softbox light, camera on a tripod, and a clapperboard. */
export function StudioIllustration({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 240"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* floor */}
      <ellipse cx="180" cy="216" rx="152" ry="14" className="fill-muted" />

      {/* softbox light on a stand */}
      <path d="M70 104V210M70 192L48 214M70 192L92 214" className="stroke-muted-foreground" strokeWidth="3" />
      <rect x="38" y="50" width="64" height="54" rx="6" className="fill-primary/20 stroke-primary" strokeWidth="3" />
      <path d="M38 77H102M70 50V104" className="stroke-primary/60" strokeWidth="2" />
      <path d="M112 62L134 54M114 78H138M112 94L134 102" className="stroke-primary" strokeWidth="3" />

      {/* camera on a tripod */}
      <path
        d="M190 150V164M190 164L160 214M190 164V214M190 164L220 214"
        className="stroke-muted-foreground"
        strokeWidth="3"
      />
      <rect x="170" y="92" width="22" height="10" rx="3" className="fill-card stroke-foreground" strokeWidth="3" />
      <rect x="158" y="100" width="64" height="50" rx="8" className="fill-card stroke-foreground" strokeWidth="3" />
      <circle cx="190" cy="125" r="17" className="fill-muted stroke-foreground" strokeWidth="3" />
      <circle cx="190" cy="125" r="7" className="fill-primary" />
      <circle cx="212" cy="110" r="3" className="fill-primary" />

      {/* clapperboard */}
      <rect x="240" y="136" width="84" height="62" rx="6" className="fill-card stroke-foreground" strokeWidth="3" />
      <g transform="rotate(-12 240 136)">
        <rect x="240" y="116" width="84" height="20" rx="4" className="fill-foreground" />
        <path d="M254 116V136M274 116V136M294 116V136M314 116V136" className="stroke-background" strokeWidth="5" />
      </g>
      <text x="282" y="180" textAnchor="middle" fontSize="26" fontWeight="800" className="fill-primary font-heading">
        404
      </text>
    </svg>
  );
}
