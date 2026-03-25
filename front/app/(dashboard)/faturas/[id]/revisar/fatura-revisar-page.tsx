import type { Metadata } from "next";

export const metadata: Metadata = { title: "Revisar Extração — ConFamily" };

export async function FaturaRevisarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="px-4 pt-4">
      <h1 className="font-display text-2xl font-bold text-on-surface mb-6">
        Revisão da IA
      </h1>
      {/* TODO: <FaturaReview faturaId={id} /> */}
      <span className="sr-only">{id}</span>
    </div>
  );
}
