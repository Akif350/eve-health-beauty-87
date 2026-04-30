import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { HeartPulse, ShoppingBag, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/access")({
  head: () => ({ meta: [{ title: "Choose access type — EVE" }] }),
  component: AccessPage,
});

function AccessPage() {
  const [selected, setSelected] = useState<"patient" | "customer" | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-coral/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/role" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="mt-16 lg:mt-24 text-center max-w-2xl mx-auto animate-fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-6">
            Step 2 of 4
          </div>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight mb-4">
            Choose Your <span className="text-gradient-coral">Access Type</span>
          </h1>
          <p className="text-muted-foreground text-lg">Tailored experience based on what you need most</p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { id: "patient", icon: HeartPulse, title: "I'm a Patient", desc: "Book medical consultations, manage prescriptions and your full health journey.", grad: "from-primary/10 to-mint/40" },
            { id: "customer", icon: ShoppingBag, title: "I'm a Customer", desc: "Shop curated beauty, bariatric and wellness products from trusted brands.", grad: "from-coral/10 to-rose/40" },
          ].map((c) => {
            const active = selected === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c.id as "patient" | "customer")}
                className={`group relative text-left p-8 lg:p-10 rounded-3xl border-2 transition-smooth animate-scale-in
                  ${active ? "border-primary shadow-elegant bg-card" : "border-border/40 hover:border-primary/50 bg-card/80 backdrop-blur"}`}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${c.grad} opacity-50`} />
                {active && (
                  <div className="absolute top-5 right-5 w-8 h-8 bg-primary rounded-full grid place-items-center shadow-glow">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl grid place-items-center mb-6 ${active ? "bg-gradient-primary" : "bg-card shadow-soft"}`}>
                    <c.icon className={`w-7 h-7 ${active ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2">{c.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            disabled={!selected}
            onClick={() => navigate({ to: "/login" })}
            className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-10 py-4 rounded-full shadow-elegant hover:shadow-glow transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
