import type { LoginInput, CadastroInput } from "@/lib/validations/schemas";

async function login(input: LoginInput): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao fazer login");
  }
}

async function cadastro(input: CadastroInput): Promise<void> {
  const res = await fetch("/api/auth/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error?.message ?? "Erro ao criar conta");
  }
}

async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export const authService = { login, cadastro, logout };
