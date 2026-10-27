import logging

import httpx

from app.schemas import Ticket, TicketEvent

logger = logging.getLogger(__name__)


class WebhookNotifier:
    def __init__(self, url: str, timeout_seconds: float) -> None:
        self._url = url
        self._timeout_seconds = timeout_seconds

    def notify(self, event: TicketEvent, ticket: Ticket) -> None:
        if not self._url:
            return
        payload = {"event": event.value, "ticket": ticket.model_dump(mode="json")}
        try:
            response = httpx.post(self._url, json=payload, timeout=self._timeout_seconds)
            response.raise_for_status()
        except httpx.HTTPError as error:
            logger.warning("Falha ao notificar webhook (%s): %s", event.value, error)
