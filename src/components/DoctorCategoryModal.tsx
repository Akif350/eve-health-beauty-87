import { Link } from "@tanstack/react-router";
import {
  X,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Baby,
  Scissors,
  Apple,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Category = {
  name: string;
  desc: string;
  Icon: LucideIcon;
  tint: string; // bg utility for icon chip
  ring: string; // ring color utility on hover
};

const beauty: Category[] = [
  {
    name: "Dermatologist",
    desc: "Skin & cosmetic",
    Icon: Sparkles,
    tint: "bg-primary-soft text-primary",
    ring: "group-hover:ring-primary/40",
  },
  {
    name: "Andrology",
    desc: "Men's health",
    Icon: Stethoscope,
    tint: "bg-mint text-foreground",
    ring: "group-hover:ring-primary/40",
  },
  {
    name: "OB / GYN",
    desc: "Women & maternity",
    Icon: Baby,
    tint: "bg-coral-soft text-coral",
    ring: "group-hover:ring-coral/40",
  },
];

const bariatric: Category[] = [
  {
    name: "Surgery",
    desc: "Weight-loss procedures",
    Icon: Scissors,
    tint: "bg-rose text-coral",
    ring: "group-hover:ring-coral/40",
  },
  {
    name: "Nutrition",
    desc: "Diet & lifestyle",
    Icon: Apple,
    tint: "bg-beige text-foreground",
    ring: "group-hover:ring-primary/40",
  },
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
      className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-cat-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-md"
      />

      <div className="relative w-full max-w-md bg-card rounded-[1.75rem] shadow-elegant border border-border/60 overflow-hidden animate-fade-up max-h-[92vh] flex flex-col">
        {/* Hero header */}
        <div className="relative bg-gradient-primary px-6 pt-6 pb-10 text-primary-foreground overflow-hidden">
          <div className="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-white/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-coral/30 blur-3xl pointer-events-none" />

          <div className="relative flex items-start justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-[10.5px] font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-3 h-3" /> Verified Specialists
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 grid place-items-center rounded-full bg-white/15 hover:bg-white/30 transition-smooth"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2
            id="doctor-cat-title"
            className="relative font-display font-extrabold text-[1.6rem] leading-tight mt-4"
          >
            Doctor Consultation
          </h2>
          <p className="relative text-[12.5px] text-primary-foreground/85 mt-1.5 max-w-[18rem]">
            Choose a specialty and book a session with our top-rated doctors.
          </p>
        </div>

        {/* Body */}
        <div className="relative -mt-5 bg-card rounded-t-[1.75rem] px-5 pt-5 pb-5 overflow-y-auto">
          <Section title="Beauty Medical Center" hint="Aesthetic & wellness">
            {beauty.map((c, i) => (
              <CategoryRow key={c.name} cat={c} delay={i * 50} onPick={onClose} />
            ))}
          </Section>

          <Section title="Bariatric" hint="Weight management" className="mt-5">
            {bariatric.map((c, i) => (
              <CategoryRow key={c.name} cat={c} delay={i * 50} onPick={onClose} />
            ))}
          </Section>

          <Link
            to="/consultations"
            onClick={onClose}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-semibold py-3.5 rounded-2xl hover:opacity-95 transition-smooth shadow-soft text-[13px]"
          >
            View all doctors <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={onClose}
            className="mt-2 w-full text-center text-[12px] text-muted-foreground hover:text-foreground transition-smooth py-1"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
  className = "",
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between mb-2.5 px-0.5">
        <h3 className="font-display font-bold text-[13.5px] tracking-tight">
          {title}
        </h3>
        {hint && (
          <span className="text-[10.5px] text-muted-foreground font-medium">
            {hint}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function CategoryRow({
  cat,
  delay,
  onPick,
}: {
  cat: Category;
  delay: number;
  onPick: () => void;
}) {
  const { Icon } = cat;
  return (
    <Link
      to="/consultations"
      onClick={onPick}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative flex items-center gap-3 p-3 rounded-2xl bg-gradient-soft border border-border/50 ring-1 ring-transparent ${cat.ring} hover:border-primary/30 transition-smooth animate-fade-up`}
    >
      <div
        className={`w-11 h-11 grid place-items-center rounded-xl ${cat.tint} shadow-soft group-hover:scale-105 transition-smooth shrink-0`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-bold text-[13.5px] text-foreground leading-tight">
          {cat.name}
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
          {cat.desc}
        </div>
      </div>
      <div className="w-7 h-7 grid place-items-center rounded-full bg-card border border-border/60 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth">
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
