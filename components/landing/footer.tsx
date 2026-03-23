import { QrCode } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
            <QrCode className="h-5 w-5 text-[var(--color-primary)]" />
            QR-SaaS
          </div>

          {/* Links */}
          <div className="flex gap-6">
            <a
              href="#features"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Terms
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-[var(--text-tertiary)]">
            &copy; {new Date().getFullYear()} QR-SaaS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
