"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Películas", href: "/" },
  { label: "Cines", href: "#" },
  { label: "Promociones", href: "#" },
  { label: "Socio", href: "#" },
  { label: "Dulcería", href: "/dulceria" },
  { label: "Corporativo", href: "#" },
  { label: "Blog", href: "#" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="Cine de Santiago">
          <Logo />
        </Link>

        <button
          className="hamburger"
          aria-label="Menú"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={"primary-nav" + (open ? " open" : "")}>
          {NAV_ITEMS.map((item) => {
            const isReal = item.href !== "#";
            const active = isReal && pathname === item.href;
            const className = "nav-link" + (active ? " active" : "");
            return isReal ? (
              <Link
                key={item.label}
                href={item.href}
                className={className}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href="#" className={className}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link href="/login" className="action-btn" aria-label="Cuenta">
            <span className="action-badge">Únete</span>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </Link>
          <button className="action-btn" aria-label="Buscar">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </button>
          <button className="action-btn" aria-label="Ayuda">
            <span className="action-badge">Ayuda</span>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7" />
              <circle cx="12" cy="17" r="0.6" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
