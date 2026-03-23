"use client";

interface StyleSelectorProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function StyleSelector({
  label,
  value,
  options,
  onChange,
}: StyleSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
              value === option.value
                ? "border-[var(--color-primary)] bg-[var(--primary-bg-subtle)] text-[var(--primary-text-emphasis)]"
                : "border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
