import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 px-6 text-center",
        className
      )}
    >
      <span
        className="material-symbols-outlined text-[48px] text-outline"
        aria-hidden="true"
      >
        {icon}
      </span>
      <p className="font-display font-semibold text-base text-on-surface">{title}</p>
      {description && (
        <p className="text-sm text-on-surface-variant max-w-xs">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
