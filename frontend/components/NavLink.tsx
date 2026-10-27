"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={isActive ? "nav__link nav__link--active" : "nav__link"}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
