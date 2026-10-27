from app.database import connect
from app.schemas import Ticket, TicketCreate

TICKET_COLUMNS = (
    "created_at",
    "customer_name",
    "channel",
    "subject",
    "description",
    "status",
    "priority",
)


class TicketRepository:
    def __init__(self, database_path: str) -> None:
        self._database_path = database_path

    def count(self) -> int:
        with connect(self._database_path) as connection:
            return connection.execute("SELECT COUNT(*) FROM tickets").fetchone()[0]

    def list_all(self) -> list[Ticket]:
        with connect(self._database_path) as connection:
            rows = connection.execute(
                "SELECT * FROM tickets ORDER BY created_at DESC, id DESC"
            ).fetchall()
        return [Ticket(**row) for row in rows]

    def get(self, ticket_id: int) -> Ticket | None:
        with connect(self._database_path) as connection:
            row = connection.execute(
                "SELECT * FROM tickets WHERE id = ?", (ticket_id,)
            ).fetchone()
        return Ticket(**row) if row else None

    def insert_many(self, tickets: list[TicketCreate]) -> None:
        placeholders = ", ".join("?" for _ in TICKET_COLUMNS)
        query = f"INSERT INTO tickets ({', '.join(TICKET_COLUMNS)}) VALUES ({placeholders})"
        values = [
            (
                ticket.created_at.isoformat(),
                ticket.customer_name,
                ticket.channel.value,
                ticket.subject,
                ticket.description,
                ticket.status.value,
                ticket.priority.value,
            )
            for ticket in tickets
        ]
        with connect(self._database_path) as connection:
            connection.executemany(query, values)

    def update(self, ticket_id: int, changes: dict[str, str]) -> Ticket | None:
        assignments = ", ".join(f"{column} = ?" for column in changes)
        with connect(self._database_path) as connection:
            connection.execute(
                f"UPDATE tickets SET {assignments} WHERE id = ?",
                (*changes.values(), ticket_id),
            )
            row = connection.execute(
                "SELECT * FROM tickets WHERE id = ?", (ticket_id,)
            ).fetchone()
        return Ticket(**row) if row else None
