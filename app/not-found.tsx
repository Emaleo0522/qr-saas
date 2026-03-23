import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <QrCode className="mb-6 h-16 w-16 text-[var(--text-tertiary)]" />
      <h1 className="mb-2 text-4xl font-bold text-[var(--text-emphasis)]">
        404
      </h1>
      <p className="mb-8 text-center text-[var(--text-secondary)]">
        This page doesn&apos;t exist or the QR code has been deactivated.
      </p>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
