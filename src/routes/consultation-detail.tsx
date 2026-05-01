import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  Search, Bell, ShoppingCart, MapPin, ChevronDown, Star,
  Stethoscope, Calendar, MessageSquare, Activity, Settings, LogOut,
  Home, ShoppingBag, BookOpen, Heart, Zap, Clock, Languages,
  Award, Briefcase, CheckCircle2, ArrowLeft, Upload, FileText,
  Video, Sparkles, MapPinned, CalendarDays, Receipt, ArrowRight,
  PenSquare, RotateCcw, Download, Phone, Mail, ShieldCheck, X,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/consultation-detail")({
  head: () => ({
    meta: [
      { title: "Consultation Details — EVE" },
      { name: "description", content: "Full consultation summary, documents, and bill details." },
    ],
  }),
  component: ConsultationDetailPage,
});

const sidebarItems = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: Stethoscope, label: "Consultations", to: "/consultations", active: true },
  { icon: ShoppingBag, label: "Marketplace", to: "/marketplace" },
  { icon: Calendar, label: "Appointments", to: "/dashboard" },
  { icon: Activity, label: "Health Tracker", to: "/dashboard" },
  { icon: MessageSquare, label: "Messages", to: "/dashboard", badge: 4 },
  { icon: BookOpen, label: "Articles", to: "/articles" },
  { icon: Heart, label: "Favorites", to: "/dashboard" },
];

const doctor = {
  init: "SK",
  name: "Dr. Sarah Khalid",
  category: "Dermatologist · MBBS, MD",
  location: "Dermavue Clinic, Jeddah, KSA",
  date: "12 May 2026",
  time: "10:30 AM – 11:00 AM",
  rating: 4.9,
  reviews: 412,
  expertise: ["Acne & Scars", "Anti-aging", "Pigmentation", "Laser"],
  language: ["English", "Arabic", "Urdu"],
  experience: "12+ years",
  status: "Completed" as const,
};

const docs = [
  { name: "Prescription_12May.pdf", size: "182 KB", tone: "from-primary-soft to-card" },
  { name: "Lab_Report_Skin.pdf", size: "640 KB", tone: "from-coral-soft to-card" },
  { name: "Before_Photo.jpg", size: "1.2 MB", tone: "from-mint to-card" },
];

const bill = [
  { label: "Consultation Charges", value: 250.0 },
  { label: "Service Fee", value: 15.0 },
  { label: "VAT (15%)", value: 39.75 },
  { label: "Discount", value: -25.0, discount: true },
];

function ConsultationDetailPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashHeader />
        <main className="flex-1 px-6 lg:px-10 py-8 space-y-8">
          <Breadcrumb />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <DoctorHero />
              <DocumentsSection />
              <ConsultationDetails />
            </div>
            <div className="space-y-6">
              <BillCard />
              <ActionsCard />
              <SupportCard />
            </div>
          </div>
        </main>
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
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
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
          <div className="w-9 h-9 rounded-xl bg-white/20 grid place-items-center mb-2"><Zap className="w-4 h-4" /></div>
          <div className="font-display font-bold text-sm mb-1">Upgrade to EVE+</div>
          <div className="text-[11px] text-primary-foreground/80 mb-3 leading-snug">Unlock premium consultations & exclusive deals.</div>
          <button className="w-full text-xs font-bold bg-card text-primary py-2 rounded-lg hover:bg-coral hover:text-coral-foreground transition-smooth">Upgrade now</button>
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
          <MapPin className="w-4 h-4 text-coral" /><span>Jeddah, KSA</span><ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search consultations…" className="w-full pl-11 pr-4 py-3 rounded-full bg-muted border border-transparent focus:bg-card focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth text-sm" />
        </div>
        <button className="relative w-10 h-10 grid place-items-center rounded-full bg-muted hover:bg-primary-soft transition-smooth"><ShoppingCart className="w-5 h-5" /></button>
        <button className="relative w-10 h-10 grid place-items-center rounded-full bg-muted hover:bg-primary-soft transition-smooth"><Bell className="w-5 h-5" /><span className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full animate-pulse" /></button>
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-muted hover:bg-primary-soft transition-smooth">
          <div className="w-8 h-8 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold text-sm">AK</div>
          <div className="hidden md:block text-left"><div className="text-xs font-semibold leading-tight">Aisha K.</div><div className="text-[10px] text-muted-foreground">Premium</div></div>
        </button>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 animate-fade-up">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/consultations" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth">
          <ArrowLeft className="w-4 h-4" /> Back to Consultations
        </Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="font-semibold">Consultation #EVE-2034</span>
      </div>
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint text-primary text-xs font-bold">
        <CheckCircle2 className="w-3.5 h-3.5" /> {doctor.status}
      </span>
    </div>
  );
}

function DoctorHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card animate-fade-up">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-soft/60 via-card to-coral-soft/40" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="relative p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-3xl bg-gradient-primary grid place-items-center text-primary-foreground font-display font-bold text-4xl shadow-elegant">
              {doctor.init}
            </div>
            <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-card border-2 border-card shadow-soft grid place-items-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="font-display text-2xl lg:text-3xl font-bold">{doctor.name}</h1>
                <div className="text-sm text-muted-foreground mt-1">{doctor.category}</div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border shadow-soft">
                <Star className="w-4 h-4 fill-[oklch(0.8_0.18_85)] text-[oklch(0.8_0.18_85)]" />
                <span className="font-bold text-sm">{doctor.rating}</span>
                <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
              <InfoChip icon={MapPinned} label="Location" value={doctor.location} />
              <InfoChip icon={CalendarDays} label="Date" value={doctor.date} />
              <InfoChip icon={Clock} label="Time" value={doctor.time} />
              <InfoChip icon={Briefcase} label="Experience" value={doctor.experience} />
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Expertise In
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.expertise.map((e) => (
                    <span key={e} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary-soft text-primary">{e}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-2 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5" /> Languages
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.language.map((l) => (
                    <span key={l} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-coral-soft text-coral">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card/70 border border-border/60 p-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
        <Icon className="w-3 h-3" /> {label}
      </div>
      <div className="text-sm font-semibold mt-1 leading-tight truncate">{value}</div>
    </div>
  );
}

function DocumentsSection() {
  const [files, setFiles] = useState(docs);
  return (
    <section className="rounded-3xl border border-border/60 bg-card p-6 lg:p-7 shadow-card animate-fade-up">
      <SectionHeader icon={Upload} title="Upload Medical Slips / Documents" subtitle="Add prescriptions, lab reports, or photos for follow-up." />

      <label className="mt-5 block cursor-pointer group">
        <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary-soft/40 hover:bg-primary-soft transition-smooth p-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft group-hover:scale-110 transition-smooth">
            <Upload className="w-5 h-5" />
          </div>
          <div className="mt-3 font-display font-bold">Drop files or click to browse</div>
          <div className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG · up to 10 MB each</div>
          <input type="file" multiple className="hidden" />
        </div>
      </label>

      <div className="mt-5 space-y-2">
        {files.map((f, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r ${f.tone} border border-border/60`}>
            <div className="w-10 h-10 rounded-xl bg-card grid place-items-center shrink-0 shadow-soft">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{f.name}</div>
              <div className="text-[11px] text-muted-foreground">{f.size}</div>
            </div>
            <button className="w-8 h-8 grid place-items-center rounded-full bg-card hover:bg-primary-soft transition-smooth">
              <Download className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="w-8 h-8 grid place-items-center rounded-full bg-card hover:bg-coral-soft hover:text-coral transition-smooth">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input placeholder="…or paste a document URL" className="flex-1 px-4 py-2.5 rounded-full bg-muted border border-transparent focus:bg-card focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth text-sm" />
        <button className="px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-smooth">Attach</button>
      </div>
    </section>
  );
}

function ConsultationDetails() {
  const items = [
    { icon: Video, label: "Mode of Consultation", value: "Video Call (HD)", tone: "from-primary-soft to-card" },
    { icon: CalendarDays, label: "Date", value: "12 May 2026", tone: "from-coral-soft to-card" },
    { icon: Clock, label: "Time", value: "10:30 AM – 11:00 AM", tone: "from-mint to-card" },
  ];
  return (
    <section className="rounded-3xl border border-border/60 bg-card p-6 lg:p-7 shadow-card animate-fade-up">
      <SectionHeader icon={Sparkles} title="Consultation Details" subtitle="Session summary and meeting information." />
      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        {items.map((it) => (
          <div key={it.label} className={`rounded-2xl bg-gradient-to-br ${it.tone} border border-border/60 p-4`}>
            <div className="w-10 h-10 rounded-xl bg-card grid place-items-center shadow-soft mb-3">
              <it.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{it.label}</div>
            <div className="text-sm font-display font-bold mt-1">{it.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 p-4 rounded-2xl bg-muted/60 border border-border/60">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Doctor's Notes</div>
        <p className="text-sm leading-relaxed text-foreground/80">
          Patient reviewed for mild acne and post-inflammatory pigmentation. Topical regimen prescribed; follow-up advised in 4 weeks. Continue daily SPF 50+.
        </p>
      </div>
    </section>
  );
}

function BillCard() {
  const subtotal = bill.reduce((s, b) => s + b.value, 0);
  return (
    <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card animate-fade-up">
      <SectionHeader icon={Receipt} title="Bill Details" subtitle="Invoice #EVE-2034" />
      <div className="mt-5 space-y-3">
        {bill.map((b) => (
          <div key={b.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{b.label}</span>
            <span className={`font-semibold ${b.discount ? "text-coral" : ""}`}>
              {b.discount ? "-" : ""}SAR {Math.abs(b.value).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="h-px bg-border my-3" />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Total Payable</div>
            <div className="text-2xl font-display font-bold text-gradient-primary">SAR {subtotal.toFixed(2)}</div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-mint text-primary text-[11px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Paid
          </span>
        </div>
      </div>
      <button className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl border border-border bg-muted hover:bg-primary-soft transition-smooth text-sm font-bold">
        <Download className="w-4 h-4" /> Download Invoice
      </button>
    </section>
  );
}

function ActionsCard() {
  return (
    <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card animate-fade-up space-y-3">
      <button className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-bold shadow-soft hover:opacity-95 transition-smooth">
        <RotateCcw className="w-4 h-4" /> Book Follow-up
      </button>
      <button className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-coral text-coral-foreground font-bold shadow-coral hover:opacity-95 transition-smooth">
        <PenSquare className="w-4 h-4" /> Write a Review
      </button>
      <Link to="/dashboard" className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border bg-card hover:bg-primary-soft hover:text-primary transition-smooth font-bold">
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </section>
  );
}

function SupportCard() {
  return (
    <section className="rounded-3xl bg-gradient-primary text-primary-foreground p-6 shadow-elegant relative overflow-hidden animate-fade-up">
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-coral/30 rounded-full blur-2xl" />
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-white/20 grid place-items-center mb-3">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="font-display font-bold text-lg">Need help?</div>
        <div className="text-xs text-primary-foreground/80 mt-1 mb-4 leading-snug">Our care team is available 24/7 for any consultation queries.</div>
        <div className="flex gap-2">
          <button className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-card text-primary text-xs font-bold hover:bg-coral hover:text-coral-foreground transition-smooth">
            <Phone className="w-3.5 h-3.5" /> Call
          </button>
          <button className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/15 text-primary-foreground text-xs font-bold hover:bg-white/25 transition-smooth">
            <Mail className="w-3.5 h-3.5" /> Email
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h2 className="font-display font-bold text-lg leading-tight">{title}</h2>
        {subtitle && <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
}
