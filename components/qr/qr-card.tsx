"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Pencil,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QrCode } from "@/types";

interface QrCardProps {
  qr: QrCode;
  appUrl: string;
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
}

export function QrCard({ qr, appUrl, onToggle, onDelete }: QrCardProps) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `${appUrl}/${qr.short_code}`;

  function copyUrl() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 transition-all duration-200 hover:shadow-[var(--shadow-card-hover)]">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-[var(--text-primary)]">
            {qr.title}
          </h3>
          <a
            href={qr.destination_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 flex items-center gap-1 text-sm text-[var(--text-tertiary)] hover:text-[var(--color-primary)]"
          >
            <ExternalLink className="h-3 w-3 shrink-0" />
            <span className="truncate">{qr.destination_url}</span>
          </a>
        </div>
        <div
          className={`ml-3 rounded-full px-2 py-0.5 text-xs font-medium ${
            qr.is_active
              ? "bg-[var(--success-bg-subtle)] text-[var(--color-success)]"
              : "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
          }`}
        >
          {qr.is_active ? "Active" : "Inactive"}
        </div>
      </div>

      {/* Short URL */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-[var(--bg-secondary)] px-3 py-2">
        <code className="flex-1 truncate text-sm text-[var(--text-secondary)]">
          {shortUrl}
        </code>
        <button
          onClick={copyUrl}
          className="shrink-0 text-xs font-medium text-[var(--color-primary)] hover:underline"
          aria-label={copied ? "URL copied" : `Copy short URL for ${qr.title}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Stats */}
      <div className="mb-4 flex items-center gap-4 text-sm text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4" />
          {qr.scan_count} scans
        </div>
        {qr.social_platform && (
          <span className="rounded-full bg-[var(--primary-bg-subtle)] px-2 py-0.5 text-xs text-[var(--primary-text-emphasis)]">
            {qr.social_platform}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-[var(--border-color)] pt-3">
        <Link href={`/generator?edit=${qr.id}`} className="flex-1">
          <Button variant="ghost" size="sm" className="w-full gap-1.5">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          onClick={() => onToggle(qr.id, !qr.is_active)}
          aria-label={qr.is_active ? `Deactivate ${qr.title}` : `Activate ${qr.title}`}
        >
          {qr.is_active ? (
            <ToggleRight className="h-4 w-4 text-[var(--color-success)]" />
          ) : (
            <ToggleLeft className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-[var(--color-error)] hover:bg-[var(--error-bg-subtle)]"
          onClick={() => onDelete(qr.id)}
          aria-label={`Delete ${qr.title}`}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
