"use client";

import {
  Camera,
  Music,
  Play,
  AtSign,
  Users,
  Briefcase,
  MessageCircle,
  Send,
  Code,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { useQrEditor } from "@/lib/store";
import type { QrConfig } from "@/types";

interface Template {
  platform: string;
  icon: React.ElementType;
  color: string;
  urlPrefix: string;
  placeholder: string;
  config: Partial<QrConfig>;
}

const templates: Template[] = [
  {
    platform: "Instagram",
    icon: Camera,
    color: "#E4405F",
    urlPrefix: "https://instagram.com/",
    placeholder: "username",
    config: { foregroundColor: "#E4405F", dotsStyle: "rounded", cornersStyle: "dot" },
  },
  {
    platform: "TikTok",
    icon: Music,
    color: "#000000",
    urlPrefix: "https://tiktok.com/@",
    placeholder: "username",
    config: { foregroundColor: "#000000", dotsStyle: "classy-rounded", cornersStyle: "extra-rounded" },
  },
  {
    platform: "YouTube",
    icon: Play,
    color: "#FF0000",
    urlPrefix: "https://youtube.com/@",
    placeholder: "channel",
    config: { foregroundColor: "#FF0000", dotsStyle: "square", cornersStyle: "square" },
  },
  {
    platform: "Twitter / X",
    icon: AtSign,
    color: "#1DA1F2",
    urlPrefix: "https://x.com/",
    placeholder: "username",
    config: { foregroundColor: "#1DA1F2", dotsStyle: "dots", cornersStyle: "dot" },
  },
  {
    platform: "Facebook",
    icon: Users,
    color: "#1877F2",
    urlPrefix: "https://facebook.com/",
    placeholder: "page",
    config: { foregroundColor: "#1877F2", dotsStyle: "rounded", cornersStyle: "square" },
  },
  {
    platform: "LinkedIn",
    icon: Briefcase,
    color: "#0A66C2",
    urlPrefix: "https://linkedin.com/in/",
    placeholder: "profile",
    config: { foregroundColor: "#0A66C2", dotsStyle: "extra-rounded", cornersStyle: "extra-rounded" },
  },
  {
    platform: "WhatsApp",
    icon: MessageCircle,
    color: "#25D366",
    urlPrefix: "https://wa.me/",
    placeholder: "phone number",
    config: { foregroundColor: "#25D366", dotsStyle: "rounded", cornersStyle: "dot" },
  },
  {
    platform: "Telegram",
    icon: Send,
    color: "#26A5E4",
    urlPrefix: "https://t.me/",
    placeholder: "username",
    config: { foregroundColor: "#26A5E4", dotsStyle: "dots", cornersStyle: "dot" },
  },
  {
    platform: "GitHub",
    icon: Code,
    color: "#181717",
    urlPrefix: "https://github.com/",
    placeholder: "username",
    config: { foregroundColor: "#181717", dotsStyle: "classy", cornersStyle: "square" },
  },
  {
    platform: "Website",
    icon: Globe,
    color: "#7c3aed",
    urlPrefix: "https://",
    placeholder: "your-site.com",
    config: { foregroundColor: "#7c3aed", dotsStyle: "rounded", cornersStyle: "extra-rounded" },
  },
  {
    platform: "Email",
    icon: Mail,
    color: "#EA4335",
    urlPrefix: "mailto:",
    placeholder: "you@example.com",
    config: { foregroundColor: "#EA4335", dotsStyle: "square", cornersStyle: "square" },
  },
  {
    platform: "Phone",
    icon: Phone,
    color: "#34A853",
    urlPrefix: "tel:",
    placeholder: "+1234567890",
    config: { foregroundColor: "#34A853", dotsStyle: "dots", cornersStyle: "dot" },
  },
];

export function SocialTemplates() {
  const { socialPlatform, setSocialPlatform, setConfig, setDestinationUrl } =
    useQrEditor();

  function applyTemplate(template: Template) {
    setSocialPlatform(template.platform);
    setConfig(template.config);
    setDestinationUrl(template.urlPrefix);
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-[var(--text-secondary)]">
        Social Templates
      </label>
      <div className="grid grid-cols-3 gap-2">
        {templates.map((t) => (
          <button
            key={t.platform}
            onClick={() => applyTemplate(t)}
            className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs transition-all ${
              socialPlatform === t.platform
                ? "border-[var(--color-primary)] bg-[var(--primary-bg-subtle)]"
                : "border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]"
            }`}
          >
            <t.icon
              className="h-5 w-5"
              style={{ color: t.color }}
            />
            <span className="truncate font-medium text-[var(--text-primary)]">
              {t.platform}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { templates };
