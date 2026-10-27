import os
from dataclasses import dataclass
from functools import lru_cache


@dataclass(frozen=True)
class Settings:
    database_path: str
    seeds_path: str
    metrics_path: str
    cors_origins: list[str]
    ticket_webhook_url: str
    webhook_timeout_seconds: float


@lru_cache
def get_settings() -> Settings:
    return Settings(
        database_path=os.getenv("DATABASE_PATH", "db.sqlite"),
        seeds_path=os.getenv("SEEDS_PATH", "seeds/tickets.json"),
        metrics_path=os.getenv("METRICS_PATH", "../data/processed/metrics.json"),
        cors_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
        ticket_webhook_url=os.getenv("TICKET_WEBHOOK_URL", "http://localhost:5678/webhook/ticket-events"),
        webhook_timeout_seconds=float(os.getenv("WEBHOOK_TIMEOUT_SECONDS", "3")),
    )
