import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Camera, Upload, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Complete profile — EVE" }] }),
  component: ProfilePage,
});

function FloatingInput({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="relative block">
      <input
        type={type}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth font-medium"
      />
      <span className="absolute left-4 top-4 text-muted-foreground text-xs uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:text-primary">
        {label}
      </span>
    </label>
  );
}

function FloatingSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="relative block">
      <select className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth font-medium appearance-none">
        <option value=""></option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span className="absolute left-4 top-2 text-xs uppercase tracking-wider text-primary">{label}</span>
    </label>
  );
}

function ProfilePage() {
  const [tab, setTab] = useState<"patient" | "professional">("patient");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hero">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/otp" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="mt-10 mb-8 text-center animate-fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-4">
            Step 4 of 4 — Almost there
          </div>
          <h1 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
            Complete Your <span className="text-gradient-primary">Profile</span>
          </h1>
          <p className="text-muted-foreground mt-3">A few more details to personalize your premium EVE experience</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-card rounded-full border border-border shadow-soft">
            {(["patient", "professional"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-smooth capitalize ${
                  tab === t ? "bg-gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "patient" ? "Patient / Customer" : "Professional"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-elegant border border-border/40 p-8 lg:p-10 animate-scale-in">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-soft grid place-items-center border-4 border-card shadow-elegant">
                <User className="w-12 h-12 text-primary/40" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-primary text-primary-foreground rounded-full grid place-items-center shadow-glow hover:scale-110 transition-smooth">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Add a profile photo</p>
          </div>

          {tab === "patient" ? (
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput label="Full Name" />
              <FloatingSelect label="Gender" options={["Male", "Female", "Other"]} />
              <FloatingInput label="Date of Birth" type="date" />
              <FloatingInput label="Nationality" />
              <FloatingInput label="National ID / Iqama / Passport" />
              <FloatingSelect label="Marital Status" options={["Single", "Married", "Divorced", "Widowed"]} />
              <FloatingSelect label="Religion Status" options={["Muslim", "Christian", "Jewish", "Other", "Prefer not to say"]} />
              <FloatingInput label="Email Address" type="email" />

              <div className="md:col-span-2">
                <UploadCard label="Upload National ID / Iqama" hint="PNG, JPG or PDF (max 5MB)" />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingSelect label="Academic Degree" options={["MBBS", "MD", "PhD", "PharmD", "BDS", "Other"]} />
              <FloatingInput label="Specialty" />
              <FloatingInput label="SCFHS License Number" />
              <FloatingInput label="License Expiry Date" type="date" />
              <FloatingSelect label="License Status" options={["Active", "Pending Renewal", "Expired"]} />
              <FloatingInput label="Current Employer / Hospital" />
              <FloatingInput label="Years of Experience" type="number" />
              <FloatingInput label="MOH Facility Registration No." />

              <div className="md:col-span-2">
                <UploadCard label="Upload SCFHS License" hint="PDF preferred (max 10MB)" />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-10 pt-6 border-t border-border">
            <button className="flex-1 px-6 py-4 rounded-2xl border border-border hover:border-primary font-medium transition-smooth">
              Save & Finish Later
            </button>
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="flex-1 bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-glow transition-smooth"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadCard({ label, hint }: { label: string; hint: string }) {
  return (
    <button className="w-full p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary-soft/30 transition-smooth group flex items-center gap-4 text-left">
      <div className="w-14 h-14 rounded-2xl bg-primary-soft grid place-items-center group-hover:scale-110 transition-smooth">
        <Upload className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1">
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <span className="text-sm font-semibold text-primary">Browse</span>
    </button>
  );
}
