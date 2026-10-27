type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  compact?: boolean;
};

export function MetricCard({ label, value, hint, compact = false }: MetricCardProps) {
  return (
    <div className="card">
      <p className="card__label">{label}</p>
      <p className={compact ? "card__value card__value--compact" : "card__value"}>{value}</p>
      {hint && <p className="card__hint">{hint}</p>}
    </div>
  );
}
