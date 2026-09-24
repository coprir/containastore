import Image from 'next/image';
import { EnquiryForm } from '@/components/EnquiryForm';
import type { SiteContent } from '@content/site';

/**
 * Home hero, laid out as in the client's design (slide 2): a slate
 * "Book a container" panel on the left, and the container-yard photo under an
 * ivory wash with the intro copy on the right.
 */
export function Hero({
  site,
  heading,
  sub,
  areas,
  sizeOptions,
  email,
}: {
  site: SiteContent;
  heading: string;
  sub: string;
  areas: string;
  sizeOptions: { value: string; label: string }[];
  email: string;
}) {
  return (
    <div className="bg-ink">
      <div className="container-x grid gap-6 py-8 lg:grid-cols-[5fr_7fr] lg:py-10">
        <section
          aria-labelledby="book-h"
          className="band-scope rounded-sm border-2 border-black/40 bg-band p-6 text-on-band sm:p-8"
        >
          <h2 id="book-h" className="text-center font-heading text-3xl font-bold sm:text-4xl">
            Book a container
          </h2>
          <p className="mx-auto mt-4 mb-6 max-w-sm text-center text-sm">
            Please complete the form and we will get back to you.
            <br />
            (Please check your spam/junk)
          </p>
          <EnquiryForm
            sizeOptions={sizeOptions}
            phoneDisplay={site.phone.display}
            phoneHref={site.phone.href}
            email={email}
          />
        </section>

        <section className="relative isolate min-h-[420px] overflow-hidden rounded-sm border border-line">
          <Image
            src="/images/container-yard.jpg"
            alt="A row of blue self access storage containers on a gravel yard"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[#fffff0]/70" aria-hidden="true" />
          <div className="flex h-full flex-col justify-center p-6 text-[#111318] sm:p-10">
            <h1 className="text-center font-heading text-3xl font-bold sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-6 text-lg font-medium leading-snug sm:text-2xl">{sub}</p>
            <p className="mt-4 text-lg font-medium leading-snug sm:text-2xl">{areas}</p>
            <p className="mt-4 text-lg font-medium leading-snug sm:text-2xl">
              Phone for a chat or email your requirements and we&apos;ll get back to you
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
