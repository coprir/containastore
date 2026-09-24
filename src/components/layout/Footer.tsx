import Link from 'next/link';
import type { SiteContent } from '@content/site';
import { contactEmail } from '@content/site';
import { Container } from '@/components/ui/Container';
import { LogoMark } from '@/components/ui/Logo';

export function Footer({ site }: { site: SiteContent }) {
  const email = contactEmail();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-band py-10 text-sm text-on-band">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <span className="inline-block rounded-sm bg-white p-1"><LogoMark className="h-8 w-auto" /></span>
            <p className="mt-2 font-heading text-base font-extrabold text-on-band">
              CONTAINASTORE
            </p>
            <p className="stencil mt-1 text-[10px] text-band-accent">Self Access Storage</p>
            <p className="mt-3 text-on-band/85">{site.tagline}</p>
          </div>

          <nav aria-label="Footer — pages">
            <p className="mb-2 font-semibold text-on-band">Pages</p>
            <ul className="space-y-1 text-on-band/85">
              <li><Link href="/storage" className="hover:text-on-band">Storage &amp; prices</Link></li>
              <li><Link href="/about" className="hover:text-on-band">About</Link></li>
              <li><Link href="/faq" className="hover:text-on-band">FAQ</Link></li>
              <li><Link href="/hints-and-tips" className="hover:text-on-band">Hints &amp; tips</Link></li>
              <li><Link href="/contact" className="hover:text-on-band">Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Footer — legal">
            <p className="mb-2 font-semibold text-on-band">Legal</p>
            <ul className="space-y-1 text-on-band/85">
              <li><Link href="/cookies" className="hover:text-on-band">Cookie policy</Link></li>
            </ul>
          </nav>

          <div>
            <p className="mb-2 font-semibold text-on-band">Contact</p>
            <address className="not-italic text-on-band/85">
              {site.address.line1}
              <br />
              {site.address.locality}
              <br />
              {site.address.city} {site.address.postcode}
              <br />
              <a href={site.phone.href} className="mt-2 inline-block font-mono text-on-band hover:text-band-accent">
                {site.phone.display}
              </a>
              <br />
              <a href={`mailto:${email}`} className="hover:text-on-band">
                {email}
              </a>
            </address>
            <p className="mt-3 text-on-band/85">Operating hours {site.hours.enquiries}</p>
            <div className="mt-3 flex gap-3">
              <a href={site.social.facebook} className="hover:text-on-band" rel="noopener noreferrer" target="_blank">
                Facebook
              </a>
              <a href={site.social.twitter} className="hover:text-on-band" rel="noopener noreferrer" target="_blank">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-on-band/25 pt-6 text-xs text-on-band/85">
          <p>
            &copy; {year} {site.legalName}. Access is {site.hours.access.toLowerCase()}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
