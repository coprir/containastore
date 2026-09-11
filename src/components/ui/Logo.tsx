import Image from 'next/image';

/**
 * The real Containastore logo mark, recovered from the old site's SiteBuilder
 * export (public/images/logo-mark.png — three stacked container roofs). Native
 * size 262×97; rendered small and paired with the wordmark.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/logo-mark.png"
      alt=""
      width={262}
      height={97}
      priority
      className={className}
    />
  );
}
