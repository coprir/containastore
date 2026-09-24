import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { getSite, contactEmail } from '@/lib/content';
import { FeatureBand } from '@/components/layout/FeatureBand';
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
      <Header site={site} email={contactEmail()} />
      <main id="main">{children}</main>
      <FeatureBand />
      <Footer site={site} />
    </>
  );
}
