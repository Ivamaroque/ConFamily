import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 h-14 bg-surface/80 backdrop-blur-xl flex items-center px-4 gap-3 border-b border-outline-variant/20">
      <Link href="/painel" className="flex items-center gap-2">
        <span className="font-display font-bold text-lg text-primary leading-none">
          ConFamily
        </span>
      </Link>

      <div className="flex-1" />

      <Link
        href="/configuracoes"
        aria-label="Configurações"
        className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high"
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          settings
        </span>
      </Link>
    </header>
  );
}
