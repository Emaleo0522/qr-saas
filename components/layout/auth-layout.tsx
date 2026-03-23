import Link from "next/link";
import { QrCode } from "lucide-react";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-secondary)] p-4">
      <div className="w-full max-w-[420px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-8 shadow-[var(--shadow-lg)]">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]"
          >
            <QrCode className="h-7 w-7 text-[var(--color-primary)]" />
            QR-SaaS
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {title}
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
