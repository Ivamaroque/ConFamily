const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

export function formatCurrency(value: number): string {
  return BRL.format(value);
}

export function formatDate(date: Date | string): string {
  return dateFormatter.format(new Date(date));
}

export function formatShortDate(date: Date | string): string {
  return shortDateFormatter.format(new Date(date));
}

export function formatMonth(date: Date | string): string {
  return monthFormatter.format(new Date(date));
}

export function formatRelative(date: Date | string): string {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Hoje";
  if (days === 1) return "Ontem";
  if (days < 7) return `${days} dias atrás`;
  return formatDate(date);
}
