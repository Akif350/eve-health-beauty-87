import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Logo } from "@/components/Logo";
import {
  Search, Bell, ShoppingCart, MapPin, ChevronDown, Star, Phone,
  Pill, Home, Stethoscope, ShoppingBag, Calendar as CalIcon, MessageSquare,
  Activity, BookOpen, Heart, Settings, LogOut, Zap, ArrowRight, ArrowLeft,
  Upload, FileText, X, Video, Headphones, MessageCircle, CreditCard, Wallet,
  CheckCircle2, ShieldCheck, Languages, Award, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/pharmacist-order")({
  head: () => ({ meta: [{ title: "Order Advising — EVE" }] }),
  component: PharmacistOrderPage,
});

const sidebarItems = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: Stethoscope, label: "Consultations", to: "/consultations" },
  { icon: Pill, label: "Pharmacists", to: "/pharmacists", active: true },
  { icon: ShoppingBag, label: "Marketplace", to: "/marketplace" },
  { icon: CalIcon, label: "Appointments", to: "/dashboard" },
  { icon: Activity, label: "Health Tracker", to: "/dashboard" },
  { icon: MessageSquare, label: "Messages", to: "/dashboard", badge: 4 },
  { icon: BookOpen, label: "Articles", to: "/articles" },
  { icon: Heart, label: "Favorites", to: "/dashboard" },
];

const pharmacist = {
  name: "Dr. Layla Al-Rashid",
  initials: "LR",
  specialty: "Clinical Pharmacy",
  expertise: ["Medication Review", "Chronic Care", "Bariatric Meds", "Refills"],
  languages: ["Arabic", "English", "Urdu"],
  rating: 4.9,
  reviews: 412,
  experience: "12 yrs",
  fee: 75,
  location: "Al Olaya, Riyadh",
};

const slotsByPeriod: Record<"Morning" | "Afternoon" | "Evening", string[]> = {
  Morning: ["08:00 AM", "09:30 AM", "10:30 AM", "11:30 AM"],
  Afternoon: ["12:30 PM", "01:30 PM", "02:30 PM", "04:00 PM"],
  Evening: ["05:30 PM", "06:30 PM", "07:30 PM", "08:30 PM"],
};
const periods = ["Morning", "Afternoon", "Evening"] as const;
type Period = typeof periods[number];

type Mode = "video" | "audio" | "chat" | null;

function PharmacistOrderPage() {
  const week = useMemo(() => {
    const out: { day: string; date: number; full: Date }[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      out.push({
        day: d.toLocaleDateString("en", { weekday: "short" }),
        date: d.getDate(),
        full: d,
      });
    }
    return out;
  }, []);

  const [dayIdx, setDayIdx] = useState(0);
  const [period, setPeriod] = useState<Period>("Morning");
  const [time, setTime] = useState<string | null>(null);
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<Mode>(null);
  const [pay, setPay] = useState<"card" | "wallet" | null>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    const arr = Array.from(list).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(0)} KB`,
    }));
    setFiles((p) => [...p, ...arr]);
  };

  const advising = pharmacist.fee;
  const service = 5;
  const vat = +(advising * 0.15).toFixed(2);
  const discount = 10;
  const total = +(advising + service + vat - discount).toFixed(2);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashHeader />
        <main className="flex-1 px-6 lg:px-10 py-8 space-y-6">
          {/* Top bar: back + steps */}
          <div className="flex items-center justify-between gap-4 flex-wrap animate-fade-up">
            <Link
              to="/pharmacists"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Pharmacists
            </Link>
            <Stepper
              steps={[
                { label: "Slot", done: !!time },
                { label: "Mode", done: !!mode },
                { label: "Pay", done: !!pay },
              ]}
            />
          </div>

          {/* HERO — pharmacist profile */}
          <section className="relative overflow-hidden rounded-[2rem] bg-gradient-primary text-primary-foreground shadow-elegant animate-fade-up">
            <div className="absolute -top-32 -right-24 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-coral/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />

            <div className="relative p-6 lg:p-8 grid lg:grid-cols-[auto,1fr,auto] gap-6 items-center">
              {/* Avatar */}
              <div className="relative shrink-0 mx-auto lg:mx-0">
                <div className="w-28 h-28 rounded-[1.75rem] bg-white/15 backdrop-blur-md grid place-items-center font-display font-extrabold text-4xl shadow-elegant ring-4 ring-white/20">
                  {pharmacist.initials}
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-1 rounded-full bg-card text-primary text-[10px] font-bold flex items-center gap-1 shadow-soft">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>

              {/* Info */}
              <div className="min-w-0 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-bold tracking-wider uppercase mb-2">
                  <Sparkles className="w-3 h-3" /> Licensed Clinical Pharmacist
                </div>
                <h1 className="font-display font-extrabold text-2xl lg:text-[1.9rem] leading-tight">
                  {pharmacist.name}
                </h1>
                <p className="text-sm text-primary-foreground/85 mt-1">
                  {pharmacist.specialty} · {pharmacist.location}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 justify-center lg:justify-start">
                  {pharmacist.expertise.map((x) => (
                    <span key={x} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm">
                      {x}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-4 justify-center lg:justify-start text-[12px] text-primary-foreground/90">
                  <span className="inline-flex items-center gap-1.5"><Languages className="w-3.5 h-3.5" /> {pharmacist.languages.join(" · ")}</span>
                  <span className="inline-flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> {pharmacist.experience}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[oklch(0.9_0.16_85)] text-[oklch(0.9_0.16_85)]" />
                    {pharmacist.rating} ({pharmacist.reviews})
                  </span>
                </div>
              </div>

              {/* Fee */}
              <div className="bg-card/95 text-foreground rounded-2xl p-5 text-center min-w-[150px] shadow-elegant">
                <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Advising Fee</div>
                <div className="font-display font-extrabold text-3xl text-gradient-primary mt-1">
                  {pharmacist.fee}
                </div>
                <div className="text-xs font-bold text-muted-foreground -mt-0.5">SAR / session</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary-soft">
                  <Phone className="w-2.5 h-2.5" /> Instant connect
                </div>
              </div>
            </div>
          </section>

              {/* Slot Selection */}
              <section className="rounded-3xl bg-card border border-border/60 shadow-card p-6 animate-fade-up">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display font-bold text-lg">Select Your Preferred Slot</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Pick a date & time within the next 7 days.</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-primary px-2.5 py-1 rounded-full bg-primary-soft">
                    <CalIcon className="w-3 h-3" /> 7-Day View
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {week.map((d, i) => {
                    const active = i === dayIdx;
                    return (
                      <button
                        key={i}
                        onClick={() => setDayIdx(i)}
                        className={`flex flex-col items-center justify-center py-3 rounded-2xl border transition-smooth ${
                          active
                            ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                            : "bg-muted/50 border-border/50 hover:border-primary/40 hover:bg-primary-soft"
                        }`}
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {d.day}
                        </span>
                        <span className="font-display font-extrabold text-xl mt-0.5">{d.date}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                      Time of Day
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {slotsByPeriod[period].length} slots
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-muted/60 border border-border/50">
                    {periods.map((p) => {
                      const active = period === p;
                      return (
                        <button
                          key={p}
                          onClick={() => { setPeriod(p); setTime(null); }}
                          className={`py-2 rounded-xl text-xs font-bold transition-smooth ${
                            active
                              ? "bg-card text-primary shadow-soft"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {slotsByPeriod[period].map((t) => {
                      const active = t === time;
                      return (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-semibold border transition-smooth ${
                            active
                              ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                              : "bg-card border-border/60 hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Upload Prescriptions */}
              <section className="rounded-3xl bg-card border border-border/60 shadow-card p-6 animate-fade-up">
                <h2 className="font-display font-bold text-lg mb-1">Upload Prescriptions</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Attach your prescription, lab reports or medicine list (PDF / JPG / PNG).
                </p>

                <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary-soft/40 hover:bg-primary-soft hover:border-primary/60 cursor-pointer transition-smooth">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-soft">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold">Click to upload or drag & drop</div>
                  <div className="text-[11px] text-muted-foreground">Up to 10 MB per file</div>
                  <input type="file" multiple onChange={onUpload} className="hidden" />
                </label>

                {files.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/60"
                      >
                        <div className="w-9 h-9 grid place-items-center rounded-lg bg-coral-soft text-coral shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{f.name}</div>
                          <div className="text-[11px] text-muted-foreground">{f.size}</div>
                        </div>
                        <button
                          onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}
                          className="w-8 h-8 grid place-items-center rounded-lg hover:bg-coral-soft hover:text-coral transition-smooth"
                          aria-label="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Notes */}
              <section className="rounded-3xl bg-card border border-border/60 shadow-card p-6 animate-fade-up">
                <h2 className="font-display font-bold text-lg mb-1">Notes for the Pharmacist</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Share symptoms, allergies, or anything they should know.
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="e.g. I take metformin daily, recently feeling drowsy after taking new BP meds…"
                  className="w-full p-4 rounded-2xl bg-muted/50 border border-border/60 focus:bg-card focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth text-sm resize-none"
                />
              </section>

              {/* Mode of consultation */}
              <section className="rounded-3xl bg-card border border-border/60 shadow-card p-6 animate-fade-up">
                <h2 className="font-display font-bold text-lg mb-1">Choose Mode of Consultation</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Select how you'd like to connect with your pharmacist.
                </p>

                <div className="grid sm:grid-cols-3 gap-3">
                  <ModeCard
                    icon={Video}
                    label="Video Call"
                    desc="Face-to-face HD call"
                    active={mode === "video"}
                    onClick={() => setMode("video")}
                  />
                  <ModeCard
                    icon={Headphones}
                    label="Audio Call"
                    desc="Voice-only session"
                    active={mode === "audio"}
                    onClick={() => setMode("audio")}
                  />
                  <ModeCard
                    icon={MessageCircle}
                    label="Chat"
                    desc="Text-based advising"
                    active={mode === "chat"}
                    onClick={() => setMode("chat")}
                  />
                </div>
              </section>
            </div>

            {/* RIGHT — Bill */}
            <aside className="xl:col-span-1">
              <div className="sticky top-24 space-y-5">
                <section
                  className={`rounded-3xl border shadow-card p-6 animate-fade-up transition-smooth ${
                    mode
                      ? "bg-card border-primary/30"
                      : "bg-muted/40 border-dashed border-border/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-lg">Bill Details</h2>
                    {mode && (
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-primary px-2 py-1 rounded-full bg-primary-soft">
                        <CheckCircle2 className="w-3 h-3" /> {mode.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {!mode ? (
                    <div className="text-center py-8">
                      <div className="w-14 h-14 rounded-2xl bg-card border border-border/60 grid place-items-center mx-auto mb-3 text-muted-foreground">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold">Pick a consultation mode</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your bill will appear here once you select a mode.
                      </p>
                    </div>
                  ) : (
                    <>
                      <ul className="space-y-2.5 text-sm">
                        <BillRow label="Advising Fee" value={`SAR ${advising.toFixed(2)}`} />
                        <BillRow label="Service Fee" value={`SAR ${service.toFixed(2)}`} />
                        <BillRow label="VAT (15%)" value={`SAR ${vat.toFixed(2)}`} />
                        <BillRow label="Discount" value={`- SAR ${discount.toFixed(2)}`} accent />
                      </ul>
                      <div className="border-t border-dashed border-border/70 my-4" />
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold">Total Payable</span>
                        <span className="font-display font-extrabold text-xl text-gradient-primary">
                          SAR {total.toFixed(2)}
                        </span>
                      </div>

                      {/* Payment Method */}
                      <div className="mt-5">
                        <div className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2">
                          Pay With
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <PayOption
                            icon={CreditCard}
                            label="Card"
                            sub="Visa / Mada"
                            active={pay === "card"}
                            onClick={() => setPay("card")}
                          />
                          <PayOption
                            icon={Wallet}
                            label="Wallet"
                            sub="EVE Wallet"
                            active={pay === "wallet"}
                            onClick={() => setPay("wallet")}
                          />
                        </div>
                      </div>

                      <button
                        disabled={!pay || !time}
                        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-semibold py-3.5 rounded-2xl hover:opacity-95 transition-smooth shadow-soft text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm & Pay <ArrowRight className="w-4 h-4" />
                      </button>
                      {(!pay || !time) && (
                        <p className="text-[11px] text-center text-muted-foreground mt-2">
                          {!time ? "Select a time slot" : "Choose a payment method"} to continue
                        </p>
                      )}
                    </>
                  )}
                </section>

                <div className="rounded-2xl bg-primary-soft/60 border border-primary/20 p-4 text-[11.5px] text-foreground/80 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-primary mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Secure Checkout
                  </div>
                  Your payment is encrypted end-to-end. Cancel free up to 1 hour before the slot.
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetaTile({
  icon: Icon, label, value, highlight,
}: { icon: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-2xl border ${highlight ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft" : "bg-muted/40 border-border/50"}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${highlight ? "text-primary-foreground/90" : "text-primary"}`} />
        <span className={`text-[10px] font-bold uppercase tracking-wider ${highlight ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
          {label}
        </span>
      </div>
      <div className="font-display font-extrabold text-sm">{value}</div>
    </div>
  );
}

function ModeCard({
  icon: Icon, label, desc, active, onClick,
}: { icon: React.ElementType; label: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 rounded-2xl border text-left transition-smooth ${
        active
          ? "bg-gradient-primary text-primary-foreground border-transparent shadow-elegant"
          : "bg-muted/40 border-border/60 hover:border-primary/40 hover:bg-primary-soft"
      }`}
    >
      <div className={`w-10 h-10 grid place-items-center rounded-xl mb-2.5 ${
        active ? "bg-white/20 text-primary-foreground" : "bg-card text-primary shadow-soft"
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-display font-bold text-sm">{label}</div>
      <div className={`text-[11px] mt-0.5 ${active ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
        {desc}
      </div>
      {active && (
        <CheckCircle2 className="absolute top-3 right-3 w-4 h-4" />
      )}
    </button>
  );
}

function BillRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${accent ? "text-coral" : "text-foreground"}`}>{value}</span>
    </li>
  );
}

function PayOption({
  icon: Icon, label, sub, active, onClick,
}: { icon: React.ElementType; label: string; sub: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-3 rounded-2xl border text-left transition-smooth ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-soft"
          : "bg-card border-border/60 hover:border-primary/40 hover:bg-primary-soft"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-9 h-9 grid place-items-center rounded-lg ${
          active ? "bg-white/20" : "bg-primary-soft text-primary"
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm leading-tight">{label}</div>
          <div className={`text-[10.5px] ${active ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
            {sub}
          </div>
        </div>
      </div>
      {active && <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5" />}
    </button>
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
