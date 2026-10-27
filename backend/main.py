from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import init_db
from app.errors import register_error_handlers
from app.repositories.ticket_repository import TicketRepository
from app.routers import health, metrics, tickets
from app.services.seed_service import seed_tickets

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    init_db(settings.database_path)
    seed_tickets(TicketRepository(settings.database_path), settings.seeds_path)
    yield


app = FastAPI(
    title="Mini Inbox API",
    description="API de tickets de suporte com métricas geradas pelo ETL.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET", "PATCH"],
    allow_headers=["*"],
)

register_error_handlers(app)
app.include_router(health.router)
app.include_router(tickets.router)
app.include_router(metrics.router)
