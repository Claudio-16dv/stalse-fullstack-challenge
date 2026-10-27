import { formatNumber } from "@/lib/format";
import type { NamedCount } from "@/lib/types";

type BarListProps = {
  title: string;
  items: NamedCount[];
};

export function BarList({ title, items }: BarListProps) {
  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <section className="panel">
      <h2>{title}</h2>
      <ul className="bar-list">
        {items.map((item) => (
          <li key={item.name}>
            <div className="bar-list__header">
              <span>{item.name}</span>
              <strong>{formatNumber(item.count)}</strong>
            </div>
            <div className="bar-list__track" aria-hidden="true">
              <div
                className="bar-list__fill"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
