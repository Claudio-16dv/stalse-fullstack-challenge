const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const dateFormat = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });

export function formatDateTime(value: string): string {
  return dateTimeFormat.format(new Date(value));
}

export function formatDate(value: string): string {
  return dateFormat.format(new Date(`${value}T00:00:00`));
}

export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}
