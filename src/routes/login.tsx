import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Mail, Smartphone, ArrowLeft, ArrowRight } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Let's you in — EVE" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-hero">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left illustration */}
        <div className="hidden lg:block relative overflow-hidden bg-gradient-primary">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-coral opacity-90" />
          <img src={heroDoctor} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-coral/30 rounded-full blur-3xl" />

          <div className="relative h-full p-12 flex flex-col justify-between text-primary-foreground">
            <Logo className="brightness-0 invert" />
            <div className="space-y-6">
              <h2 className="font-display font-extrabold text-5xl leading-tight">
                Premium care.<br />Effortless access.
              </h2>
              <p className="text-primary-foreground/80 max-w-md">
                Join 50,000+ patients trusting EVE for their daily wellness, beauty and bariatric needs.
              </p>
              <div className="flex gap-3">
                {Array.from({length:3}).map((_,i) => (
                  <div key={i} className={`h-1.5 rounded-full ${i===0 ? "w-10 bg-white" : "w-6 bg-white/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="relative flex flex-col justify-center px-6 lg:px-20 py-10">
          <Link to="/role" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-10 self-start">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <div className="max-w-md w-full mx-auto animate-fade-up">
            <div className="lg:hidden mb-8"><Logo /></div>
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl mb-3">
              Let's <span className="text-gradient-primary">You In</span>
            </h1>
            <p className="text-muted-foreground mb-10">Choose how you'd like to sign in to your EVE account.</p>

            <div className="space-y-3">
              <Link to="/mobile" className="group flex items-center justify-between p-5 bg-card rounded-2xl border border-border hover:border-primary shadow-soft hover-lift transition-smooth">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-soft grid place-items-center">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Continue with Mobile</div>
                    <div className="text-xs text-muted-foreground">OTP verification</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
              </Link>

              <button className="group flex w-full items-center justify-between p-5 bg-card rounded-2xl border border-border hover:border-primary shadow-soft hover-lift transition-smooth">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral-soft grid place-items-center">
                    <Mail className="w-5 h-5 text-coral" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Continue with Email</div>
                    <div className="text-xs text-muted-foreground">Password or magic link</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
              </button>
            </div>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-3.5 bg-card rounded-2xl border border-border hover:border-primary transition-smooth font-medium text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 p-3.5 bg-card rounded-2xl border border-border hover:border-primary transition-smooth font-medium text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-8">
              By continuing you agree to our <span className="text-primary font-medium">Terms</span> and <span className="text-primary font-medium">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
