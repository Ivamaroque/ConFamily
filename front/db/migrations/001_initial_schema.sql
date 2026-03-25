BEGIN;

CREATE TABLE IF NOT EXISTS usuarios (
  id BIGSERIAL PRIMARY KEY,
  login VARCHAR(80) NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  nome_usuario VARCHAR(120) NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custos (
  id BIGSERIAL PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  valor_total NUMERIC(12, 2) NOT NULL CHECK (valor_total > 0),
  tipo_pagamento VARCHAR(10) NOT NULL CHECK (tipo_pagamento IN ('AVISTA', 'APRAZO')),
  total_parcelas INTEGER,
  data_primeira_parcela DATE NOT NULL DEFAULT CURRENT_DATE,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT custos_parcelamento_ck CHECK (
    (tipo_pagamento = 'AVISTA' AND total_parcelas IS NULL)
    OR
    (tipo_pagamento = 'APRAZO' AND total_parcelas IS NOT NULL AND total_parcelas >= 2)
  )
);

CREATE INDEX IF NOT EXISTS idx_custos_usuario_id ON custos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_custos_data_primeira_parcela ON custos(data_primeira_parcela);

CREATE OR REPLACE VIEW vw_custos_status AS
SELECT
  c.id,
  c.usuario_id,
  c.descricao,
  c.valor_total,
  c.tipo_pagamento,
  c.total_parcelas,
  c.data_primeira_parcela,
  c.criado_em,
  c.atualizado_em,
  CASE
    WHEN c.tipo_pagamento = 'AVISTA' THEN c.valor_total
    ELSE ROUND((c.valor_total / c.total_parcelas::NUMERIC), 2)
  END AS valor_parcela,
  CASE
    WHEN c.tipo_pagamento = 'AVISTA' THEN 1
    ELSE LEAST(
      c.total_parcelas,
      GREATEST(
        1,
        (
          (EXTRACT(YEAR FROM AGE(CURRENT_DATE, c.data_primeira_parcela)) * 12)
          + EXTRACT(MONTH FROM AGE(CURRENT_DATE, c.data_primeira_parcela))
          + 1
        )::INTEGER
      )
    )
  END AS parcela_atual,
  CASE
    WHEN c.tipo_pagamento = 'AVISTA' THEN 0
    ELSE GREATEST(
      c.total_parcelas - LEAST(
        c.total_parcelas,
        GREATEST(
          1,
          (
            (EXTRACT(YEAR FROM AGE(CURRENT_DATE, c.data_primeira_parcela)) * 12)
            + EXTRACT(MONTH FROM AGE(CURRENT_DATE, c.data_primeira_parcela))
            + 1
          )::INTEGER
        )
      ),
      0
    )
  END AS parcelas_restantes
FROM custos c;

COMMIT;
