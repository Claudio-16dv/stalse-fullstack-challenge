import json
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
RAW_PATH = BASE_DIR / "raw" / "customer_support_tickets.csv"
OUTPUT_PATH = BASE_DIR / "processed" / "metrics.json"

DATE_COLUMN = "Date of Purchase"
CATEGORY_COLUMN = "Ticket Type"
STATUS_COLUMN = "Ticket Status"
PRIORITY_COLUMN = "Ticket Priority"
CHANNEL_COLUMN = "Ticket Channel"
USED_COLUMNS = [DATE_COLUMN, CATEGORY_COLUMN, STATUS_COLUMN, PRIORITY_COLUMN, CHANNEL_COLUMN]

TOP_CATEGORIES_LIMIT = 5


def load_tickets(path: Path) -> pd.DataFrame:
    if not path.is_file():
        raise FileNotFoundError(f"Dataset não encontrado em {path}. Veja o README.")
    tickets = pd.read_csv(path, usecols=USED_COLUMNS)
    tickets[DATE_COLUMN] = pd.to_datetime(tickets[DATE_COLUMN], errors="coerce")
    return tickets.dropna(subset=[DATE_COLUMN])


def count_by_day(tickets: pd.DataFrame) -> list[dict]:
    counts = tickets.groupby(tickets[DATE_COLUMN].dt.date).size()
    return [{"date": day.isoformat(), "count": int(count)} for day, count in counts.items()]


def count_by(tickets: pd.DataFrame, column: str, limit: int | None = None) -> list[dict]:
    counts = tickets[column].value_counts()
    if limit is not None:
        counts = counts.head(limit)
    return [{"name": name, "count": int(count)} for name, count in counts.items()]


def build_metrics(tickets: pd.DataFrame) -> dict:
    return {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": RAW_PATH.name,
        "total_tickets": len(tickets),
        "period": {
            "start": tickets[DATE_COLUMN].min().date().isoformat(),
            "end": tickets[DATE_COLUMN].max().date().isoformat(),
        },
        "tickets_per_day": count_by_day(tickets),
        "top_categories": count_by(tickets, CATEGORY_COLUMN, TOP_CATEGORIES_LIMIT),
        "by_status": count_by(tickets, STATUS_COLUMN),
        "by_priority": count_by(tickets, PRIORITY_COLUMN),
        "by_channel": count_by(tickets, CHANNEL_COLUMN),
    }


def save_metrics(metrics: dict, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    tickets = load_tickets(RAW_PATH)
    save_metrics(build_metrics(tickets), OUTPUT_PATH)
    print(f"{len(tickets)} tickets processados -> {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
