/**
 * Editorial copy for individual pages. SOURCE OF TRUTH.
 * All wording is drawn from the live site; nothing here invents a business fact.
 */

export const homeCopy = {
  hero: {
    heading: 'Your local self access storage',
    // "from £80" — see DISCREPANCIES.md (hero says £80, meta says £75; £80 is the
    // cheapest confirmed unit, so £80 is used everywhere).
    sub: 'Secure shipping container storage near Inkberrow, Worcestershire. Drive to your door, 24 hour access once you are allocated a container, and a simple monthly rate with no notice period.',
  },
  pillars: [
    {
      title: 'Genuinely secure',
      body: 'Heavy duty lockboxes welded to the doors, 24 hour remotely monitored CCTV over the yard, security lighting, and people on site day and night.',
    },
    {
      title: '24 hour access',
      body: 'Once your container is allocated you can come and go 24 hours a day. Drive right up to the doors and load straight from your vehicle.',
    },
    {
      title: 'Simple monthly terms',
      body: 'Charged one month in advance from the day you move in. Minimum one month, no notice period, no card needed — cash, bank transfer or standing order.',
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: 'Get in touch',
      body: 'Call or send an enquiry with the size you think you need. We will talk it through and, if you would like, arrange a site visit by appointment during enquiry hours.',
    },
    {
      step: 2,
      title: 'Reserve your container',
      body: 'We allocate you a container and you sign a short rental agreement. The first month is paid on move-in day by cash or pre-arranged bank transfer.',
    },
    {
      step: 3,
      title: 'Move in and get your keys',
      body: 'Collect a heavy duty lock (free against a £30 refundable deposit), load your container, and lock up. From then on you have 24 hour access.',
    },
  ],
  conversionsTeaser: {
    heading: 'Container conversions',
    body: 'We also weld on lock boxes — for our own yard and for other storage businesses and container owners.',
  },
  finalCta: {
    heading: 'Ready to talk it through?',
    body: 'Tell us roughly what you need to store and we will help you pick the right size.',
  },
};

export const aboutCopy = {
  heading: 'About Containastore',
  intro: [
    'Containastore Self Access Storage is a shipping container storage yard on secure premises near Inkberrow, Worcestershire, easily accessible from M40 Junction 6 and the A422.',
    'We rent clean, ventilated steel containers by the month with a welded steel lockbox on every door. Once you are allocated a container you have access 24 hours a day — you drive to your door and load straight from your vehicle.',
  ],
  whyUs: [
    {
      title: 'Drive-up access',
      body: 'No lifts, no corridors, no trolleys. Park at your container and load directly.',
    },
    {
      title: 'Watched over',
      body: 'Remotely monitored CCTV covers the yard around the clock, backed by security lighting and people on site day and night.',
    },
    {
      title: 'No long tie-in',
      body: 'One month minimum, no notice period, and a rate that is fixed monthly in advance.',
    },
  ],
  // Flagged discrepancy: About does not mention the weekly refund that the 40ft
  // and contact pages do. We surface it site-wide, flagged. See DISCREPANCIES.md.
  refundNote:
    'If you leave before the end of a paid month, unused complete weeks may be refunded. Please confirm the current terms when you enquire.',
};

export interface TipGroup {
  title: string;
  intro?: string;
  tips: string[];
}

export const hintsAndTips: { heading: string; intro: string; groups: TipGroup[] } = {
  heading: 'Hints and tips',
  intro:
    'A few things we have learned over the years about choosing storage, packing well, and loading a container so everything survives the stay.',
  groups: [
    {
      title: 'Choosing a storage company',
      tips: [
        'Compare the whole cost of a unit, not the headline price.',
        'Watch for insurance you are forced to buy on top of the rent.',
        'Think about how often you will actually need to visit, and how easy access is.',
        'Be wary of free periods that are tied to a minimum stay and a particular unit size.',
      ],
    },
    {
      title: 'Boxes and packing',
      tips: [
        'We usually have used boxes available — ask.',
        'Sticking to one box size makes everything stack better.',
        'Buy bubble wrap off the roll rather than in small packs.',
        'Put heavy items at the bottom of each box.',
        'Fill boxes completely so they do not crush when stacked.',
        'Use a good vinyl packing tape.',
        'Label everything, on more than one side.',
        'Pack plates on their side, not flat.',
        'Wrap the limbs of figurines and ornaments individually.',
        'Free-standing shelves inside the container add usable capacity.',
      ],
    },
    {
      title: 'Stacking the container',
      tips: [
        'Distribute weight evenly across the floor.',
        'Heavy low, light high, with the heaviest items near the door and along the sides.',
        'Put blankets over furniture to protect it.',
        'Use drawers to hold soft items.',
        'Keep a clear walkway so you can reach things later.',
        'Wear suitable footwear, keep trip hazards clear, and keep children and animals away from the loading area.',
      ],
    },
    {
      title: 'Transport',
      tips: [
        'Do not overload your vehicle.',
        'Stack roof racks sensibly and secure the load.',
        'Ask us for a removals quote if you would rather not do the driving.',
      ],
    },
  ],
};
