import type { Metadata } from "next";

export const metadata: Metadata = { title: "Painel — ConFamily" };

export function PainelPage() {
  return (
    <div className="px-4 pt-4 space-y-4">
      <h1 className="font-display text-2xl font-bold text-on-surface">
        Painel Financeiro
      </h1>
      {/* TODO: <ResumoMensal /> */}
      {/* TODO: <GraficoCategorias /> */}
      {/* TODO: <TransacoesRecentes /> */}
      {/* TODO: <BalancoMembros /> */}
    </div>
  );
}
