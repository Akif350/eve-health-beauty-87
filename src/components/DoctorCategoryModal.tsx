import { Link } from "@tanstack/react-router";
import { X, ArrowRight, Sparkles } from "lucide-react";

type Category = {
  name: string;
  emoji: string;
  tone: string;
};

const beauty: Category[] = [
  { name: "Dermatologist", emoji: "👩‍⚕️", tone: "from-primary-soft to-card" },
  { name: "Andrologies", emoji: "🧑‍⚕️", tone: "from-coral-soft to-card" },
  { name: "OB / GYN", emoji: "🤱", tone: "from-mint to-card" },
];

const bariatric: Category[] = [
  { name: "Surgery", emoji: "🩺", tone: "from-rose to-card" },
  { name: "Nutrition", emoji: "🥗", tone: "from-beige to-card" },
];

export function DoctorCategoryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-cat-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg bg-card rounded-[2rem] shadow-elegant border border-border/60 overflow-hidden animate-fade-up">
        {/* Decorative gradient header */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-coral/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-7">
          <div className="flex items-start justify-between mb-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-[11px] font-semibold">
              <Sparkles className="w-3 h-3" /> Choose Specialty
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 grid place-items-center rounded-full bg-muted hover:bg-coral-soft hover:text-coral transition-smooth"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2
            id="doctor-cat-title"
            className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight mt-3"
          >
            Doctor <span className="text-gradient-primary">Consultation</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a category to see top verified specialists.
          </p>

          <CategoryBlock title="Beauty Medical Center" items={beauty} onPick={onClose} />
          <CategoryBlock title="Bariatric" items={bariatric} onPick={onClose} />

          <Link
            to="/consultations"
            onClick={onClose}
            className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-semibold py-3.5 rounded-2xl hover:opacity-95 transition-smooth shadow-soft text-sm"
          >
            View all doctors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoryBlock({
  title,
  items,
  onPick,
}: {
  title: string;
  items: Category[];
  onPick: () => void;
}) {
  return (
    <div className="mt-6">
      <h3 className="font-display font-bold text-base mb-3">{title}</h3>
      <div className="grid grid-cols-3 gap-3">
        {items.map((c, i) => (
          <Link
            key={c.name}
            to="/consultations"
            onClick={onPick}
            className={`group relative overflow-hidden rounded-2xl p-3 bg-gradient-to-br ${c.tone} border border-border/40 hover-lift animate-fade-up text-center`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="aspect-square rounded-xl bg-card/70 backdrop-blur grid place-items-center text-3xl mb-2 group-hover:scale-105 transition-smooth">
              {c.emoji}
            </div>
            <div className="text-[11px] font-semibold text-foreground leading-tight">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
