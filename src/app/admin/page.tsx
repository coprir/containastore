import { units as baseUnits } from '@content/units';
import { faqs as baseFaqs } from '@content/faq';
import { homeCopy as baseHomeCopy } from '@content/pages';
import { site as baseSite } from '@content/site';
import { readOverrides } from '@/lib/content';
import { formConfigured } from '@/lib/env';
import { AdminEditor } from '@/components/admin/AdminEditor';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const overrides = await readOverrides();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-paper">Content</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Edits are saved to <code className="font-mono">data/overrides.json</code> and
          merged over the built-in content. On a long-running host the change
          shows on the next page refresh (up to 5 minutes). On a read-only host
          such as Vercel this file cannot be written at runtime — export the JSON
          and commit it. The enquiry form is currently{' '}
          <strong className="text-paper">
            {formConfigured ? 'connected' : 'not connected'}
          </strong>{' '}
          (set via environment variables, not here).
        </p>
      </div>

      <AdminEditor
        base={{
          units: baseUnits,
          faqs: baseFaqs,
          homeCopy: baseHomeCopy,
          site: baseSite,
        }}
        initialOverrides={overrides}
      />
    </div>
  );
}
