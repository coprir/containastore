'use client';

import { useId, useState } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  /** Rendered as paragraphs split on blank lines. */
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const base = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${base}-btn-${item.id}`;
        const panelId = `${base}-panel-${item.id}`;
        return (
          <div key={item.id}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-heading text-base font-bold text-paper">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-accent transition-transform ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-5 pr-6 text-muted"
            >
              {item.answer.split('\n\n').map((para, i) => (
                <p key={i} className={i > 0 ? 'mt-3' : ''}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
