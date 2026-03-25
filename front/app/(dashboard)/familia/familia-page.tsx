import type { Metadata } from "next";

export const metadata: Metadata = { title: "Família — ConFamily" };

export function FamiliaPage() {
  return (
    <div className="px-4 pt-4 space-y-4">
      <h1 className="font-display text-2xl font-bold text-on-surface">
        Minha Família
      </h1>
      {/* TODO: <FamiliaHeader /> */}
      {/* TODO: <MembroList /> */}
      {/* TODO: <ConviteForm /> */}
    </div>
  );
}
