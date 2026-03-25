"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/painel",         label: "Painel",         icon: "home" },
  { href: "/despesas",       label: "Despesas",       icon: "receipt_long" },
  { href: "/faturas",        label: "Faturas",        icon: "document_scanner" },
  { href: "/configuracoes",  label: "Configurações",  icon: "settings" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "fixed bottom-0 inset-x-0 h-16 z-50",
        "bg-surface/80 backdrop-blur-xl",
        "flex items-center justify-around px-2",
        "border-t border-outline-variant/20"
      )}
    >
      {NAV_ITEMS.map(({ href, label, icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-0.5 flex-1 py-1 rounded-lg transition-colors",
              active
                ? "text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {/* Material Symbols — add to layout <head> via Google Fonts */}
            <span
              className={cn(
                "material-symbols-outlined text-[24px] leading-none",
                active && "font-[600]"
              )}
              aria-hidden="true"
            >
              {icon}
            </span>
            <span className="text-[10px] font-medium leading-none">{label}</span>
          </Link>
        );
      })}

      {/* FAB — Nova Despesa */}
      <Link
        href="/despesas/nova"
        aria-label="Registrar nova despesa"
        className={cn(
          "absolute -top-7 left-1/2 -translate-x-1/2",
          "w-14 h-14 rounded-full",
          "bg-gradient-to-br from-primary to-primary-container",
          "flex items-center justify-center shadow-lg",
          "text-on-primary text-2xl font-bold transition-transform active:scale-95"
        )}
      >
        <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
          add
        </span>
      </Link>
    </nav>
  );
}
