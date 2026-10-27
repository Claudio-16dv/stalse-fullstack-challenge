from typing import Annotated

from fastapi import Depends

from app.config import Settings, get_settings
from app.repositories.ticket_repository import TicketRepository
from app.services.ticket_service import TicketService
from app.services.webhook_service import WebhookNotifier

SettingsDep = Annotated[Settings, Depends(get_settings)]


def get_ticket_service(settings: SettingsDep) -> TicketService:
    return TicketService(TicketRepository(settings.database_path))


def get_webhook_notifier(settings: SettingsDep) -> WebhookNotifier:
    return WebhookNotifier(settings.n8n_webhook_url, settings.webhook_timeout_seconds)


TicketServiceDep = Annotated[TicketService, Depends(get_ticket_service)]
WebhookNotifierDep = Annotated[WebhookNotifier, Depends(get_webhook_notifier)]
