import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Legacy URLs from the old Netcetera Site Builder site. Every entry is either
 * live on containastore.co.uk today or a plausible indexed variant. They carry
 * the site's existing search ranking, so all are 301 (Moved Permanently) — an
 * explicit statusCode, not Next's default `permanent: true` which emits 308.
 *
 * The odd `...html` suffixes with no dot are deliberate: the Site Builder used
 * extension-less paths that ended in a literal "html" (e.g. /about-ushtml).
 */
const legacyPairs = [
  // Canonical odd forms seen on the live site
  ['/about-ushtml', '/about'],
  ['/storage-faqhtml', '/faq'],
  ['/storage-containershtml', '/storage'],
  ['/contact-ushtml', '/contact'],
  ['/hints-and-tipshtml', '/hints-and-tips'],
  ['/conversions-condensationhtml', '/conversions'],

  // Size-page legacy slugs
  ['/10ft-storage-container', '/storage/10ft-storage'],
  ['/20ft-Self-Storage-Container', '/storage/20ft-storage'],
  ['/40ft-storage-container', '/storage/40ft-storage'],

  // .html / lowercase / hyphenated variants of the section pages
  ['/about-us', '/about'],
  ['/about-us.html', '/about'],
  ['/about.html', '/about'],
  ['/storage-faq', '/faq'],
  ['/storage-faq.html', '/faq'],
  ['/faq.html', '/faq'],
  ['/storage-containers', '/storage'],
  ['/storage-containers.html', '/storage'],
  ['/storage.html', '/storage'],
  ['/contact-us', '/contact'],
  ['/contact-us.html', '/contact'],
  ['/contact.html', '/contact'],
  ['/conversions-condensation', '/conversions'],
  ['/conversions-condensation.html', '/conversions'],
  ['/conversions.html', '/conversions'],
  ['/hints-and-tips.html', '/hints-and-tips'],

  // Size pages: legacy container slugs + .html forms
  ['/8ft-storage-container', '/storage/8ft-storage'],
  ['/8ft-storage-container.html', '/storage/8ft-storage'],
  ['/10ft-storage-container.html', '/storage/10ft-storage'],
  ['/12ft-storage-container', '/storage/12ft-storage'],
  ['/12ft-storage-container.html', '/storage/12ft-storage'],
  ['/20ft-storage-container', '/storage/20ft-storage'],
  ['/20ft-storage-container.html', '/storage/20ft-storage'],
  ['/20ft-self-storage-container', '/storage/20ft-storage'],
  ['/20ft-Self-Storage-Container.html', '/storage/20ft-storage'],
  ['/40ft-storage-container.html', '/storage/40ft-storage'],
  ['/8ft-storage.html', '/storage/8ft-storage'],
  ['/10ft-storage.html', '/storage/10ft-storage'],
  ['/12ft-storage.html', '/storage/12ft-storage'],
  ['/20ft-storage.html', '/storage/20ft-storage'],
  ['/40ft-storage.html', '/storage/40ft-storage'],

  // Old home / index variants
  ['/index.html', '/'],
  ['/home', '/'],
  ['/homehtml', '/'],
];

const legacyRedirects = legacyPairs.map(([source, destination]) => ({
  source,
  destination,
  statusCode: 301,
}));

// Canonical host is the WWW subdomain — see DISCREPANCIES.md "Canonical host".
// The bare apex is configured in Vercel's Domains panel to redirect into this
// host at the edge (before it ever reaches this app), so this in-app redirect
// is a fallback for any deploy target that doesn't do that redirect itself.
const canonicalHost = process.env.CANONICAL_HOST || 'www.containastore.co.uk';
const bareHost = canonicalHost.replace(/^www\./, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The home directory contains an unrelated package-lock.json; pin the trace root.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      ...legacyRedirects,
      // Force the bare apex host onto the canonical www origin (301).
      {
        source: '/:path*',
        has: [{ type: 'host', value: bareHost }],
        destination: `https://${canonicalHost}/:path*`,
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
