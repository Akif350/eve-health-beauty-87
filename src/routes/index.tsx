import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight, Stethoscope, Sparkles, ShoppingBag, ShieldCheck, Star, Play } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EVE Marketplace — Premium Healthcare, Beauty & Bariatric Platform" },
      { name: "description", content: "AI-powered consultations with trusted medical professionals. Discover beauty, bariatric and wellness products on EVE Marketplace." },
      { property: "og:title", content: "EVE Marketplace — Beyond Beauty and Bariatrics" },
      { property: "og:description", content: "AI-powered consultations and a curated marketplace for healthcare, beauty and professional services." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Stethoscope, title: "Doctor Consultation", desc: "Verified specialists, on-demand", color: "text-primary", bg: "bg-primary-soft" },
  { icon: Sparkles, title: "AI Medical Advice", desc: "Personalized health insights", color: "text-coral", bg: "bg-coral-soft" },
  { icon: ShoppingBag, title: "Product Marketplace", desc: "Curated wellness essentials", color: "text-primary", bg: "bg-mint" },
  { icon: ShieldCheck, title: "Trusted Experts", desc: "Licensed & SCFHS verified", color: "text-coral", bg: "bg-rose" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-coral/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold text-primary">
              <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
              Trusted by 50,000+ patients across MENA
            </div>
            <h1 className="font-display font-extrabold text-5xl lg:text-7xl leading-[1.05] tracking-tight">
              Beyond <span className="text-gradient-primary">Beauty</span><br />
              and Bariatrics<br />
              <span className="text-gradient-coral">Beyond Products</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              AI-powered consultations with trusted medical professionals for personalized
              healthcare, beauty and bariatric solutions — all in one premium marketplace.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/role"
                className="group inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-7 py-4 rounded-full shadow-elegant hover:shadow-glow transition-smooth"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-3 px-5 py-4 rounded-full hover:bg-card transition-smooth">
                <span className="w-11 h-11 rounded-full bg-card grid place-items-center shadow-soft">
                  <Play className="w-4 h-4 text-primary fill-primary ml-0.5" />
                </span>
                <span className="font-medium">Watch demo</span>
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-background ${['bg-primary','bg-coral','bg-mint','bg-beige'][i-1]}`} />
                  ))}
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-coral">
                  {Array.from({length:5}).map((_,i)=> <Star key={i} className="w-4 h-4 fill-current" />)}
                  <span className="ml-1 font-semibold text-foreground">4.9</span>
                </div>
                <div className="text-muted-foreground text-xs">From 12,000+ reviews</div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative h-[600px] animate-scale-in">
            <div className="absolute inset-0 bg-gradient-primary rounded-[3rem] rotate-3 opacity-90" />
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-elegant">
              <img src={heroDoctor} alt="Premium healthcare professional" className="w-full h-full object-cover" width={1024} height={1280} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            {/* Floating cards */}
            <div className="absolute -left-6 top-16 glass rounded-2xl p-4 shadow-elegant animate-float w-56">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-soft grid place-items-center">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Live now</div>
                  <div className="font-semibold text-sm">Dr. Sarah Khalid</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-primary font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full" /> Available
              </div>
            </div>

            <div className="absolute -right-6 top-1/2 glass rounded-2xl p-4 shadow-elegant animate-float-slow w-60">
              <div className="text-xs text-muted-foreground mb-1">Today's wellness</div>
              <div className="font-display font-bold text-2xl text-gradient-primary">98%</div>
              <div className="text-xs">Health score improved</div>
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-primary rounded-full" />
              </div>
            </div>

            <div className="absolute -bottom-4 left-8 glass rounded-2xl p-4 shadow-elegant animate-float w-64" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-coral-soft grid place-items-center">
                  <Sparkles className="w-5 h-5 text-coral" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">AI Recommendation</div>
                  <div className="text-xs text-muted-foreground">3 new products for you</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 -mt-16 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group bg-card rounded-3xl p-6 shadow-card hover-lift border border-border/40 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${f.bg} grid place-items-center mb-4 group-hover:scale-110 transition-smooth`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3 className="font-display font-bold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3 h-3" /> Loved across MENA
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight">
            Real stories from <span className="text-gradient-primary">real patients</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { name: "Aisha M.", role: "Patient · Riyadh", text: "EVE made finding the right specialist effortless. The bariatric program changed my life.", color: "from-primary-soft to-card" },
            { name: "Dr. Khaled R.", role: "Endocrinologist", text: "The professional dashboard is intuitive — I can focus on patients, not paperwork.", color: "from-coral-soft to-card" },
            { name: "Layla S.", role: "Beauty client · Jeddah", text: "Curated brands, fast delivery and AI suggestions that actually work for my skin.", color: "from-mint to-card" },
          ].map((t, i) => (
            <div key={t.name} className={`relative p-7 rounded-3xl bg-gradient-to-br ${t.color} border border-border/40 shadow-card hover-lift animate-fade-up`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-1 text-coral mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="bg-gradient-primary rounded-[2.5rem] p-10 lg:p-16 text-primary-foreground relative overflow-hidden shadow-elegant">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-20 w-72 h-72 bg-coral/30 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
                Healthcare reimagined for the way you live today.
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-6">
                Connect with licensed professionals, shop curated wellness, and let AI guide your journey.
              </p>
              <Link to="/role" className="inline-flex items-center gap-2 bg-card text-primary font-semibold px-6 py-3.5 rounded-full hover:bg-coral hover:text-coral-foreground transition-smooth">
                Join EVE today <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "50K+", label: "Active Patients" },
                { num: "1.2K", label: "Verified Doctors" },
                { num: "10K+", label: "Products" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-extrabold text-3xl lg:text-4xl mb-1">{s.num}</div>
                  <div className="text-xs text-primary-foreground/70 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
