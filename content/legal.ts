/**
 * Privacy policy and cookie policy — DRAFTS.
 *
 * These are drafts to be reviewed by the client and, ideally, a solicitor or the
 * client's accountant/DPO before launch. They are not legal advice.
 *
 * Every fact only the client can supply is written in [SQUARE BRACKETS] and is
 * rendered with a visible "unfinished" style on the page (see LegalDocument.tsx).
 * Do not fill these in with guesses.
 */

export interface LegalBlock {
  type: 'p' | 'ul';
  text?: string;
  items?: string[];
}

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  updated: string; // placeholder token
  disclaimer: string;
  sections: LegalSection[];
}

const DISCLAIMER =
  'This document is a draft. It has not yet been reviewed by a legal adviser and does not constitute legal advice. It must be checked and completed before the website goes live.';

export const privacyPolicy: LegalDocument = {
  title: 'Privacy policy',
  updated: '[DATE OF PUBLICATION]',
  disclaimer: DISCLAIMER,
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who we are',
      blocks: [
        {
          type: 'p',
          text: 'This website is operated by Containastore Self Access Storage ("we", "us", "our"), a shipping container self-storage yard at Berrowsfield Farm Ltd, Inkberrow, Worcester WR7 4JH.',
        },
        {
          type: 'p',
          text: 'The data controller for the personal information described in this policy is [REGISTERED LEGAL ENTITY AND COMPANY NUMBER]. We are registered with the Information Commissioner’s Office under reference [ICO REGISTRATION NUMBER].',
        },
        {
          type: 'p',
          text: 'If you have any questions about this policy or about how we handle your information, contact us using the details on our contact page.',
        },
      ],
    },
    {
      id: 'what-we-collect',
      heading: 'What information we collect',
      blocks: [
        { type: 'p', text: 'Depending on how you interact with us, we may hold:' },
        {
          type: 'ul',
          items: [
            'Enquiry data — your name, email address, phone number, the container size you are interested in, a preferred start date and the content of your message, submitted through our enquiry form or given to us by phone.',
            'Rental agreement records — the information needed to set up and manage a container rental, including your name, contact details, address, the container allocated to you, start date and any identification we are required to see.',
            'Payment records — a record of payments made to us and the method used (cash, bank transfer or standing order). We do not take card payments and do not store card details.',
            'Correspondence — emails, letters, text messages and notes of phone calls between you and us.',
            'Server logs — when you visit this website our hosting provider automatically records technical data such as your IP address, browser type, the pages you view and the time of your visit. This is used to keep the site secure and working.',
            'CCTV footage — our yard is covered by 24 hour remotely monitored CCTV. If you visit the site, or your vehicle enters the yard, you will be recorded. See the CCTV section below.',
          ],
        },
      ],
    },
    {
      id: 'lawful-bases',
      heading: 'Why we can use your information (lawful bases)',
      blocks: [
        {
          type: 'p',
          text: 'Under the UK GDPR we must have a lawful basis for using your personal information. We rely on the following:',
        },
        {
          type: 'ul',
          items: [
            'Legitimate interests — for responding to enquiries, for keeping records of correspondence, and for site security including CCTV. Our legitimate interests are running and growing the business, keeping our records straight, and protecting our premises, our customers and their property. We balance these against your rights and only process what is reasonably needed.',
            'Performance of a contract — for setting up and managing your container rental, taking payment and dealing with any issues during the rental.',
            'Legal obligation — for keeping accounting and tax records, and for responding to lawful requests from the authorities.',
          ],
        },
      ],
    },
    {
      id: 'how-we-use',
      heading: 'How we use your information',
      blocks: [
        {
          type: 'ul',
          items: [
            'To answer your enquiry and, if you go ahead, to set up your rental.',
            'To manage an ongoing rental — arranging access, taking payment, and contacting you about your container.',
            'To keep proper business, accounting and tax records.',
            'To keep the yard, our customers and their property secure.',
            'To keep this website secure, available and working correctly.',
            'To deal with complaints, disputes and insurance or legal claims.',
          ],
        },
      ],
    },
    {
      id: 'sharing',
      heading: 'Who we share it with',
      blocks: [
        { type: 'p', text: 'We do not sell your information. We may share it with:' },
        {
          type: 'ul',
          items: [
            'Our website host and enquiry-form provider, who process data on our behalf under a written agreement — [WEBSITE HOSTING PROVIDER] and [ENQUIRY FORM / EMAIL PROVIDER].',
            'Our CCTV provider and monitoring service — [CCTV MONITORING PROVIDER].',
            'Our accountant or bookkeeper — [ACCOUNTANT / BOOKKEEPER], for accounting and tax.',
            'The police, insurers, courts or other authorities where we are required or permitted by law to do so.',
          ],
        },
        {
          type: 'p',
          text: 'Where a provider is outside the UK, we will make sure an appropriate safeguard recognised under UK data protection law is in place.',
        },
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      blocks: [
        {
          type: 'ul',
          items: [
            'Enquiries that do not lead to a rental — kept for [ENQUIRY RETENTION PERIOD], then deleted.',
            'Rental agreement and customer records — kept for [CUSTOMER RETENTION PERIOD] after your rental ends, to cover accounting, tax and any later dispute.',
            'Payment and accounting records — kept for at least six years plus the current year, as required by tax law.',
            'CCTV footage — kept for [CCTV RETENTION PERIOD] and then automatically overwritten, unless footage is needed for a specific incident, in which case it is kept until that matter is resolved.',
            'Website server logs — kept for [SERVER LOG RETENTION PERIOD].',
          ],
        },
      ],
    },
    {
      id: 'cctv',
      heading: 'CCTV',
      blocks: [
        {
          type: 'p',
          text: 'Our yard is monitored by CCTV 24 hours a day, and the footage is remotely monitored. Signs are displayed on site. The purpose of the CCTV is to protect the premises, our customers, their stored property and our staff, and to help prevent, detect and investigate crime.',
        },
        {
          type: 'p',
          text: 'The lawful basis for CCTV is our legitimate interests in security. Cameras are positioned to cover the yard, access routes and container doors, and are not aimed at areas beyond what is needed for that purpose.',
        },
        {
          type: 'p',
          text: 'Footage is kept for [CCTV RETENTION PERIOD] and then overwritten. Access to live and recorded footage is limited to [WHO CAN ACCESS CCTV FOOTAGE] and our monitoring provider. Footage may be shared with the police or insurers in connection with an incident.',
        },
        {
          type: 'p',
          text: 'You have the right to ask for a copy of CCTV footage of yourself. Requests should be made using the contact details on our contact page and should include the date, time and location so we can find the footage. We may need to obscure other people who appear in it.',
        },
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      blocks: [
        {
          type: 'p',
          text: 'You have the right to ask us to give you a copy of your information, to correct it, to delete it, to restrict how we use it, and to object to processing based on legitimate interests. These rights are not absolute and we may need to keep some information to meet a legal obligation or to deal with a possible claim.',
        },
        {
          type: 'p',
          text: 'To make a request, contact us using the details on our contact page. We will respond within one month.',
        },
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies',
      blocks: [
        {
          type: 'p',
          text: 'This website uses a small number of cookies. Non-essential cookies and third-party content are only loaded if you agree. See our cookie policy for the detail and to change your choice.',
        },
      ],
    },
    {
      id: 'complaints',
      heading: 'Complaints',
      blocks: [
        {
          type: 'p',
          text: 'If you are unhappy with how we have handled your information, please tell us first so we can try to put it right. You also have the right to complain to the Information Commissioner’s Office at ico.org.uk or on 0303 123 1113.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        {
          type: 'p',
          text: 'We may update this policy from time to time. The current version is always on this page, and the date it was last updated is shown at the top.',
        },
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: 'Cookie policy',
  updated: '[DATE OF PUBLICATION]',
  disclaimer: DISCLAIMER,
  sections: [
    {
      id: 'what-are-cookies',
      heading: 'What cookies are',
      blocks: [
        {
          type: 'p',
          text: 'Cookies are small text files that a website stores on your device. They are used to make a site work, to remember your choices, and sometimes to measure how a site is used. Similar technologies such as local storage work in the same way and are covered by this policy.',
        },
      ],
    },
    {
      id: 'how-we-use-cookies',
      heading: 'How we use cookies',
      blocks: [
        {
          type: 'p',
          text: 'We keep this to a minimum. We use one essential cookie to remember your cookie choice, and we do not load any third-party content until you have agreed to it.',
        },
      ],
    },
    {
      id: 'essential',
      heading: 'Essential cookies',
      blocks: [
        {
          type: 'ul',
          items: [
            'containastore_cookie_consent — remembers whether you accepted or declined non-essential cookies, so we do not ask you again on every page. Set by this website. Stored for 12 months. This cookie cannot be turned off because the site needs it to respect your choice.',
          ],
        },
      ],
    },
    {
      id: 'non-essential',
      heading: 'Non-essential cookies and third-party content',
      blocks: [
        {
          type: 'p',
          text: 'The following are only loaded if you choose "Accept". If you decline, they are not loaded at all.',
        },
        {
          type: 'ul',
          items: [
            'Map — our contact page can show a map from OpenStreetMap. Loading the map sends your IP address to OpenStreetMap. Until you accept, we show a button in place of the map and print the address as text, so you can find us without loading anything.',
            '[ANY OTHER THIRD-PARTY CONTENT — e.g. analytics, video embeds — LIST HERE OR CONFIRM THERE IS NONE]',
          ],
        },
      ],
    },
    {
      id: 'change-your-choice',
      heading: 'Changing your choice',
      blocks: [
        {
          type: 'p',
          text: 'You can change your cookie choice at any time using the controls on this page. You can also delete cookies through your browser settings; if you do, you will be asked for your choice again on your next visit.',
        },
      ],
    },
  ],
};
