'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(next);
        router.refresh();
        return;
      }
      const data = (await res.json()) as { message?: string };
      setError(data.message || 'Could not sign in.');
    } catch {
      setError('Could not reach the server.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      {error ? (
        <p role="alert" className="rounded border border-warn bg-panel p-3 text-sm text-warn">
          {error}
        </p>
      ) : null}
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-paper">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded border border-line-strong bg-ink px-3 py-2.5 text-paper"
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded border border-accent-strong bg-accent-strong px-4 py-2.5 text-sm font-bold text-ink hover:bg-accent disabled:opacity-60"
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="font-heading text-2xl font-extrabold text-paper">Admin sign in</h1>
      <p className="mt-2 text-sm text-muted">
        Enter the admin password to manage site content.
      </p>
      <Suspense fallback={<p className="mt-6 text-sm text-muted">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
