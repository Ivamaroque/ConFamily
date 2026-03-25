import type { Metadata } from "next";

export const metadata: Metadata = { title: "Criar conta — ConFamily" };

export function CadastroPage() {
  return (
    <main>
      <h1 className="font-display text-2xl font-bold text-on-surface mb-2">
        Criar conta
      </h1>
      <p className="text-on-surface-variant text-sm mb-8">
        Organize as finanças da sua família
      </p>
      {/* TODO: <CadastroForm /> */}
    </main>
  );
}
