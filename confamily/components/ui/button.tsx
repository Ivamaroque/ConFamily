import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold hover:opacity-90 active:opacity-80",
  secondary:
    "bg-secondary-container text-on-secondary-container font-semibold hover:opacity-90 active:opacity-80",
  ghost:
    "bg-transparent text-primary hover:bg-primary-fixed/20 active:bg-primary-fixed/30",
  destructive:
    "bg-error text-on-error font-semibold hover:opacity-90 active:opacity-80",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-md",
  md: "h-12 px-6 text-base rounded-md",
  lg: "h-14 px-8 text-base rounded-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
