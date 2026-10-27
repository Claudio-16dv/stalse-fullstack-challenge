import Link from "next/link";

import { NavLink } from "@/components/NavLink";

const API_DOCS_URL = process.env.API_DOCS_URL ?? "http://localhost:8000/docs";

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/tickets" className="header__brand">
          <span className="header__logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M3 7h18v10h-6l-3 3-3-3H3z" fill="currentColor" />
            </svg>
          </span>
          Mini Inbox
        </Link>
        <nav aria-label="Principal" className="nav">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/tickets">Tickets</NavLink>
          <a href={API_DOCS_URL} target="_blank" rel="noreferrer" className="nav__link">
            API
            <span className="visually-hidden"> (abre em nova aba)</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
