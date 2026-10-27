from fastapi import APIRouter, BackgroundTasks

from app.dependencies import TicketServiceDep, WebhookNotifierDep
from app.schemas import Ticket, TicketUpdate

router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.get("", summary="Listar tickets")
def list_tickets(service: TicketServiceDep) -> list[Ticket]:
    return service.list_tickets()


@router.get("/{ticket_id}", summary="Detalhar um ticket")
def get_ticket(ticket_id: int, service: TicketServiceDep) -> Ticket:
    return service.get_ticket(ticket_id)


@router.patch("/{ticket_id}", summary="Alterar status ou prioridade")
def update_ticket(
    ticket_id: int,
    update: TicketUpdate,
    service: TicketServiceDep,
    notifier: WebhookNotifierDep,
    background_tasks: BackgroundTasks,
) -> Ticket:
    ticket, events = service.update_ticket(ticket_id, update)
    # Eventos de webhook enviados depois da resposta
    for event in events:
        background_tasks.add_task(notifier.notify, event, ticket)
    return ticket
