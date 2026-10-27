from app.errors import TicketNotFound
from app.repositories.ticket_repository import TicketRepository
from app.schemas import Priority, Status, Ticket, TicketEvent, TicketUpdate


def detect_events(before: Ticket, after: Ticket) -> list[TicketEvent]:
    events = []
    if before.status != after.status and after.status == Status.CLOSED:
        events.append(TicketEvent.CLOSED)
    if before.priority != after.priority and after.priority == Priority.HIGH:
        events.append(TicketEvent.HIGH_PRIORITY)
    return events


class TicketService:
    def __init__(self, repository: TicketRepository) -> None:
        self._repository = repository

    def list_tickets(self) -> list[Ticket]:
        return self._repository.list_all()

    def get_ticket(self, ticket_id: int) -> Ticket:
        ticket = self._repository.get(ticket_id)
        if ticket is None:
            raise TicketNotFound
        return ticket

    def update_ticket(
        self, ticket_id: int, update: TicketUpdate
    ) -> tuple[Ticket, list[TicketEvent]]:
        before = self.get_ticket(ticket_id)
        changes = update.model_dump(mode="json", exclude_none=True)
        after = self._repository.update(ticket_id, changes)
        if after is None:
            raise TicketNotFound
        return after, detect_events(before, after)
