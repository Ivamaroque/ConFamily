// ── Primitive types ──────────────────────────────────────────────────────────

export type Role = "owner" | "member";

export type TipoTransacao = "despesa" | "receita";

export type StatusFatura = "pendente" | "processando" | "revisando" | "concluida" | "erro";

// ── User & Family ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Familia {
  id: string;
  nome: string;
  ownerId: string;
  createdAt: string;
}

export interface MembroFamilia {
  id: string;
  userId: string;
  familiaId: string;
  papel: Role;
  user: Pick<User, "id" | "name" | "email" | "avatarUrl">;
}

// ── Expenses ──────────────────────────────────────────────────────────────────

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  cor: string;
}

export interface Despesa {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: TipoTransacao;
  categoriaId: string;
  categoria: Categoria;
  familiaId: string;
  membroId: string;
  membro: Pick<User, "id" | "name" | "avatarUrl">;
  faturaId?: string;
  createdAt: string;
}

export interface DivisaoDespesa {
  id: string;
  despesaId: string;
  membroId: string;
  valor: number;
  percentual: number;
}

// ── Invoices / AI extraction ──────────────────────────────────────────────────

export interface ItemExtracaoFatura {
  descricao: string;
  valor: number;
  categoriasSugerida?: string;
}

export interface ExtracaoFatura {
  total?: number;
  dataVencimento?: string;
  nomeEmissor?: string;
  itens: ItemExtracaoFatura[];
}

export interface Fatura {
  id: string;
  familiaId: string;
  uploadUrl: string;
  status: StatusFatura;
  extracao?: ExtracaoFatura;
  createdAt: string;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export interface ResumoMensal {
  periodo: string;
  totalDespesas: number;
  totalReceitas: number;
  saldo: number;
  porCategoria: Array<{
    categoria: Categoria;
    total: number;
    percentual: number;
  }>;
  porMembro: Array<{
    membro: Pick<User, "id" | "name" | "avatarUrl">;
    total: number;
  }>;
}
