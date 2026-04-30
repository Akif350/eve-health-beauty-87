import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowLeft, ChevronDown, ShieldCheck, Lock, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/mobile")({
  head: () => ({ meta: [{ title: "Verify mobile — EVE" }] }),
  component: MobilePage,
});

function MobilePage() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-coral/15 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-lavender/30 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left side — visual story */}
          <div className="hidden lg:block animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold text-primary mb-6">
              <Sparkles className="w-3 h-3" /> Bank-grade security
            </div>
            <h2 className="font-display font-extrabold text-5xl leading-tight tracking-tight mb-4">
              One step away from <span className="text-gradient-primary">premium care.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Verify your number to unlock personalised health, beauty and bariatric experiences curated by EVE.
            </p>
            <div className="space-y-3">
              {[
                { icon: ShieldCheck, t: "Encrypted end-to-end", d: "Your number stays private." },
                { icon: Lock, t: "Never sold or shared", d: "GDPR & SCFHS compliant." },
              ].map((f) => (
                <div key={f.t} className="flex items-start gap-3 p-4 rounded-2xl bg-card/60 backdrop-blur border border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-primary-soft grid place-items-center shrink-0">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{f.t}</div>
                    <div className="text-xs text-muted-foreground">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="animate-scale-in">
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-elegant border border-border/40 p-8 lg:p-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary grid place-items-center mb-6 shadow-glow">
                <ShieldCheck className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-display font-extrabold text-3xl lg:text-4xl mb-2 leading-tight">
                Enter your <span className="text-gradient-primary">mobile number</span>
              </h1>
              <p className="text-muted-foreground mb-8">We'll send a 5-digit verification code via SMS instantly.</p>

              <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">Mobile number</label>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-4 rounded-2xl bg-muted border border-border hover:border-primary transition-smooth font-medium text-sm">
                  🇸🇦 +966 <ChevronDown className="w-4 h-4" />
                </button>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="5X XXX XXXX"
                  className="flex-1 px-5 py-4 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-smooth font-semibold tracking-wider"
                />
              </div>

              <button
                onClick={() => navigate({ to: "/otp" })}
                className="mt-6 w-full bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-glow transition-smooth hover:scale-[1.01]"
              >
                Send verification code
              </button>

              <p className="text-xs text-muted-foreground mt-6 leading-relaxed text-center">
                By continuing, you agree to EVE's <span className="text-primary font-medium">Terms</span> and <span className="text-primary font-medium">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
