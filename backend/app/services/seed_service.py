import json
from pathlib import Path

from pydantic import TypeAdapter

from app.repositories.ticket_repository import TicketRepository
from app.schemas import TicketCreate

tickets_adapter = TypeAdapter(list[TicketCreate])


def seed_tickets(repository: TicketRepository, seeds_path: str) -> None:
    if repository.count() > 0:
        return
    raw_tickets = json.loads(Path(seeds_path).read_text(encoding="utf-8"))
    repository.insert_many(tickets_adapter.validate_python(raw_tickets))
