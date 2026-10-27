import { PageHeader } from "@/components/PageHeader";
import { TicketsTable } from "@/components/TicketsTable";
import { getTickets } from "@/lib/api";
import { STATUS_LABELS, STATUSES } from "@/lib/labels";

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <>
      <PageHeader title="Tickets" description="Acompanhe e atualize os chamados de suporte.">
        <ul className="summary" aria-label="Resumo por status">
          {STATUSES.map((status) => (
            <li key={status} className={`summary__item summary__item--${status}`}>
              <span>{STATUS_LABELS[status]}</span>
              <strong>{tickets.filter((ticket) => ticket.status === status).length}</strong>
            </li>
          ))}
        </ul>
      </PageHeader>
      <TicketsTable tickets={tickets} />
    </>
  );
}
