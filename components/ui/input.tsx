import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`h-11 w-full rounded-lg border px-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all duration-200 bg-[var(--bg-primary)] focus:outline-none focus:ring-2 ${
            error
              ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/20"
              : "border-[var(--border-color)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-sm text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
