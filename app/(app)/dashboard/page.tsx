"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, QrCode, Search } from "lucide-react";
import { AppNavbar } from "@/components/layout/app-navbar";
import { QrCard } from "@/components/qr/qr-card";
import { Button } from "@/components/ui/button";
import type { QrCode as QrCodeType } from "@/types";

// Demo data for development — will be replaced with Supabase queries
const demoQrs: QrCodeType[] = [
  {
    id: "1",
    user_id: "user-1",
    title: "My Instagram",
    destination_url: "https://instagram.com/demo",
    short_code: "ig-demo",
    qr_config: {
      foregroundColor: "#E4405F",
      backgroundColor: "#ffffff",
      dotsStyle: "rounded",
      cornersStyle: "dot",
      cornersDotStyle: "dot",
    },
    social_platform: "Instagram",
    category: null,
    logo_url: null,
    scan_count: 142,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "user-1",
    title: "Company Website",
    destination_url: "https://example.com",
    short_code: "web-co",
    qr_config: {
      foregroundColor: "#7c3aed",
      backgroundColor: "#ffffff",
      dotsStyle: "extra-rounded",
      cornersStyle: "extra-rounded",
      cornersDotStyle: "square",
    },
    social_platform: null,
    category: null,
    logo_url: null,
    scan_count: 89,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "user-1",
    title: "WiFi Guest Network",
    destination_url: "WIFI:T:WPA;S:GuestNet;P:password123;;",
    short_code: "wifi-gst",
    qr_config: {
      foregroundColor: "#000000",
      backgroundColor: "#ffffff",
      dotsStyle: "square",
      cornersStyle: "square",
      cornersDotStyle: "square",
    },
    social_platform: null,
    category: null,
    logo_url: null,
    scan_count: 34,
    is_active: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function DashboardPage() {
  const [qrs, setQrs] = useState<QrCodeType[]>(demoQrs);
  const [search, setSearch] = useState("");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const filtered = qrs.filter(
    (qr) =>
      qr.title.toLowerCase().includes(search.toLowerCase()) ||
      qr.destination_url.toLowerCase().includes(search.toLowerCase())
  );

  function handleToggle(id: string, active: boolean) {
    setQrs((prev) =>
      prev.map((qr) => (qr.id === id ? { ...qr, is_active: active } : qr))
    );
    // TODO: Supabase update
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this QR code? This action cannot be undone.")) return;
    setQrs((prev) => prev.filter((qr) => qr.id !== id));
    // TODO: Supabase delete
  }

  return (
    <>
      <AppNavbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-emphasis)]">
              My QR Codes
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {qrs.length} QR codes &middot;{" "}
              {qrs.filter((q) => q.is_active).length} active
            </p>
          </div>
          <Link href="/generator">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create QR Code
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="search"
            placeholder="Search QR codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search QR codes"
            className="h-11 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((qr) => (
              <QrCard
                key={qr.id}
                qr={qr}
                appUrl={appUrl}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <QrCode className="mb-4 h-12 w-12 text-[var(--text-tertiary)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {search ? "No results" : "No QR codes yet"}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {search
                ? "Try a different search term"
                : "Create your first QR code to get started"}
            </p>
            {!search && (
              <Link href="/generator" className="mt-4">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create QR Code
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
