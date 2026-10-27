FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /data

RUN useradd --uid 1000 --create-home app && chown app:app /data

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

USER app

CMD ["python", "etl.py"]
