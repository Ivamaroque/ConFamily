import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nova Despesa — ConFamily" };

export function DespesaNovaPage() {
  return (
    <div className="px-4 pt-4">
      <h1 className="font-display text-2xl font-bold text-on-surface mb-6">
        Registrar Transação
      </h1>
      {/* TODO: <DespesaForm /> */}
    </div>
  );
}
