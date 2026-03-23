"use client";

import { AppNavbar } from "@/components/layout/app-navbar";
import { QrPreview } from "@/components/qr/qr-preview";
import { QrControls } from "@/components/qr/qr-controls";
import { QrDownload } from "@/components/qr/qr-download";

export default function GeneratorPage() {
  return (
    <>
      <AppNavbar />
      <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row">
        {/* Controls Sidebar */}
        <aside className="order-2 w-full border-t border-[var(--border-color)] bg-[var(--bg-secondary)] lg:order-1 lg:w-[380px] lg:border-r lg:border-t-0">
          <QrControls />
          <div className="border-t border-[var(--border-color)] p-6">
            <QrDownload />
          </div>
        </aside>

        {/* Preview Area */}
        <div className="order-1 flex flex-1 items-center justify-center p-8 lg:order-2">
          <QrPreview />
        </div>
      </div>
    </>
  );
}
