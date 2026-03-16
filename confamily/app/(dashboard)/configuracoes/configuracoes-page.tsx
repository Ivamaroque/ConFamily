import type { Metadata } from "next";

export const metadata: Metadata = { title: "Configurações — ConFamily" };

export function ConfiguracoesPage() {
  return (
    <div className="px-4 pt-4 space-y-4">
      <h1 className="font-display text-2xl font-bold text-on-surface">
        Configurações
      </h1>
      {/* TODO: <PerfilSection /> */}
      {/* TODO: <NotificacoesSection /> */}
      {/* TODO: <ContaSection /> */}
    </div>
  );
}
