"use client";

import { useState, useTransition } from "react";

import { updateTicketAction } from "@/app/tickets/[id]/actions";
import { PRIORITIES, PRIORITY_LABELS, STATUS_LABELS, STATUSES } from "@/lib/labels";
import type { Ticket, TicketUpdate } from "@/lib/types";

type TicketActionsProps = {
  ticket: Ticket;
};

export function TicketActions({ ticket }: TicketActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function apply(update: TicketUpdate) {
    setError(null);
    startTransition(async () => {
      try {
        await updateTicketAction(ticket.id, update);
      } catch {
        setError("Não foi possível atualizar o ticket.");
      }
    });
  }

  return (
    <section className="panel">
      <h2>Ações</h2>
      <div className="actions">
        <fieldset disabled={isPending}>
          <legend>Status</legend>
          <div className="segmented">
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                aria-pressed={ticket.status === status}
                onClick={() => apply({ status })}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset disabled={isPending}>
          <legend>Prioridade</legend>
          <div className="segmented">
            {PRIORITIES.map((priority) => (
              <button
                key={priority}
                type="button"
                aria-pressed={ticket.priority === priority}
                onClick={() => apply({ priority })}
              >
                {PRIORITY_LABELS[priority]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="actions__status" aria-live="polite">
        {isPending ? "Salvando..." : ""}
      </p>
      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
    </section>
  );
}
