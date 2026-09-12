import Image from 'next/image';

/**
 * The Containastore logo, per client request: the container-size-comparison
 * graphic from the old site's SiteBuilder export (public/images/logo.jpg —
 * three containers of increasing length, green/blue/grey). Native size
 * 1124×308; rendered small and paired with the wordmark.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/logo.jpg"
      alt=""
      width={1124}
      height={308}
      priority
      className={className}
    />
  );
}
