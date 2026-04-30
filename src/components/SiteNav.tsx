import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/professionals", label: "Professionals" },
  { to: "/articles", label: "Articles" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-border/60" />
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <Logo />
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary bg-primary-soft/60" }}
                className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary-soft/40 transition-smooth"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth px-4 py-2">
            Log in
          </Link>
          <Link
            to="/role"
            className="bg-gradient-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full shadow-soft hover:shadow-glow transition-smooth"
          >
            Get Started
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-xl hover:bg-muted">
          <Menu className="w-5 h-5" />
        </button>
      </nav>
      {open && (
        <div className="lg:hidden relative bg-background border-b border-border px-6 py-4 space-y-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-muted">
              {l.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-muted">Log in</Link>
          <Link to="/role" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl bg-gradient-primary text-primary-foreground text-center font-semibold">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
