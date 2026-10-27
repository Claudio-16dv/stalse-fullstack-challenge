import sqlite3
from collections.abc import Iterator
from contextlib import contextmanager

TICKETS_SCHEMA = """
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    channel TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    priority TEXT NOT NULL
)
"""


@contextmanager
def connect(database_path: str) -> Iterator[sqlite3.Connection]:
    connection = sqlite3.connect(database_path)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def init_db(database_path: str) -> None:
    with connect(database_path) as connection:
        connection.execute(TICKETS_SCHEMA)
