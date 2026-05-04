import { useState } from "react";
import {
  X, ArrowLeft, ArrowRight, User, HeartPulse, ShieldCheck,
  CheckCircle2, Sparkles, Copy, Plus,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onContinue?: () => void;
};

const conditions = [
  "Diabetes", "Hypertension", "Asthma", "Thyroid",
  "Heart Disease", "PCOS", "Allergies", "Migraine",
];

const acknowledgements = [
  "I confirm that the information provided above is accurate and complete to the best of my knowledge.",
  "I understand that the consultation is advisory in nature and not a substitute for emergency medical care.",
  "I consent to share my medical history and prescriptions securely with the assigned pharmacist.",
];

export function AdviseNowModal({ open, onClose, onContinue }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", gender: "", age: "",
    phone: "", email: "", weight: "", height: "",
  });
  const [picked, setPicked] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const [acks, setAcks] = useState<boolean[]>([false, false, false]);
  const [txnId] = useState(
    () => "EVE-" + Math.random().toString(36).slice(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-5),
  );

  if (!open) return null;

  const toggleCond = (c: string) =>
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const allAcked = acks.every(Boolean);

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as 1 | 2 | 3 | 4) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s));

  const submit = () => setStep(4);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 animate-fade-up">
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl bg-card shadow-elegant border border-border/60 flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-primary text-primary-foreground p-5 lg:p-6 overflow-hidden shrink-0">
          <div className="absolute -top-16 -right-10 w-48 h-48 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-coral/30 rounded-full blur-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-smooth"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative">
            {step < 4 ? (
              <>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" /> Advise Now
                </div>
                <h2 className="font-display font-extrabold text-xl lg:text-2xl">
                  {step === 1 && "Patient Information"}
                  {step === 2 && "Medical History"}
                  {step === 3 && "Acknowledgement"}
                </h2>
                <p className="text-[12px] text-primary-foreground/85 mt-1">
                  Step {step} of 3 — please fill all required details.
                </p>
                {/* Stepper */}
                <div className="mt-4 flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full flex-1 transition-smooth ${
                        s <= step ? "bg-card" : "bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3 h-3" /> Success
                </div>
                <h2 className="font-display font-extrabold text-xl lg:text-2xl">
                  Payment Successful
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-up">
              <SectionLabel icon={User} text="Personal Details" />
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="First Name" required>
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="e.g. Sarah"
                    className={inputCls}
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="e.g. Khalid"
                    className={inputCls}
                  />
                </Field>
                <Field label="Gender" required>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">Select gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Prefer not to say</option>
                  </select>
                </Field>
                <Field label="Age" required>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="e.g. 28"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone Number" required>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+966 5XX XXX XXX"
                    className={inputCls}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>
                <Field label="Weight (kg)">
                  <input
                    type="number"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    placeholder="e.g. 65"
                    className={inputCls}
                  />
                </Field>
                <Field label="Height (cm)">
                  <input
                    type="number"
                    value={form.height}
                    onChange={(e) => setForm({ ...form, height: e.target.value })}
                    placeholder="e.g. 165"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-up">
              <SectionLabel icon={HeartPulse} text="Existing Medical Conditions" />
              <p className="text-xs text-muted-foreground -mt-2">
                Select all that apply. This helps your pharmacist advise safely.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {conditions.map((c) => {
                  const on = picked.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleCond(c)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-smooth ${
                        on
                          ? "bg-primary-soft border-primary text-primary"
                          : "bg-muted/40 border-border/60 hover:border-primary/40"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md grid place-items-center border ${
                        on ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card"
                      }`}>
                        {on && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </span>
                      <span className="text-sm font-semibold">{c}</span>
                    </button>
                  );
                })}
              </div>

              <Field label="Other / Notes">
                <textarea
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  rows={3}
                  placeholder="Any other conditions, allergies or current medications…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add another condition
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-fade-up">
              <SectionLabel icon={ShieldCheck} text="Please review and accept" />
              <ul className="space-y-2.5">
                {acknowledgements.map((text, i) => {
                  const on = acks[i];
                  return (
                    <li
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-smooth ${
                        on ? "bg-primary-soft/60 border-primary/40" : "bg-muted/40 border-border/60 hover:border-primary/30"
                      }`}
                      onClick={() =>
                        setAcks((p) => p.map((v, idx) => (idx === i ? !v : v)))
                      }
                    >
                      <span className={`shrink-0 w-7 h-7 grid place-items-center rounded-lg font-display font-bold text-xs ${
                        on ? "bg-gradient-primary text-primary-foreground shadow-soft" : "bg-card border border-border text-muted-foreground"
                      }`}>
                        {i + 1}
                      </span>
                      <p className="text-[12.5px] leading-relaxed text-foreground/90">{text}</p>
                      <span className={`ml-auto shrink-0 w-5 h-5 rounded-md grid place-items-center border ${
                        on ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card"
                      }`}>
                        {on && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4 animate-fade-up">
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shadow-elegant">
                  <CheckCircle2 className="w-12 h-12" strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="font-display font-extrabold text-2xl">
                Successful Transaction
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                Your advising session is booked. The pharmacist will reach out at the selected slot.
              </p>

              <div className="mt-6 mx-auto max-w-sm rounded-2xl border border-dashed border-primary/40 bg-primary-soft/40 p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Transaction ID
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="font-display font-extrabold text-lg text-primary tracking-wide">
                    {txnId}
                  </span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(txnId)}
                    className="w-7 h-7 grid place-items-center rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-smooth"
                    aria-label="Copy transaction id"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/60 p-4 lg:p-5 bg-muted/30 shrink-0">
          {step < 4 ? (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={step === 1 ? onClose : back}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-card transition-smooth"
              >
                <ArrowLeft className="w-4 h-4" /> {step === 1 ? "Cancel" : "Back"}
              </button>
              <button
                onClick={step === 3 ? submit : next}
                disabled={step === 3 && !allAcked}
                className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-full text-sm shadow-soft hover:shadow-glow transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 3 ? "Submit & Pay" : "Continue"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onContinue?.();
                onClose();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-semibold py-3.5 rounded-2xl text-sm shadow-soft hover:shadow-glow transition-smooth"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border/60 focus:bg-card focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth text-sm";

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 inline-block">
        {label} {required && <span className="text-coral">*</span>}
      </span>
      {children}
    </label>
  );
}

function SectionLabel({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 grid place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="font-display font-bold text-sm">{text}</h3>
    </div>
  );
}
