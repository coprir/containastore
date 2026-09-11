/**
 * Technical side-elevation illustration of a shipping container, drawn from the
 * palette tokens so it reads as part of the design system rather than a stock
 * photo. Not a photograph of the real yard — deliberately a diagram.
 *
 * `ratio` sets the body length (height is fixed) so an 8ft and a 40ft look
 * proportionally different. `doors` picks single- or double-leaf cargo doors.
 */
interface ContainerFigureProps {
  /** Body length ÷ body height. ~1.05 for 8ft up to ~5 for 40ft. */
  ratio: number;
  doors: 'single' | 'double';
  /** Stencilled code, e.g. "20FT · 160 SQ FT". */
  code?: string;
  label: string; // accessible description
  className?: string;
}

export function ContainerFigure({
  ratio,
  doors,
  code,
  label,
  className = '',
}: ContainerFigureProps) {
  const H = 120; // body height in view units
  const bodyW = Math.round(H * ratio);
  const pad = 16;
  const W = bodyW + pad * 2;
  const totalH = H + pad * 2 + 14; // room for shadow + baseline

  // Corrugation ribs across the body
  const ribGap = 12;
  const ribs: number[] = [];
  for (let x = pad + 10; x < pad + bodyW - 10; x += ribGap) ribs.push(x);

  // Door panel on the right-hand end
  const doorW = Math.min(46, bodyW * 0.28);
  const doorX = pad + bodyW - doorW;

  return (
    <svg
      viewBox={`0 0 ${W} ${totalH}`}
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ground shadow */}
      <ellipse
        cx={W / 2}
        cy={pad + H + 8}
        rx={bodyW / 2}
        ry={5}
        fill="rgba(0,0,0,0.35)"
      />

      {/* body */}
      <rect
        x={pad}
        y={pad}
        width={bodyW}
        height={H}
        rx={4}
        fill="var(--panel-2)"
        stroke="var(--line-strong)"
        strokeWidth={2}
      />

      {/* top rail + bottom rail */}
      <rect x={pad} y={pad} width={bodyW} height={9} fill="var(--panel)" />
      <rect x={pad} y={pad + H - 9} width={bodyW} height={9} fill="var(--panel)" />

      {/* corrugation ribs */}
      <g stroke="var(--line)" strokeWidth={2} opacity={0.9}>
        {ribs.map((x) => (
          <line key={x} x1={x} y1={pad + 11} x2={x} y2={pad + H - 11} />
        ))}
      </g>
      <g stroke="rgba(255,255,255,0.05)" strokeWidth={2}>
        {ribs.map((x) => (
          <line key={`h-${x}`} x1={x + 2} y1={pad + 11} x2={x + 2} y2={pad + H - 11} />
        ))}
      </g>

      {/* corner castings */}
      {[
        [pad, pad],
        [pad + bodyW - 12, pad],
        [pad, pad + H - 12],
        [pad + bodyW - 12, pad + H - 12],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={12} height={12} fill="var(--panel)" stroke="var(--line-strong)" strokeWidth={1.5} />
      ))}

      {/* cargo doors */}
      <rect
        x={doorX}
        y={pad + 2}
        width={doorW}
        height={H - 4}
        fill="var(--panel)"
        stroke="var(--line-strong)"
        strokeWidth={2}
      />
      {/* locking bars */}
      {(doors === 'double'
        ? [doorX + doorW * 0.3, doorX + doorW * 0.5, doorX + doorW * 0.7]
        : [doorX + doorW * 0.38, doorX + doorW * 0.62]
      ).map((x, i) => (
        <g key={i}>
          <line x1={x} y1={pad + 8} x2={x} y2={pad + H - 8} stroke="var(--accent)" strokeWidth={2.5} />
          <circle cx={x} cy={pad + H * 0.5} r={3.5} fill="var(--accent)" />
        </g>
      ))}
      {doors === 'double' ? (
        <line
          x1={doorX + doorW / 2}
          y1={pad + 2}
          x2={doorX + doorW / 2}
          y2={pad + H - 2}
          stroke="var(--line-strong)"
          strokeWidth={2}
        />
      ) : null}

      {/* welded lockbox */}
      <rect
        x={doorX - 3}
        y={pad + H * 0.5 - 9}
        width={16}
        height={18}
        rx={2}
        fill="var(--ink)"
        stroke="var(--accent)"
        strokeWidth={2}
      />

      {/* stencilled code */}
      {code ? (
        <text
          x={pad + 14}
          y={pad + H * 0.5 + 4}
          fill="var(--accent)"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize={12}
          letterSpacing="1.5"
          style={{ fontWeight: 600 }}
        >
          {code}
        </text>
      ) : null}
    </svg>
  );
}

/** Map a unit size string to a sensible length:height ratio for the figure. */
export function ratioForSize(size: string): number {
  const n = parseInt(size, 10);
  if (!Number.isFinite(n)) return 2.2;
  // 8ft ≈ 1.05, scales ~linearly to 40ft ≈ 5.0
  return Math.max(1.05, Math.min(5, 0.95 + (n / 40) * 4));
}
