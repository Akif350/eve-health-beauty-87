import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowLeft, ChevronDown, ShieldCheck } from "lucide-react";
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
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="mt-12 max-w-lg mx-auto animate-fade-up">
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-elegant border border-border/40 p-8 lg:p-10">
            <div className="w-14 h-14 rounded-2xl bg-primary-soft grid place-items-center mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-display font-extrabold text-3xl lg:text-4xl mb-2">
              Enter Your <span className="text-gradient-primary">Mobile Number</span>
            </h1>
            <p className="text-muted-foreground mb-8">We'll send you a 5-digit verification code via SMS</p>

            <label className="block text-sm font-semibold mb-2">Mobile number</label>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-4 rounded-2xl bg-muted border border-border hover:border-primary transition-smooth font-medium text-sm">
                🇸🇦 +966 <ChevronDown className="w-4 h-4" />
              </button>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="5X XXX XXXX"
                className="flex-1 px-5 py-4 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth font-medium"
              />
            </div>

            <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
              By continuing, you agree to EVE's <span className="text-primary font-medium">Terms of Service</span> and consent to receive SMS messages. Standard rates may apply.
            </p>

            <button
              onClick={() => navigate({ to: "/otp" })}
              className="mt-6 w-full bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-glow transition-smooth"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
