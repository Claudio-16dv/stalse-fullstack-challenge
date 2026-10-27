export type Status = "open" | "pending" | "closed";
export type Priority = "low" | "medium" | "high";
export type Channel = "email" | "chat" | "whatsapp" | "phone";

export type Ticket = {
  id: number;
  created_at: string;
  customer_name: string;
  channel: Channel;
  subject: string;
  description: string;
  status: Status;
  priority: Priority;
};

export type TicketUpdate = {
  status?: Status;
  priority?: Priority;
};

export type NamedCount = {
  name: string;
  count: number;
};

export type DailyCount = {
  date: string;
  count: number;
};

export type Metrics = {
  generated_at: string;
  source: string;
  total_tickets: number;
  period: { start: string; end: string };
  tickets_per_day: DailyCount[];
  top_categories: NamedCount[];
  by_status: NamedCount[];
  by_priority: NamedCount[];
  by_channel: NamedCount[];
};
