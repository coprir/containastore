/** Stencilled ISO-marking-style size code, e.g. "20FT · 160 SQ FT". */
export function SizeCode({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span className={`stencil inline-block text-xs text-accent ${className}`}>{code}</span>
  );
}
