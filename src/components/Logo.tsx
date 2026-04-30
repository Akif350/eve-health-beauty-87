import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="relative">
        <div className="w-9 h-9 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft group-hover:shadow-glow transition-smooth">
          <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
        </div>
        <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-smooth -z-10" />
      </div>
      <div className="leading-tight">
        <div className="font-display font-extrabold text-lg tracking-tight">EVE</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">Marketplace</div>
      </div>
    </Link>
  );
}
