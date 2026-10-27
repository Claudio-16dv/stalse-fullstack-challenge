import type { Metrics, Ticket, TicketUpdate } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`Falha na API (${status})`);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store", ...init });
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  return response.json();
}

export function getTickets(): Promise<Ticket[]> {
  return request("/tickets");
}

export function getTicket(id: number): Promise<Ticket> {
  return request(`/tickets/${id}`);
}

export function updateTicket(id: number, update: TicketUpdate): Promise<Ticket> {
  return request(`/tickets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
}

export function getMetrics(): Promise<Metrics> {
  return request("/metrics");
}
