import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar Despesa — ConFamily" };

export async function DespesaDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="px-4 pt-4">
      <h1 className="font-display text-2xl font-bold text-on-surface mb-6">
        Editar Despesa
      </h1>
      {/* TODO: <DespesaForm id={id} /> */}
      <span className="sr-only">{id}</span>
    </div>
  );
}
