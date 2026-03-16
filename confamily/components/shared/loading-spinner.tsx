import { cn } from "@/lib/utils/cn";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
};

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Carregando"
      className={cn(
        "block rounded-full border-primary-fixed-dim border-t-primary animate-spin",
        sizeClasses[size],
        className
      )}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
    </div>
  );
}
