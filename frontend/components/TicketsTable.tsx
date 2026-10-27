"use client";

import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/Badge";
import { formatDateTime } from "@/lib/format";
import { CHANNEL_LABELS } from "@/lib/labels";
import type { Ticket } from "@/lib/types";

type TicketsTableProps = {
  tickets: Ticket[];
};

function matchesQuery(ticket: Ticket, query: string): boolean {
  const text = `${ticket.customer_name} ${ticket.subject} ${ticket.description}`;
  return text.toLowerCase().includes(query.toLowerCase());
}

export function TicketsTable({ tickets }: TicketsTableProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim();
  const visibleTickets = normalizedQuery
    ? tickets.filter((ticket) => matchesQuery(ticket, normalizedQuery))
    : tickets;

  return (
    <section className="panel panel--flush">
      <div className="toolbar">
        <label htmlFor="ticket-search" className="visually-hidden">
          Buscar tickets
        </label>
        <div className="search">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="ticket-search"
            type="search"
            placeholder="Buscar por cliente, assunto ou descrição"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <span className="toolbar__count" aria-live="polite">
          {visibleTickets.length} de {tickets.length} tickets
        </span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Criado em</th>
              <th scope="col">Cliente</th>
              <th scope="col">Canal</th>
              <th scope="col">Assunto</th>
              <th scope="col">Status</th>
              <th scope="col">Prioridade</th>
            </tr>
          </thead>
          <tbody>
            {visibleTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="nowrap muted">{formatDateTime(ticket.created_at)}</td>
                <td className="nowrap">{ticket.customer_name}</td>
                <td className="nowrap muted">{CHANNEL_LABELS[ticket.channel]}</td>
                <td>
                  <Link href={`/tickets/${ticket.id}`} className="row-link">
                    {ticket.subject}
                  </Link>
                </td>
                <td>
                  <Badge value={ticket.status} />
                </td>
                <td>
                  <Badge value={ticket.priority} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleTickets.length === 0 && <p className="empty">Nenhum ticket encontrado.</p>}
      </div>
    </section>
  );
}
