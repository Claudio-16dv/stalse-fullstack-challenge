import { BarList } from "@/components/BarList";
import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { ApiError, getMetrics } from "@/lib/api";
import { formatDate, formatDateTime, formatNumber } from "@/lib/format";
import { translateMetric } from "@/lib/labels";
import type { Metrics, NamedCount } from "@/lib/types";

const RECENT_DAYS = 14;

async function loadMetrics(): Promise<Metrics | null> {
  try {
    return await getMetrics();
  } catch (error) {
    if (error instanceof ApiError && error.status === 503) {
      return null;
    }
    throw error;
  }
}

function translateAll(items: NamedCount[]): NamedCount[] {
  return items.map((item) => ({ ...item, name: translateMetric(item.name) }));
}

export default async function DashboardPage() {
  const metrics = await loadMetrics();

  if (!metrics) {
    return (
      <>
        <PageHeader title="Dashboard" />
        <section className="panel">
          <p className="empty">
            Métricas indisponíveis. Execute o ETL com <code>docker compose run --rm etl</code>.
          </p>
        </section>
      </>
    );
  }

  const recentDays = metrics.tickets_per_day.slice(-RECENT_DAYS).reverse();
  const maxDay = Math.max(...recentDays.map((day) => day.count), 1);
  const topCategory = metrics.top_categories[0];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Métricas do dataset de suporte do Kaggle, geradas pelo ETL em pandas."
      />

      <div className="cards">
        <MetricCard label="Total de tickets" value={formatNumber(metrics.total_tickets)} />
        <MetricCard label="Início do período" value={formatDate(metrics.period.start)} />
        <MetricCard label="Fim do período" value={formatDate(metrics.period.end)} />
        <MetricCard
          label="Categoria líder"
          value={topCategory ? translateMetric(topCategory.name) : "-"}
          compact
          hint={topCategory ? `${formatNumber(topCategory.count)} tickets` : undefined}
        />
      </div>

      <div className="grid">
        <BarList title="Top categorias" items={translateAll(metrics.top_categories)} />
        <BarList title="Por status" items={translateAll(metrics.by_status)} />
        <BarList title="Por prioridade" items={translateAll(metrics.by_priority)} />
        <BarList title="Por canal" items={translateAll(metrics.by_channel)} />
      </div>

      <section className="panel panel--flush">
        <div className="panel__title">
          <h2>Tickets por dia (últimos {RECENT_DAYS} dias do período)</h2>
          <p className="panel__subtitle">A barra compara cada dia com o dia de maior volume.</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col" className="day-count-header">
                  Tickets
                </th>
              </tr>
            </thead>
            <tbody>
              {recentDays.map((day) => (
                <tr key={day.date}>
                  <td className="nowrap">{formatDate(day.date)}</td>
                  <td>
                    <div className="day-count">
                      <span className="day-count__value">{formatNumber(day.count)}</span>
                      <div className="bar-list__track" aria-hidden="true">
                        <div
                          className="bar-list__fill"
                          style={{ width: `${(day.count / maxDay) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="source">
        Fonte: {metrics.source} (Kaggle). Gerado em {formatDateTime(metrics.generated_at)}.
      </p>
    </>
  );
}
