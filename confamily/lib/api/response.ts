// ── Success response ──────────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  data: T;
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
  };
}

// ── Error response ────────────────────────────────────────────────────────────

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorBody;

// ── Helpers (use in route handlers) ──────────────────────────────────────────

export function ok<T>(data: T, meta?: ApiSuccess<T>["meta"]): ApiSuccess<T> {
  return { data, ...(meta ? { meta } : {}) };
}

export function err(
  code: string,
  message: string,
  details?: unknown
): ApiErrorBody {
  return {
    error: { code, message, ...(details !== undefined ? { details } : {}) },
  };
}

export function isApiError(res: unknown): res is ApiErrorBody {
  return typeof res === "object" && res !== null && "error" in res;
}
