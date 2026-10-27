import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/Badge";
import { TicketActions } from "@/components/TicketActions";
import { ApiError, getTicket } from "@/lib/api";
import { formatDateTime } from "@/lib/format";
import { CHANNEL_LABELS } from "@/lib/labels";
import type { Ticket } from "@/lib/types";

async function loadTicket(rawId: string): Promise<Ticket> {
  const id = Number(rawId);
  if (!Number.isInteger(id)) {
    notFound();
  }
  try {
    return await getTicket(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}

export default async function TicketDetailPage(props: PageProps<"/tickets/[id]">) {
  const { id } = await props.params;
  const ticket = await loadTicket(id);

  return (
    <>
      <Link href="/tickets" className="back-link">
        &larr; Voltar para tickets
      </Link>

      <div className="page-header">
        <div>
          <p className="page-header__eyebrow">Ticket #{ticket.id}</p>
          <h1>{ticket.subject}</h1>
        </div>
        <div className="badges">
          <Badge value={ticket.status} />
          <Badge value={ticket.priority} />
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-layout__main">
          <section className="panel">
            <h2>Descrição</h2>
            <p className="description">{ticket.description}</p>
          </section>

          <TicketActions ticket={ticket} />
        </div>

        <aside className="panel">
          <h2>Informações</h2>
          <dl className="details">
            <div>
              <dt>Cliente</dt>
              <dd>{ticket.customer_name}</dd>
            </div>
            <div>
              <dt>Canal</dt>
              <dd>{CHANNEL_LABELS[ticket.channel]}</dd>
            </div>
            <div>
              <dt>Criado em</dt>
              <dd>{formatDateTime(ticket.created_at)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
