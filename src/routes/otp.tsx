import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Phone, MessageCircle, Mail, Sparkles, ShieldCheck } from "lucide-react";
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

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const filled = digits.every((d) => d);

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-coral/15 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-float-slow" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/mobile" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="mt-10 max-w-xl mx-auto animate-scale-in">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {["Account", "Mobile", "Verify", "Profile"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${i <= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <span className="w-5 h-5 grid place-items-center rounded-full bg-white/20">{i + 1}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 3 && <div className={`w-4 h-0.5 ${i < 2 ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-elegant border border-border/40 p-8 lg:p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary grid place-items-center shadow-glow mb-6">
              <ShieldCheck className="w-7 h-7 text-primary-foreground" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" /> Verification required
            </div>

            <h1 className="font-display font-extrabold text-3xl lg:text-4xl mb-2 leading-tight">
              Enter <span className="text-gradient-primary">OTP</span> verification
            </h1>
            <p className="text-muted-foreground mb-8">
              We sent a 5-digit code to <span className="font-semibold text-foreground">+966 5X XXX XXXX</span>
            </p>

            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { refs.current[i] = el; }}
                  value={d}
                  onChange={(e) => update(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  className={`w-14 h-16 lg:w-16 lg:h-20 text-center text-2xl lg:text-3xl font-extrabold rounded-2xl bg-muted border-2 transition-smooth ${
                    d ? "border-primary bg-primary-soft text-primary scale-105 shadow-soft" : "border-border"
                  } focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-6">
              {seconds > 0 ? (
                <>Resend code in <span className="font-bold text-primary tabular-nums ml-1">00:{seconds.toString().padStart(2, "0")}</span></>
              ) : (
                <button onClick={() => setSeconds(45)} className="text-primary font-semibold hover:underline">Resend code</button>
              )}
            </div>

            <button
              onClick={() => navigate({ to: "/profile" })}
              disabled={!filled}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-glow transition-smooth disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              {filled ? "Verify & Continue" : "Enter all 5 digits"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-border" /></div>
              <div className="relative flex justify-center"><span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">Didn't get it?</span></div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { i: Phone, l: "Call" },
                { i: MessageCircle, l: "WhatsApp" },
                { i: Mail, l: "Email" },
              ].map((b) => (
                <button key={b.l} className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl border border-border hover:border-primary hover:bg-primary-soft/40 text-xs font-medium transition-smooth group">
                  <b.i className="w-4 h-4 text-primary group-hover:scale-110 transition-smooth" /> {b.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
