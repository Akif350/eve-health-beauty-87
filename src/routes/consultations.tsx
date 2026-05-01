import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  Search, Bell, ShoppingCart, MapPin, ChevronDown, Star,
  Stethoscope, Calendar, MessageSquare, Activity, Settings, LogOut,
  Home, ShoppingBag, BookOpen, Heart, Zap, Clock, Languages,
  Award, Briefcase, CheckCircle2, XCircle, Filter, ArrowRight,
  Video, Sparkles,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/consultations")({
  head: () => ({
    meta: [
      { title: "My Consultations — EVE" },
      { name: "description", content: "Manage your doctor consultations — confirmed, completed, or cancelled." },
    ],
  }),
  component: ConsultationsPage,
});

type Status = "Confirmed" | "Completed" | "Cancelled";

const doctors: {
  init: string;
  name: string;
  category: string;
  location: string;
  date: string;
  time: string;
  status: Status;
  expertise: string[];
  language: string[];
  experience: string;
  rating: number;
  reviews: number;
  fee: number;
  tone: string;
}[] = [
  {
    init: "SK", name: "Dr. Sarah Khalid", category: "Dermatologist",
    location: "Jeddah, KSA", date: "12 May 2026", time: "10:30 AM",
    status: "Confirmed",
    expertise: ["Acne", "Anti-aging", "Pigmentation"],
    language: ["English", "Arabic"], experience: "12+ yrs",
    rating: 4.9, reviews: 412, fee: 250,
    tone: "from-primary-soft to-card",
  },
  {
    init: "ON", name: "Dr. Omar Al-Najjar", category: "Bariatric Surgeon",
    location: "Riyadh, KSA", date: "08 May 2026", time: "02:00 PM",
    status: "Completed",
    expertise: ["Gastric Sleeve", "Weight Mgmt"],
    language: ["Arabic", "English"], experience: "15+ yrs",
    rating: 4.8, reviews: 318, fee: 350,
    tone: "from-coral-soft to-card",
  },
  {
    init: "LH", name: "Dr. Layla Hassan", category: "Nutritionist",
    location: "Jeddah, KSA", date: "15 May 2026", time: "11:00 AM",
    status: "Confirmed",
    expertise: ["Keto Plans", "Diabetic Diet", "PCOS"],
    language: ["English", "Arabic", "Urdu"], experience: "8+ yrs",
    rating: 5.0, reviews: 287, fee: 180,
    tone: "from-mint to-card",
  },
  {
    init: "FM", name: "Dr. Faisal Mansour", category: "Endocrinologist",
    location: "Dammam, KSA", date: "02 May 2026", time: "04:30 PM",
    status: "Cancelled",
    expertise: ["Thyroid", "Diabetes", "Hormones"],
    language: ["Arabic", "English"], experience: "10+ yrs",
    rating: 4.7, reviews: 199, fee: 280,
    tone: "from-beige to-card",
  },
  {
    init: "NA", name: "Dr. Noor Abdullah", category: "Pharmacist Consult",
    location: "Online", date: "14 May 2026", time: "06:00 PM",
    status: "Confirmed",
    expertise: ["Rx Review", "Drug Interactions"],
    language: ["English", "Arabic"], experience: "6+ yrs",
    rating: 4.9, reviews: 524, fee: 90,
    tone: "from-primary-soft to-card",
  },
  {
    init: "KO", name: "Dr. Khalid Al-Otaibi", category: "Plastic Surgeon",
    location: "Riyadh, KSA", date: "28 Apr 2026", time: "01:00 PM",
    status: "Completed",
    expertise: ["Rhinoplasty", "Liposuction"],
    language: ["Arabic", "English", "French"], experience: "18+ yrs",
    rating: 4.8, reviews: 256, fee: 400,
    tone: "from-coral-soft to-card",
  },
];

const filters: ("All" | Status)[] = ["All", "Confirmed", "Completed", "Cancelled"];

const sidebarItems = [
  { icon: Home, label: "Dashboard", to: "/dashboard" as const },
  { icon: Stethoscope, label: "Consultations", to: "/consultations" as const, active: true },
  { icon: ShoppingBag, label: "Marketplace", to: "/marketplace" as const },
  { icon: Calendar, label: "Appointments", to: "/dashboard" as const },
  { icon: Activity, label: "Health Tracker", to: "/dashboard" as const },
  { icon: MessageSquare, label: "Messages", to: "/dashboard" as const, badge: 4 },
  { icon: BookOpen, label: "Articles", to: "/articles" as const },
  { icon: Heart, label: "Favorites", to: "/dashboard" as const },
];

function ConsultationsPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? doctors : doctors.filter((d) => d.status === active);

  const counts = {
    All: doctors.length,
    Confirmed: doctors.filter((d) => d.status === "Confirmed").length,
    Completed: doctors.filter((d) => d.status === "Completed").length,
    Cancelled: doctors.filter((d) => d.status === "Cancelled").length,
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashHeader />
        <main className="flex-1 px-6 lg:px-10 py-8 space-y-8">
          {/* Page header */}
          <section className="animate-fade-up">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-[11px] font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3" /> Verified SCFHS Doctors
                </div>
                <h1 className="font-display font-extrabold text-3xl lg:text-4xl tracking-tight">
                  My <span className="text-gradient-primary">Consultations</span>
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Track, manage and rebook your medical consultations in one place.
                </p>
              </div>
              <button className="self-start lg:self-auto inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-5 py-3 rounded-full text-sm shadow-soft hover:shadow-glow transition-smooth">
                <Calendar className="w-4 h-4" /> Book new consultation
              </button>
            </div>
          </section>

          {/* Filters */}
          <section className="flex items-center gap-3 flex-wrap animate-fade-up">
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
              <Filter className="w-3.5 h-3.5" /> Filter
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const isActive = active === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-smooth flex items-center gap-2 ${
                      isActive
                        ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                        : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {f}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/25" : "bg-muted text-muted-foreground"}`}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Doctor grid */}
          <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {list.map((d, i) => (
              <DoctorCard key={d.name} d={d} delay={i * 70} />
            ))}
            {list.length === 0 && (
              <div className="col-span-full bg-card rounded-3xl p-12 text-center border border-dashed border-border">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-soft grid place-items-center mb-3">
                  <Stethoscope className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">No consultations here yet</h3>
                <p className="text-sm text-muted-foreground mt-1">Try a different filter or book your first one.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

function DoctorCard({ d, delay }: { d: typeof doctors[number]; delay: number }) {
  const statusStyle: Record<Status, string> = {
    Confirmed: "bg-primary-soft text-primary",
    Completed: "bg-mint text-primary",
    Cancelled: "bg-coral-soft text-coral",
  };
  const StatusIcon = d.status === "Cancelled" ? XCircle : CheckCircle2;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${d.tone} border border-border/50 shadow-card hover-lift animate-fade-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-smooth" />

      {/* Header: avatar + name + status */}
      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground font-display font-bold text-xl shadow-soft">
            {d.init}
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-card grid place-items-center shadow-soft">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-lg leading-tight truncate">{d.name}</h3>
          <p className="text-sm text-coral font-semibold">{d.category}</p>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" /> {d.location}
          </div>
          <div className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full text-[11px] font-bold ${statusStyle[d.status]}`}>
            <StatusIcon className="w-3 h-3" /> {d.status}
          </div>
        </div>
      </div>

      {/* Date / Time */}
      <div className="relative grid grid-cols-2 gap-2 mt-5">
        <div className="bg-card/70 backdrop-blur rounded-xl px-3 py-2.5 border border-border/40">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            <Calendar className="w-3 h-3" /> Date
          </div>
          <div className="text-sm font-semibold mt-0.5">{d.date}</div>
        </div>
        <div className="bg-card/70 backdrop-blur rounded-xl px-3 py-2.5 border border-border/40">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            <Clock className="w-3 h-3" /> Time
          </div>
          <div className="text-sm font-semibold mt-0.5">{d.time}</div>
        </div>
      </div>

      {/* Meta rows */}
      <div className="relative space-y-2.5 mt-5 text-xs">
        <Row icon={Award} label="Expertise" value={d.expertise.join(" · ")} />
        <Row icon={Languages} label="Language" value={d.language.join(", ")} />
        <Row icon={Briefcase} label="Experience" value={d.experience} />
        <Row
          icon={Star}
          label="Rating"
          value={
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-coral text-coral" />
              <span className="font-bold">{d.rating}</span>
              <span className="text-muted-foreground">({d.reviews} reviews)</span>
            </span>
          }
        />
      </div>

      {/* Footer: fee + CTA */}
      <div className="relative flex items-center justify-between mt-5 pt-5 border-t border-border/50">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Consultation fee</div>
          <div className="font-display font-extrabold text-xl text-primary">
            {d.fee} <span className="text-xs font-semibold text-muted-foreground">SAR</span>
          </div>
        </div>
        <Link to="/consultation-detail" className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-gradient-primary hover:text-primary-foreground font-semibold px-4 py-2.5 rounded-full text-sm shadow-soft hover:shadow-glow transition-smooth">
          {d.status === "Completed" ? <Video className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          View Now
        </Link>
      </div>
    </article>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 rounded-lg bg-card/80 grid place-items-center shrink-0 border border-border/40">
        <Icon className="w-3 h-3 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-muted-foreground font-semibold mr-1">{label}:</span>
        <span className="text-foreground">{value}</span>
      </div>
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
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth group relative ${
              item.active
                ? "bg-gradient-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-primary-soft hover:text-primary"
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.active ? "bg-white/20" : "bg-coral text-coral-foreground"}`}>
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
          <div className="text-[11px] text-primary-foreground/80 mb-3 leading-snug">Priority booking & free follow-ups.</div>
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
            placeholder="Search doctors, specialty, language…"
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
