Database bootstrap

This project now has an initial SQL migration in:
- db/migrations/001_initial_schema.sql

Connection setup
1) Create a local env file from the example:
  copy .env.example .env.local
2) Update DATABASE_URL in .env.local.
3) Use the shared connection in code:
  import { dbQuery } from "@/lib/db/connection";

What was created
- usuarios table:
  - login (unique)
  - senha_hash (store hashed password, never plain text)
  - nome_usuario
- custos table:
  - descricao
  - valor_total
  - tipo_pagamento (AVISTA or APRAZO)
  - total_parcelas (required only for APRAZO)
  - data_primeira_parcela
- vw_custos_status view:
  - valor_parcela
  - parcela_atual (auto advances month by month)
  - parcelas_restantes

How to apply (PostgreSQL)
1) Create your database.
2) Run:
   psql -d <seu_banco> -f db/migrations/001_initial_schema.sql

Connection test (inside app code)
- Example:
  import { testDbConnection } from "@/lib/db/connection";
  await testDbConnection();

Quick test inserts
- User:
  INSERT INTO usuarios (login, senha_hash, nome_usuario)
  VALUES ('joao@email.com', 'hash_da_senha', 'Joao');

- Cost (cash):
  INSERT INTO custos (usuario_id, descricao, valor_total, tipo_pagamento)
  VALUES (1, 'Mercado', 320.50, 'AVISTA');

- Cost (installments):
  INSERT INTO custos (usuario_id, descricao, valor_total, tipo_pagamento, total_parcelas, data_primeira_parcela)
  VALUES (1, 'Notebook', 4800.00, 'APRAZO', 12, CURRENT_DATE);

- Query status:
  SELECT * FROM vw_custos_status WHERE usuario_id = 1 ORDER BY criado_em DESC;
