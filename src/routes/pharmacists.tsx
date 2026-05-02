import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import {
  Search, Bell, ShoppingCart, MapPin, ChevronDown, Star, Phone,
  Pill, Home, Stethoscope, ShoppingBag, Calendar, MessageSquare,
  Activity, BookOpen, Heart, Settings, LogOut, Zap, ArrowRight,
  ShieldCheck, Clock, Award,
} from "lucide-react";

export const Route = createFileRoute("/pharmacists")({
  head: () => ({ meta: [{ title: "Pharmacist Advising — EVE" }] }),
  component: PharmacistsPage,
});

type Pharmacist = {
  id: number;
  name: string;
  initials: string;
  phone: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  specialty: string;
  available: boolean;
  tone: string;
};

const pharmacists: Pharmacist[] = [
  { id: 1, name: "Dr. Layla Al-Rashid", initials: "LR", phone: "+966 50 123 4567", location: "Al Olaya, Riyadh", rating: 4.9, reviews: 412, experience: "12 yrs", specialty: "Clinical Pharmacy", available: true, tone: "from-primary-soft to-card" },
  { id: 2, name: "Dr. Mohammed Hassan", initials: "MH", phone: "+966 55 987 6543", location: "Al Hamra, Jeddah", rating: 4.8, reviews: 318, experience: "9 yrs", specialty: "Bariatric Medication", available: true, tone: "from-coral-soft to-card" },
  { id: 3, name: "Dr. Fatima Noor", initials: "FN", phone: "+966 53 456 7890", location: "Al Khobar Corniche", rating: 4.95, reviews: 528, experience: "15 yrs", specialty: "Pediatric Pharmacy", available: false, tone: "from-mint to-card" },
  { id: 4, name: "Dr. Ahmed Saleh", initials: "AS", phone: "+966 56 234 5678", location: "Al Malaz, Riyadh", rating: 4.7, reviews: 256, experience: "7 yrs", specialty: "Dermatology Care", available: true, tone: "from-beige to-card" },
  { id: 5, name: "Dr. Sara Khaled", initials: "SK", phone: "+966 54 345 6789", location: "Al Andalus, Jeddah", rating: 4.85, reviews: 389, experience: "10 yrs", specialty: "Women's Health", available: true, tone: "from-rose to-card" },
  { id: 6, name: "Dr. Omar Bilal", initials: "OB", phone: "+966 58 567 8901", location: "Al Rawdah, Riyadh", rating: 4.75, reviews: 201, experience: "6 yrs", specialty: "Diabetes & Cardio", available: true, tone: "from-primary-soft to-card" },
];

const sidebarItems = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: Stethoscope, label: "Consultations", to: "/consultations" },
  { icon: Pill, label: "Pharmacists", to: "/pharmacists", active: true },
  { icon: ShoppingBag, label: "Marketplace", to: "/marketplace" },
  { icon: Calendar, label: "Appointments", to: "/dashboard" },
  { icon: Activity, label: "Health Tracker", to: "/dashboard" },
  { icon: MessageSquare, label: "Messages", to: "/dashboard", badge: 4 },
  { icon: BookOpen, label: "Articles", to: "/articles" },
  { icon: Heart, label: "Favorites", to: "/dashboard" },
];

function PharmacistsPage() {
  const [query, setQuery] = useState("");
  const list = pharmacists.filter((p) =>
    [p.name, p.specialty, p.location].some((f) => f.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashHeader />
        <main className="flex-1 px-6 lg:px-10 py-8 space-y-8">
          <header className="animate-fade-up">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-3">
                  <Pill className="w-3 h-3" /> Pharmacist Advising
                </div>
                <h1 className="font-display font-extrabold text-3xl lg:text-4xl tracking-tight">
                  Talk to a <span className="text-gradient-primary">trusted pharmacist</span>
                </h1>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  Get personalised medication advice, dosage support and refill help — anytime.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatChip icon={ShieldCheck} label="Licensed" />
                <StatChip icon={Clock} label="24/7" />
                <StatChip icon={Award} label="Top rated" />
              </div>
            </div>

            <div className="mt-6 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, specialty or location…"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-muted border border-transparent focus:bg-card focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth text-sm"
              />
            </div>
          </header>

          <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {list.map((p, i) => (
              <PharmacistCard key={p.id} p={p} delay={i * 80} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

function PharmacistCard({ p, delay }: { p: Pharmacist; delay: number }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 hover-lift shadow-card animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`h-24 bg-gradient-to-br ${p.tone} relative`}>
        <div className="absolute top-3 right-3">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              p.available
                ? "bg-mint text-primary border border-primary/20"
                : "bg-coral-soft text-coral border border-coral/30"
            }`}
          >
            {p.available ? "● Available now" : "● Busy"}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 -mt-10">
        <div className="w-20 h-20 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground font-display font-extrabold text-2xl shadow-elegant border-4 border-card">
          {p.initials}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-lg leading-tight">{p.name}</h3>
            <p className="text-xs text-primary font-semibold mt-0.5">{p.specialty}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-beige/60">
            <Star className="w-3.5 h-3.5 fill-[oklch(0.8_0.18_85)] text-[oklch(0.8_0.18_85)]" />
            <span className="text-xs font-bold">{p.rating}</span>
            <span className="text-[10px] text-muted-foreground">({p.reviews})</span>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">{p.phone}</span>
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-coral shrink-0" />
            <span>{p.location}</span>
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <Award className="w-4 h-4 text-primary shrink-0" />
            <span>{p.experience} experience</span>
          </li>
        </ul>

        <div className="mt-5 flex items-center gap-2">
          <Link
            to="/pharmacist-order"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-95 transition-smooth shadow-soft text-sm"
          >
            Order Now <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="w-11 h-11 grid place-items-center rounded-xl bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function StatChip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/60 text-xs font-semibold">
      <Icon className="w-3.5 h-3.5 text-primary" /> {label}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border/60 bg-card/40 backdrop-blur-xl sticky top-0 h-screen">
      <div className="px-6 h-20 flex items-center border-b border-border/60">
        <Logo />
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold px-3 mb-2 mt-2">Main</div>
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
              item.active
                ? "bg-gradient-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-primary-soft hover:text-primary"
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral text-coral-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold px-3 mb-2 mt-6">Account</div>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-primary-soft hover:text-primary transition-smooth">
          <Settings className="w-5 h-5" /> Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-coral-soft hover:text-coral transition-smooth">
          <LogOut className="w-5 h-5" /> Sign out
        </button>
      </nav>

      <div className="m-4 p-5 rounded-2xl bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-coral/30 rounded-full blur-2xl" />
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-white/20 grid place-items-center mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <div className="font-display font-bold text-sm mb-1">Upgrade to EVE+</div>
          <div className="text-[11px] text-primary-foreground/80 mb-3 leading-snug">Unlock premium consultations & exclusive deals.</div>
          <button className="w-full text-xs font-bold bg-card text-primary py-2 rounded-lg hover:bg-coral hover:text-coral-foreground transition-smooth">
            Upgrade now
          </button>
        </div>
      </div>
    </aside>
  );
}

function DashHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="px-6 lg:px-10 h-20 flex items-center gap-4">
        <div className="lg:hidden"><Logo /></div>
        <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted hover:bg-primary-soft transition-smooth text-sm font-medium">
          <MapPin className="w-4 h-4 text-coral" />
          <span>Jeddah, KSA</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search pharmacists, medications…"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-muted border border-transparent focus:bg-card focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth text-sm"
          />
        </div>
        <button className="relative w-10 h-10 grid place-items-center rounded-full bg-muted hover:bg-primary-soft transition-smooth">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-coral-foreground text-[10px] font-bold rounded-full grid place-items-center">3</span>
        </button>
        <button className="relative w-10 h-10 grid place-items-center rounded-full bg-muted hover:bg-primary-soft transition-smooth">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full animate-pulse" />
        </button>
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-muted hover:bg-primary-soft transition-smooth">
          <div className="w-8 h-8 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold text-sm">SK</div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold leading-tight">Sarah Khalid</div>
            <div className="text-[10px] text-muted-foreground">Premium</div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
