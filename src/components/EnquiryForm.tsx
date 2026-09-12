'use client';

import { useRef, useState } from 'react';
import {
  validateEnquiry,
  hasErrors,
  enquiryFieldOrder,
  type EnquiryErrors,
  type EnquiryInput,
} from '@/lib/validation';

interface EnquiryFormProps {
  sizeOptions: { value: string; label: string }[];
  phoneDisplay: string;
  phoneHref: string;
  email: string;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'fallback' }
  | { kind: 'error'; message: string };

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="mt-1 text-sm font-semibold text-warn">
      <span aria-hidden="true">⚠ </span>
      {message}
    </p>
  ) : null;

export function EnquiryForm({
  sizeOptions,
  phoneDisplay,
  phoneHref,
  email,
}: EnquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const focusFirstInvalid = (errs: EnquiryErrors) => {
    const first = enquiryFieldOrder.find((f) => errs[f]);
    if (first && formRef.current) {
      const el = formRef.current.elements.namedItem(first) as HTMLElement | null;
      el?.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const input: Partial<EnquiryInput> = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      size: String(fd.get('size') || ''),
      startDate: String(fd.get('startDate') || ''),
      message: String(fd.get('message') || ''),
      company: String(fd.get('company') || ''),
    };

    const clientErrors = validateEnquiry(input);
    setErrors(clientErrors);
    if (hasErrors(clientErrors)) {
      focusFirstInvalid(clientErrors);
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        errors?: EnquiryErrors;
        delivery?: 'sent' | 'not-configured';
        message?: string;
      };

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        focusFirstInvalid(data.errors);
        setStatus({ kind: 'idle' });
        return;
      }
      if (!res.ok) {
        setStatus({
          kind: 'error',
          message:
            data.message ||
            'Something went wrong sending your enquiry. Please call or email us.',
        });
        return;
      }
      setStatus({ kind: data.delivery === 'not-configured' ? 'fallback' : 'sent' });
      formRef.current?.reset();
    } catch {
      setStatus({
        kind: 'error',
        message: 'Could not reach the server. Please call or email us instead.',
      });
    }
  };

  if (status.kind === 'sent') {
    return (
      <div
        role="status"
        className="rounded border border-line-strong bg-panel p-6"
      >
        <h3 className="font-heading text-lg font-bold text-paper">Thank you — that is on its way</h3>
        <p className="mt-2 text-muted">
          We will get back to you during enquiry hours. Replies occasionally land
          in spam or junk folders, so please check there if you have not heard
          from us. You can also call {phoneDisplay}.
        </p>
      </div>
    );
  }

  if (status.kind === 'fallback') {
    return (
      <div className="rounded border border-line-strong bg-panel p-6">
        <h3 className="font-heading text-lg font-bold text-paper">
          Your details check out — but the form is not connected yet
        </h3>
        <p className="mt-2 text-muted">
          The online enquiry form is not able to send mail on this site yet, so
          nothing has been sent. Please contact us directly and we will pick it
          up straight away:
        </p>
        <ul className="mt-3 space-y-1 font-mono text-paper">
          <li>
            Phone:{' '}
            <a href={phoneHref} className="underline">
              {phoneDisplay}
            </a>
          </li>
          <li>
            Email:{' '}
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {status.kind === 'error' ? (
        <p role="alert" className="rounded border border-warn bg-panel p-3 text-sm font-semibold text-warn">
          {status.message}
        </p>
      ) : null}

      {/* Honeypot — visually hidden, not display:none, off the tab order */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-paper">
            Name <span className="text-warn">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'err-name' : undefined}
            className="w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-paper"
          />
          <FieldError id="err-name" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-paper">
            Email <span className="text-warn">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'err-email' : undefined}
            className="w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-paper"
          />
          <FieldError id="err-email" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-paper">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
            className="w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-paper"
          />
          <FieldError id="err-phone" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="size" className="mb-1 block text-sm font-semibold text-paper">
            Container size
          </label>
          <select
            id="size"
            name="size"
            defaultValue=""
            className="w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-paper"
          >
            <option value="">Select a size</option>
            {sizeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError id="err-size" message={errors.size} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="startDate" className="mb-1 block text-sm font-semibold text-paper">
            Preferred start date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className="w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-paper sm:max-w-xs"
          />
          <FieldError id="err-startDate" message={errors.startDate} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-paper">
          What do you need to store? <span className="text-warn">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'err-message' : undefined}
          className="w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-paper"
        />
        <FieldError id="err-message" message={errors.message} />
      </div>

      <p className="text-xs text-muted">
        Our replies occasionally land in spam or junk folders — please check
        there if you do not hear back. By sending this you agree to us using
        your details to answer your enquiry.
      </p>

      <button
        type="submit"
        disabled={status.kind === 'submitting'}
        className="rounded border border-accent-strong bg-accent-strong px-6 py-3 text-sm font-bold text-ink hover:bg-accent disabled:opacity-60"
      >
        {status.kind === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
