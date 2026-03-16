import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-on-surface-variant"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "h-12 w-full rounded bg-surface-container-highest px-4 text-base text-on-surface",
          "placeholder:text-outline outline-none",
          "focus:ring-2 focus:ring-primary transition-shadow",
          error && "ring-2 ring-error",
          className
        )}
        {...(error
          ? {
              "aria-invalid": "true",
              "aria-describedby": `${inputId}-error`,
            }
          : {})}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-error">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-on-surface-variant">{hint}</p>
      )}
    </div>
  );
}
