import Link from 'next/link';
import type { SiteContent } from '@content/site';
import { contactEmail } from '@content/site';
import { Container } from '@/components/ui/Container';

export function Footer({ site }: { site: SiteContent }) {
  const email = contactEmail();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-steel py-12 text-sm">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-heading text-base font-extrabold text-paper">
              CONTAINASTORE
            </p>
            <p className="stencil mt-1 text-[10px] text-accent">Self Access Storage</p>
            <p className="mt-3 text-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Footer — pages">
            <p className="mb-2 font-semibold text-paper">Pages</p>
            <ul className="space-y-1 text-muted">
              <li><Link href="/storage" className="hover:text-paper">Storage &amp; prices</Link></li>
              <li><Link href="/conversions" className="hover:text-paper">Conversions</Link></li>
              <li><Link href="/about" className="hover:text-paper">About</Link></li>
              <li><Link href="/faq" className="hover:text-paper">FAQ</Link></li>
              <li><Link href="/hints-and-tips" className="hover:text-paper">Hints &amp; tips</Link></li>
              <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Footer — legal">
            <p className="mb-2 font-semibold text-paper">Legal</p>
            <ul className="space-y-1 text-muted">
              <li><Link href="/privacy" className="hover:text-paper">Privacy policy</Link></li>
              <li><Link href="/cookies" className="hover:text-paper">Cookie policy</Link></li>
            </ul>
          </nav>

          <div>
            <p className="mb-2 font-semibold text-paper">Contact</p>
            <address className="not-italic text-muted">
              {site.address.line1}
              <br />
              {site.address.locality}
              <br />
              {site.address.city} {site.address.postcode}
              <br />
              <a href={site.phone.href} className="mt-2 inline-block font-mono text-paper hover:text-accent">
                {site.phone.display}
              </a>
              <br />
              <a href={`mailto:${email}`} className="hover:text-paper">
                {email}
              </a>
            </address>
            <p className="mt-3 text-muted">Enquiries {site.hours.enquiries}</p>
            <div className="mt-3 flex gap-3">
              <a href={site.social.facebook} className="hover:text-paper" rel="noopener noreferrer" target="_blank">
                Facebook
              </a>
              <a href={site.social.twitter} className="hover:text-paper" rel="noopener noreferrer" target="_blank">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs text-muted">
          <p>
            &copy; {year} {site.legalName}. Access is {site.hours.access.toLowerCase()}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
