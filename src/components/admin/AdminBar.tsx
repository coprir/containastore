'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AdminBar() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <header className="border-b border-line bg-steel">
      <div className="container-x flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-heading text-sm font-extrabold text-paper">
            CONTAINASTORE ADMIN
          </Link>
          <Link href="/" className="text-xs text-muted hover:text-paper" target="_blank">
            View site ↗
          </Link>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded border border-line-strong px-3 py-1.5 text-xs font-bold text-paper hover:bg-panel-2"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
