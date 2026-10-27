from typing import Any

from fastapi import APIRouter

from app.dependencies import SettingsDep
from app.services.metrics_service import load_metrics

router = APIRouter(prefix="/metrics", tags=["Métricas"])


@router.get("", summary="Retornar as métricas do ETL")
def get_metrics(settings: SettingsDep) -> Any:
    return load_metrics(settings.metrics_path)
