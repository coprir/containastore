/**
 * FAQ. SOURCE OF TRUTH — these eight questions only, spelling corrected, meaning
 * unchanged from the live site. Do not add new questions or answers.
 *
 * `answer` is plain text; render paragraphs by splitting on "\n\n".
 * Some answers pull shared data (areas served, payment terms) so there is one copy.
 */
import { site } from './site';
import { rentalTerms } from './units';

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: 'where-are-you-based',
    question: 'Where are you based?',
    answer:
      'We are on secure premises near Inkberrow, easily accessible from M40 Junction 6 and the A422. Initial site visits are by appointment during our operating hours, 6:30am to 9pm — get in touch if that is not convenient and we will do our best to help. Our operating hours are 6:30am to 9pm, but access to your own container is 24 hours a day.',
  },
  {
    id: 'what-size-containers',
    question: 'What size containers do you rent?',
    answer:
      'All our containers are 8ft wide and 8ft 6in high. As a guide, a 20ft container holds an average three bedroom house with garden furniture. See each storage page for exact internal and external dimensions.',
  },
  {
    id: 'who-locks-the-container',
    question: 'Who locks the container?',
    answer:
      'You do. A heavy duty lock is provided free against a £30 deposit, which is refunded when the lock is returned and the container is fully vacated. Every container has a hardened steel lockbox that our locks fit into, and you are welcome to add your own padlocks as well.',
  },
  {
    id: 'rental-costs-and-terms',
    question: 'What are the rental costs and terms?',
    answer:
      "The first month's payment is made on the day your goods go into stores, then billed monthly until you vacate. The minimum term is one month and there is no notice period.",
  },
  {
    id: 'what-areas-do-you-cover',
    question: 'What areas do you cover?',
    answer: `We regularly help customers across Worcestershire and the wider West Midlands, including ${site.areasServed.join(
      ', ',
    )}.`,
  },
  {
    id: 'part-of-the-period',
    question: 'What if I only need it for part of the period I have paid for?',
    answer:
      "A month's notice is not always possible, especially in the middle of a house purchase. Our prices are competitive and keeping things simple is part of how we keep them down.",
  },
  {
    id: 'how-can-i-pay',
    question: 'How can I pay?',
    answer: `${rentalTerms.firstPayment} ${rentalTerms.ongoingPayment}`,
  },
  {
    id: 'move-things-in',
    question: 'How can I move things into my container?',
    answer:
      'You can hire a van, use your own car, or use a removals company. Get in touch if you would like a quote for removals, man and van, or self-drive hire.',
  },
];
