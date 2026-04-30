import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/otp")({
  head: () => ({ meta: [{ title: "Verify OTP — EVE" }] }),
  component: OtpPage,
});

function OtpPage() {
  const [digits, setDigits] = useState(["", "", "", "", ""]);
  const [seconds, setSeconds] = useState(45);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const update = (i: number, v: string) => {
    const val = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 4) refs.current[i + 1]?.focus();
  };

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-coral/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/mobile" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="mt-12 max-w-lg mx-auto animate-fade-up">
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-elegant border border-border/40 p-8 lg:p-10 text-center">
            <h1 className="font-display font-extrabold text-3xl lg:text-4xl mb-2">
              Enter <span className="text-gradient-primary">OTP</span> Verification
            </h1>
            <p className="text-muted-foreground mb-8">
              We sent a code to <span className="font-semibold text-foreground">+966 5X XXX XXXX</span>
            </p>

            <div className="flex justify-center gap-3 mb-8">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { refs.current[i] = el; }}
                  value={d}
                  onChange={(e) => update(i, e.target.value)}
                  maxLength={1}
                  className="w-14 h-16 lg:w-16 lg:h-20 text-center text-2xl font-bold rounded-2xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-smooth"
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-6">
              {seconds > 0 ? (
                <>Resend code in <span className="font-bold text-primary tabular-nums">00:{seconds.toString().padStart(2, "0")}</span></>
              ) : (
                <button onClick={() => setSeconds(45)} className="text-primary font-semibold hover:underline">Resend code</button>
              )}
            </div>

            <button
              onClick={() => navigate({ to: "/profile" })}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-glow transition-smooth"
            >
              Submit
            </button>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-border hover:border-primary text-sm font-medium transition-smooth">
                <Phone className="w-4 h-4" /> Get OTP on call
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-border hover:border-primary text-sm font-medium transition-smooth">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
