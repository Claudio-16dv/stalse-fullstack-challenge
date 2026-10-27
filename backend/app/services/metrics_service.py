import json
from pathlib import Path
from typing import Any

from app.errors import MetricsNotAvailable


def load_metrics(metrics_path: str) -> Any:
    path = Path(metrics_path)
    if not path.is_file():
        raise MetricsNotAvailable
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise MetricsNotAvailable from error
