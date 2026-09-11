import type { Metadata } from 'next';
import { env } from './env';

const SITE_NAME = 'Containastore';
const DEFAULT_DESCRIPTION =
  'Secure shipping container self storage near Inkberrow, Worcestershire. Drive-up access, 24 hour access once allocated, simple monthly terms from £80 a month.';

interface PageMetaInput {
  title: string; // page title without the site-name suffix
  description: string;
  path: string; // e.g. "/storage/20ft-storage"
  /** Set false for utility pages that should not be indexed. */
  index?: boolean;
}

export function pageMeta({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const url = `${env.siteUrl}${path === '/' ? '' : path}`;
  const fullTitle =
    path === '/'
      ? `${SITE_NAME} — Your local self access storage`
      : `${title} | ${SITE_NAME}`;

  return {
    // `absolute` bypasses the layout's "%s | Containastore" template — the
    // suffix is already baked into fullTitle where wanted.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: '@ContainastoreUK',
    },
  };
}

export const defaults = { SITE_NAME, DEFAULT_DESCRIPTION };
