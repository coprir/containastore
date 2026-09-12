import type { LegalDocument as LegalDoc } from '@content/legal';
import { Fragment } from 'react';

/** Wraps every [PLACEHOLDER TOKEN] in a visibly-unfinished style. */
function renderWithPlaceholders(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <span key={i} className="placeholder-token" title="To be supplied by the client">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function LegalDocument({
  doc,
  children,
}: {
  doc: LegalDoc;
  children?: React.ReactNode;
}) {
  return (
    <article className="prose-legal max-w-3xl text-muted">
      {doc.updated ? (
        <p className="text-sm">Last updated: {renderWithPlaceholders(doc.updated)}</p>
      ) : null}

      <p className={`rounded border border-dashed border-warn bg-panel p-4 text-sm ${doc.updated ? 'mt-4' : ''}`}>
        <strong className="text-paper">Draft — not legal advice.</strong> {doc.disclaimer}
      </p>

      {children}

      {doc.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-paper">{section.heading}</h2>
          {section.blocks.map((block, i) =>
            block.type === 'p' ? (
              <p key={i}>{renderWithPlaceholders(block.text ?? '')}</p>
            ) : (
              <ul key={i}>
                {(block.items ?? []).map((item, j) => (
                  <li key={j}>{renderWithPlaceholders(item)}</li>
                ))}
              </ul>
            ),
          )}
        </section>
      ))}
    </article>
  );
}
