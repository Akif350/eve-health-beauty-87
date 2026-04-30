import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  ArrowLeft, Camera, Upload, User, MapPin, Heart, Pill, Activity,
  FileText, Link2, X, CheckCircle2, Sparkles, Globe2, IdCard,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Complete profile — EVE" }] }),
  component: ProfilePage,
});

const MEDICAL_CONDITIONS = [
  "None", "Diabetes Type 1", "Diabetes Type 2", "Hypertension", "Asthma",
  "Cardiovascular Disease", "Obesity / Bariatric", "Thyroid Disorder",
  "Arthritis", "Migraine", "PCOS", "Other",
];

const DISABILITIES = [
  "None", "Wheelchair user", "Visual impairment", "Hearing impairment",
  "Limited mobility", "Cognitive support needed", "Chronic pain", "Other",
];

const LANGUAGES = ["Arabic", "English", "Urdu", "French", "Hindi", "Filipino", "Bengali"];

function ProfilePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [conditions, setConditions] = useState<string[]>([]);
  const [disabilities, setDisabilities] = useState<string[]>([]);
  const [docs, setDocs] = useState<{ name: string; size: string }[]>([]);
  const [labs, setLabs] = useState<{ name: string; size: string }[]>([]);
  const [labUrl, setLabUrl] = useState("");
  const [labUrls, setLabUrls] = useState<string[]>([]);

  const onAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: { name: string; size: string }[]) => void, current: { name: string; size: string }[]) => {
    const files = Array.from(e.target.files ?? []).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(0)} KB`,
    }));
    setter([...current, ...files]);
  };

  const addUrl = () => {
    if (labUrl.trim() && /^https?:\/\//.test(labUrl)) {
      setLabUrls([...labUrls, labUrl.trim()]);
      setLabUrl("");
    }
  };

  const stepProgress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/otp" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="mt-10 mb-8 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3 h-3" /> Step {step} of 3 — Almost there
          </div>
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
            Complete your <span className="text-gradient-primary">profile</span>
          </h1>
          <p className="text-muted-foreground mt-3">A premium experience deserves accurate details.</p>
        </div>

        {/* Stepper */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2 text-xs font-semibold text-muted-foreground">
            <span className={step >= 1 ? "text-primary" : ""}>Personal</span>
            <span className={step >= 2 ? "text-primary" : ""}>Address & Medical</span>
            <span className={step >= 3 ? "text-primary" : ""}>Documents</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary rounded-full transition-all duration-500" style={{ width: `${stepProgress}%` }} />
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-elegant border border-border/40 p-6 lg:p-10 animate-scale-in max-w-5xl mx-auto">
          {step === 1 && (
            <>
              {/* Avatar */}
              <div className="flex flex-col items-center mb-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-soft grid place-items-center border-4 border-card shadow-elegant overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-14 h-14 text-primary/40" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-11 h-11 bg-gradient-primary text-primary-foreground rounded-full grid place-items-center shadow-glow hover:scale-110 transition-smooth cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={onAvatar} />
                  </label>
                </div>
                <p className="mt-3 text-sm font-medium">Add your profile photo</p>
                <p className="text-xs text-muted-foreground">JPG or PNG · max 5MB</p>
              </div>

              <SectionTitle icon={User} title="Personal Information" />
              <div className="grid md:grid-cols-2 gap-4">
                <FloatingInput label="Full Name" placeholder="Sarah Khalid Al-Saud" />
                <FloatingSelect label="Gender" options={["Male", "Female", "Other", "Prefer not to say"]} />
                <FloatingInput label="Date of Birth" type="date" />
                <FloatingInput label="Email Address" type="email" placeholder="you@example.com" />
                <FloatingInput label="Nationality" placeholder="Saudi Arabian" />
                <FloatingInput label="National ID / Iqama / Passport / Res. No." placeholder="1XXXXXXXXX" />
                <FloatingSelect label="Marital Status" options={["Single", "Married", "Divorced", "Widowed"]} />
                <FloatingSelect label="Religion Status" options={["Muslim", "Christian", "Jewish", "Hindu", "Buddhist", "Other", "Prefer not to say"]} />
                <FloatingSelect label="Language Preference" options={LANGUAGES} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <SectionTitle icon={MapPin} title="Address" />
              {/* Map placeholder */}
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-primary-soft via-mint to-coral-soft border border-border">
                <div className="absolute inset-0 opacity-40" style={{
                  backgroundImage: "radial-gradient(circle at 20% 30%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--coral) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="relative inline-block mb-2">
                      <div className="absolute inset-0 bg-coral/30 rounded-full blur-xl animate-pulse" />
                      <div className="relative w-12 h-12 rounded-full bg-gradient-coral grid place-items-center shadow-elegant">
                        <MapPin className="w-6 h-6 text-coral-foreground" />
                      </div>
                    </div>
                    <div className="font-semibold text-sm">Pin Location on Map</div>
                    <div className="text-xs text-muted-foreground">Drag pin or use current location</div>
                  </div>
                </div>
                <button className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur text-xs font-semibold border border-border shadow-soft hover:bg-card transition-smooth">
                  📍 Use current location
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <FloatingInput label="Address (from map pin)" placeholder="Auto-filled from pin" />
                <FloatingInput label="National Address (Short Code)" placeholder="RIYD2929" />
              </div>

              <SectionTitle icon={Heart} title="Medical Profile" />
              <div className="space-y-4">
                <MultiSelectChips
                  icon={Activity}
                  label="Primary Medical Condition"
                  options={MEDICAL_CONDITIONS}
                  selected={conditions}
                  onChange={setConditions}
                />

                <FloatingTextarea label="Current Medications" placeholder="e.g. Metformin 500mg twice daily, Vitamin D 1000 IU…" icon={Pill} />
                <FloatingTextarea label="Allergies" placeholder="e.g. Penicillin, peanuts, latex…" icon={Sparkles} />

                <MultiSelectChips
                  icon={Globe2}
                  label="Disability / Mobility Issue"
                  options={DISABILITIES}
                  selected={disabilities}
                  onChange={setDisabilities}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <SectionTitle icon={FileText} title="Medical Documents" />
              <UploadZone
                label="Upload Medical Slips / Documents"
                hint="Prescriptions, doctor notes, discharge summaries"
                files={docs}
                onChange={(e) => onFiles(e, setDocs, docs)}
                onRemove={(i) => setDocs(docs.filter((_, j) => j !== i))}
              />

              <div className="my-8 border-t border-border" />

              <SectionTitle icon={IdCard} title="Lab Reports / X-Rays" />
              <UploadZone
                label="Upload Lab Reports / X-Ray"
                hint="PDF, JPG, PNG · max 10MB each"
                files={labs}
                onChange={(e) => onFiles(e, setLabs, labs)}
                onRemove={(i) => setLabs(labs.filter((_, j) => j !== i))}
              />

              {/* URL upload */}
              <div className="mt-4 p-5 rounded-2xl bg-gradient-soft border border-border/60">
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">Or paste a report URL</span>
                </div>
                <div className="flex gap-2">
                  <input
                    value={labUrl}
                    onChange={(e) => setLabUrl(e.target.value)}
                    placeholder="https://lab.example.com/report.pdf"
                    className="flex-1 px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth text-sm"
                  />
                  <button onClick={addUrl} className="px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-soft hover:shadow-glow transition-smooth">
                    Add URL
                  </button>
                </div>
                {labUrls.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {labUrls.map((u, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border">
                        <Link2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs flex-1 truncate">{u}</span>
                        <button onClick={() => setLabUrls(labUrls.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-10 pt-6 border-t border-border">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="px-6 py-4 rounded-2xl border border-border hover:border-primary font-medium transition-smooth"
              >
                ← Back
              </button>
            )}
            <button className="flex-1 sm:flex-none px-6 py-4 rounded-2xl border border-border hover:border-primary font-medium transition-smooth">
              Save & Finish Later
            </button>
            <button
              onClick={() => {
                if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
                else navigate({ to: "/dashboard" });
              }}
              className="flex-1 bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-glow transition-smooth hover:scale-[1.01] inline-flex items-center justify-center gap-2"
            >
              {step < 3 ? "Continue" : "Finish & Go to Dashboard"} <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── helpers ───────── */

function SectionTitle({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary-soft grid place-items-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="font-display font-bold text-xl">{title}</h2>
    </div>
  );
}

function FloatingInput({ label, type = "text", placeholder = " " }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="relative block">
      <input
        type={type}
        placeholder={placeholder}
        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-smooth font-medium text-sm"
      />
      <span className="absolute left-4 top-2 text-[10px] uppercase tracking-wider text-primary font-bold">
        {label}
      </span>
    </label>
  );
}

function FloatingSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="relative block">
      <select className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-smooth font-medium text-sm appearance-none cursor-pointer">
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span className="absolute left-4 top-2 text-[10px] uppercase tracking-wider text-primary font-bold">{label}</span>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">▾</span>
    </label>
  );
}

function FloatingTextarea({ label, placeholder, icon: Icon }: { label: string; placeholder?: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <label className="relative block">
      <textarea
        rows={3}
        placeholder={placeholder}
        className="peer w-full px-4 pt-7 pb-3 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-smooth font-medium text-sm resize-none"
      />
      <span className="absolute left-4 top-2 text-[10px] uppercase tracking-wider text-primary font-bold flex items-center gap-1">
        {Icon && <Icon className="w-3 h-3" />} {label}
      </span>
    </label>
  );
}

function MultiSelectChips({
  label, options, selected, onChange, icon: Icon,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const toggle = (o: string) =>
    onChange(selected.includes(o) ? selected.filter((x) => x !== o) : [...selected, o]);

  return (
    <div className="p-4 rounded-2xl bg-muted border border-border">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        <span className="text-[10px] uppercase tracking-wider text-primary font-bold">{label}</span>
        <span className="text-xs text-muted-foreground ml-auto">Select all that apply</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-smooth ${
                active
                  ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft scale-105"
                  : "bg-card border-border hover:border-primary hover:text-primary"
              }`}
            >
              {active && "✓ "}{o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UploadZone({
  label, hint, files, onChange, onRemove,
}: {
  label: string;
  hint: string;
  files: { name: string; size: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div>
      <label className="block w-full p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary-soft/30 transition-smooth group cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft group-hover:scale-110 transition-smooth">
            <Upload className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="font-semibold">{label}</div>
            <div className="text-xs text-muted-foreground">{hint}</div>
          </div>
          <span className="text-sm font-semibold text-primary">Browse files</span>
        </div>
        <input type="file" multiple className="hidden" onChange={onChange} />
      </label>
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border animate-fade-up">
              <div className="w-9 h-9 rounded-lg bg-primary-soft grid place-items-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.size}</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <button onClick={() => onRemove(i)} className="text-muted-foreground hover:text-destructive">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
