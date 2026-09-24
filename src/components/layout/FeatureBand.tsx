import Image from 'next/image';

/**
 * The three-column band from the client's design (slide 3), shown at the
 * bottom of every page, directly above the footer. Copy is the client's own
 * wording from the deck.
 */
const items = [
  {
    icon: '/images/icon-container.png',
    title: 'Storage Containers',
    body: 'From 10ft to 40ft, we have space for anything you may need to store',
  },
  {
    icon: '/images/icon-pound.png',
    title: 'The Costs?',
    body: 'We keep our pricing as simple with no hidden charges.',
  },
  {
    icon: '/images/icon-lock.png',
    title: 'Secure',
    body: 'Heavy duty lockboxes and 24 hour remotely monitored CCTV, along with security lighting.',
  },
];

export function FeatureBand() {
  return (
    <section
      aria-label="Why choose Containastore"
      className="border-y-2 border-black/40 bg-band text-on-band"
    >
      <div className="container-x grid gap-10 py-12 md:grid-cols-3 md:gap-6 md:py-16">
        {items.map((it) => (
          <div
            key={it.title}
            className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-center"
          >
            <Image
              src={it.icon}
              alt=""
              width={80}
              height={80}
              className="h-16 w-16 shrink-0 md:h-20 md:w-20"
            />
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-bold">{it.title}</h2>
              <p className="mx-auto mt-3 max-w-xs text-base leading-snug">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
