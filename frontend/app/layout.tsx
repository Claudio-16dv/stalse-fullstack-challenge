import type { Metadata } from "next";

import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Inbox",
  description: "Gestão simples de tickets de suporte",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
