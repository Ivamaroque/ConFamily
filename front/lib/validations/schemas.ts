// Validation schemas — to be typed with Zod once installed: `npm i zod`
// Each schema mirrors the API input contract and can be reused on client + server.

export type LoginInput = {
  email: string;
  senha: string;
};

export type CadastroInput = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export type CreateDespesaInput = {
  descricao: string;
  valor: number;
  data: string;       // ISO date string "YYYY-MM-DD"
  tipo: "despesa" | "receita";
  categoriaId: string;
  familiaId: string;
};

export type UpdateDespesaInput = Partial<Omit<CreateDespesaInput, "familiaId">>;

export type CreateFamiliaInput = {
  nome: string;
};

export type ConvidarMembroInput = {
  email: string;
  papel: "owner" | "member";
};

export type UploadFaturaInput = {
  familiaId: string;
  arquivo: File;
};

export type RevisarExtracaoInput = {
  itens: Array<{
    descricao: string;
    valor: number;
    categoriaId: string;
    incluir: boolean;
  }>;
};
