import type { Metadata } from "next";

export const metadata: Metadata = { title: "Faturas — ConFamily" };

export function FaturasListaPage() {
  return (
    <div className="px-4 pt-4 space-y-4">
      <h1 className="font-display text-2xl font-bold text-on-surface">
        Faturas
      </h1>
      {/* TODO: <FaturaUpload /> */}
      {/* TODO: <FaturaList /> */}
    </div>
  );
}
