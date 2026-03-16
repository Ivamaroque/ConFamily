import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Elevação visual via hierarquia de surface */
  elevation?: "lowest" | "low" | "default" | "high";
}

const elevationClass: Record<NonNullable<CardProps["elevation"]>, string> = {
  lowest: "bg-surface-container-lowest",
  low:    "bg-surface-container-low",
  default:"bg-surface-container",
  high:   "bg-surface-container-high",
};

export function Card({
  children,
  elevation = "lowest",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn("rounded-lg p-4", elevationClass[elevation], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display font-semibold text-base text-on-surface", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-on-surface-variant text-sm", className)} {...props}>
      {children}
    </div>
  );
}
