FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN useradd --uid 1000 --create-home app && chown app:app /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

USER app

COPY --chown=app:app . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
