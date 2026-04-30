import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Stethoscope, Sparkles, ShoppingBag, Pill, HeartPulse, Briefcase } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services — EVE Marketplace" },
    { name: "description", content: "Premium healthcare, beauty, bariatric and professional services on EVE." },
  ]}),
  component: ServicesPage,
});

const services = [
  { icon: Stethoscope, title: "Doctor Consultations", desc: "Verified specialists across 30+ disciplines, video or in-person." },
  { icon: Pill, title: "Pharmacy & Prescriptions", desc: "Upload your prescription, get expert advice, doorstep delivery." },
  { icon: Sparkles, title: "Beauty Ecosystem", desc: "Curated treatments, dermatologists and premium skincare brands." },
  { icon: HeartPulse, title: "Bariatric Care", desc: "End-to-end weight management with nutritionists and surgeons." },
  { icon: ShoppingBag, title: "Wellness Marketplace", desc: "Authenticated supplements, devices and beauty essentials." },
  { icon: Briefcase, title: "Professional Network", desc: "For doctors, therapists and clinics to grow their practice." },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteNav />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-5">Our Services</div>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight mb-4">
            Premium care, <span className="text-gradient-primary">end to end.</span>
          </h1>
          <p className="text-lg text-muted-foreground">Every service on EVE is delivered by verified professionals and curated for your peace of mind.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={s.title} className="bg-card rounded-3xl p-7 shadow-card hover-lift border border-border/40 animate-fade-up" style={{animationDelay: `${i*80}ms`}}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-soft grid place-items-center mb-5">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
