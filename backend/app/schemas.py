from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, model_validator


class Status(StrEnum):
    OPEN = "open"
    PENDING = "pending"
    CLOSED = "closed"


class Priority(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Channel(StrEnum):
    EMAIL = "email"
    CHAT = "chat"
    WHATSAPP = "whatsapp"
    PHONE = "phone"


class TicketEvent(StrEnum):
    CLOSED = "ticket.closed"
    HIGH_PRIORITY = "ticket.high_priority"


class TicketCreate(BaseModel):
    created_at: datetime
    customer_name: str
    channel: Channel
    subject: str
    description: str
    status: Status
    priority: Priority


class Ticket(TicketCreate):
    id: int


class TicketUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: Status | None = None
    priority: Priority | None = None

    @model_validator(mode="after")
    def require_at_least_one_field(self) -> "TicketUpdate":
        if self.status is None and self.priority is None:
            raise ValueError("Informe status ou priority")
        return self
