import type { Channel, Priority, Status } from "./types";

export const STATUS_LABELS: Record<Status, string> = {
  open: "Aberto",
  pending: "Pendente",
  closed: "Fechado",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

export const CHANNEL_LABELS: Record<Channel, string> = {
  email: "E-mail",
  chat: "Chat",
  whatsapp: "WhatsApp",
  phone: "Telefone",
};

export const STATUSES = Object.keys(STATUS_LABELS) as Status[];
export const PRIORITIES = Object.keys(PRIORITY_LABELS) as Priority[];

// Valores em inglês que vêm do dataset do Kaggle
const METRIC_LABELS: Record<string, string> = {
  "Refund request": "Pedido de reembolso",
  "Technical issue": "Problema técnico",
  "Cancellation request": "Pedido de cancelamento",
  "Product inquiry": "Dúvida sobre produto",
  "Billing inquiry": "Dúvida sobre cobrança",
  "Pending Customer Response": "Aguardando cliente",
  Open: "Aberto",
  Closed: "Fechado",
  Low: "Baixa",
  Medium: "Média",
  High: "Alta",
  Critical: "Crítica",
  Email: "E-mail",
  Phone: "Telefone",
  "Social media": "Redes sociais",
  Chat: "Chat",
};

export function translateMetric(name: string): string {
  return METRIC_LABELS[name] ?? name;
}
