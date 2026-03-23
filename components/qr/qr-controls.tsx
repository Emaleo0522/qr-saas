"use client";

import { useQrEditor } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "./color-picker";
import { StyleSelector } from "./style-selector";
import { SocialTemplates } from "./social-templates";

const dotsOptions = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Extra Rounded" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy Rounded" },
];

const cornersOptions = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
  { value: "extra-rounded", label: "Rounded" },
];

const cornerDotOptions = [
  { value: "square", label: "Square" },
  { value: "dot", label: "Dot" },
];

export function QrControls() {
  const {
    title,
    setTitle,
    destinationUrl,
    setDestinationUrl,
    config,
    setConfig,
  } = useQrEditor();

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
      {/* Basic Info */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          Basic Info
        </h3>
        <Input
          label="Title"
          placeholder="My QR Code"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Destination URL"
          type="url"
          placeholder="https://example.com"
          value={destinationUrl}
          onChange={(e) => setDestinationUrl(e.target.value)}
        />
      </section>

      {/* Templates */}
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          Quick Start
        </h3>
        <SocialTemplates />
      </section>

      {/* Colors */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          Colors
        </h3>
        <ColorPicker
          label="Foreground"
          value={config.foregroundColor}
          onChange={(color) => setConfig({ foregroundColor: color })}
        />
        <ColorPicker
          label="Background"
          value={config.backgroundColor}
          onChange={(color) => setConfig({ backgroundColor: color })}
        />
      </section>

      {/* Dot Styles */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          Style
        </h3>
        <StyleSelector
          label="Dots"
          value={config.dotsStyle}
          options={dotsOptions}
          onChange={(v) => setConfig({ dotsStyle: v as any })}
        />
        <StyleSelector
          label="Corners"
          value={config.cornersStyle}
          options={cornersOptions}
          onChange={(v) => setConfig({ cornersStyle: v as any })}
        />
        <StyleSelector
          label="Corner Dots"
          value={config.cornersDotStyle}
          options={cornerDotOptions}
          onChange={(v) => setConfig({ cornersDotStyle: v as any })}
        />
      </section>

      {/* Logo */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          Logo
        </h3>
        <Input
          label="Logo URL (optional)"
          type="url"
          placeholder="https://example.com/logo.png"
          value={config.imageUrl || ""}
          onChange={(e) =>
            setConfig({ imageUrl: e.target.value || undefined })
          }
        />
      </section>
    </div>
  );
}
