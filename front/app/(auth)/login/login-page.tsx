import type { Metadata } from "next";

export const metadata: Metadata = { title: "Entrar — ConFamily" };

export function LoginPage() {
  return (
    <main>
      <h1 className="font-display text-2xl font-bold text-on-surface mb-2">
        Bem-vindo de volta
      </h1>
      <p className="text-on-surface-variant text-sm mb-8">
        Entre na sua conta para continuar
      </p>
      {/* TODO: <LoginForm /> */}
    </main>
  );
}
