"use server";

import { revalidatePath } from "next/cache";

import { updateTicket } from "@/lib/api";
import type { TicketUpdate } from "@/lib/types";

export async function updateTicketAction(id: number, update: TicketUpdate): Promise<void> {
  await updateTicket(id, update);
  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);
}
