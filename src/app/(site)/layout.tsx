import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { getSite } from '@/lib/content';
import { localBusinessSchema } from '@/lib/schema';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema(site)),
        }}
      />
      <SkipLink />
      <Header site={site} />
      <main id="main">{children}</main>
      <Footer site={site} />
    </>
  );
}
