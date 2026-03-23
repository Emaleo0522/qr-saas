"use client";

const presetColors = [
  "#000000",
  "#7c3aed",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
];

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`h-8 w-8 rounded-lg border-2 transition-all ${
              value === color
                ? "scale-110 border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20"
                : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded-lg border border-[var(--border-color)]"
          />
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) {
            onChange(e.target.value);
          }
        }}
        className="h-9 w-28 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 text-sm font-mono text-[var(--text-primary)]"
        placeholder="#000000"
      />
    </div>
  );
}
