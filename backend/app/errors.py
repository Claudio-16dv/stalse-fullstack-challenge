from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


class TicketNotFound(Exception):
    pass


class MetricsNotAvailable(Exception):
    pass


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(TicketNotFound)
    def handle_ticket_not_found(request: Request, exc: TicketNotFound) -> JSONResponse:
        return JSONResponse(status_code=404, content={"detail": "Ticket não encontrado"})

    @app.exception_handler(MetricsNotAvailable)
    def handle_metrics_not_available(
        request: Request, exc: MetricsNotAvailable
    ) -> JSONResponse:
        return JSONResponse(
            status_code=503,
            content={"detail": "Métricas indisponíveis. Execute o ETL primeiro"},
        )
