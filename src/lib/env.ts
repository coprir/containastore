/** Centralised environment access. No secrets are ever hard-coded. */

export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://containastore.co.uk').replace(
    /\/$/,
    '',
  ),
  contactEmail: process.env.CONTACT_EMAIL || 'hello@containastore.co.uk',
  form: {
    endpoint: process.env.FORM_ENDPOINT || '',
    recipient: process.env.FORM_RECIPIENT_EMAIL || process.env.CONTACT_EMAIL || '',
    token: process.env.FORM_TOKEN || '',
  },
  admin: {
    password: process.env.ADMIN_PASSWORD || '',
    sessionSecret: process.env.ADMIN_SESSION_SECRET || '',
    get enabled() {
      return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
    },
  },
};

/** True when the enquiry form can actually deliver mail. */
export const formConfigured = Boolean(env.form.endpoint && env.form.recipient);
