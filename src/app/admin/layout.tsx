import type { Metadata } from 'next';
import { AdminBar } from '@/components/admin/AdminBar';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink">
      <AdminBar />
      <div className="container-x py-8">{children}</div>
    </div>
  );
}
