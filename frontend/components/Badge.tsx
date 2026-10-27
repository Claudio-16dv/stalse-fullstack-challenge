import { PRIORITY_LABELS, STATUS_LABELS } from "@/lib/labels";
import type { Priority, Status } from "@/lib/types";

type BadgeProps = {
  value: Status | Priority;
};

const LABELS: Record<Status | Priority, string> = {
  ...STATUS_LABELS,
  ...PRIORITY_LABELS,
};

export function Badge({ value }: BadgeProps) {
  return <span className={`badge badge--${value}`}>{LABELS[value]}</span>;
}
