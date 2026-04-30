import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, MapPin, Calendar } from "lucide-react";

export const Route = createFileRoute("/professionals")({
  head: () => ({ meta: [
    { title: "Professionals — EVE" },
    { name: "description", content: "Connect with SCFHS-verified doctors, pharmacists and specialists." },
  ]}),
  component: ProfessionalsPage,
});

const pros = [
  { name: "Dr. Sarah Khalid", spec: "Dermatologist", city: "Jeddah", rating: 4.9, reviews: 412, fee: 250, init: "SK" },
  { name: "Dr. Omar Al-Najjar", spec: "Bariatric Surgeon", city: "Riyadh", rating: 4.8, reviews: 318, fee: 350, init: "ON" },
  { name: "Dr. Layla Hassan", spec: "Nutritionist", city: "Jeddah", rating: 5.0, reviews: 287, fee: 180, init: "LH" },
  { name: "Dr. Faisal Mansour", spec: "Endocrinologist", city: "Dammam", rating: 4.7, reviews: 199, fee: 280, init: "FM" },
  { name: "Dr. Noor Abdullah", spec: "Pharmacist", city: "Jeddah", rating: 4.9, reviews: 524, fee: 90, init: "NA" },
  { name: "Dr. Khalid Al-Otaibi", spec: "Plastic Surgeon", city: "Riyadh", rating: 4.8, reviews: 256, fee: 400, init: "KO" },
];

function ProfessionalsPage() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteNav />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight mb-3">
            Meet our <span className="text-gradient-primary">Professionals</span>
          </h1>
          <p className="text-lg text-muted-foreground">All verified by SCFHS. All ready to help.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pros.map((d, i) => (
            <div key={d.name} className="bg-card rounded-3xl p-6 shadow-card hover-lift border border-border/40 animate-fade-up" style={{animationDelay:`${i*80}ms`}}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground font-display font-bold text-xl shadow-soft">{d.init}</div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg leading-tight">{d.name}</h3>
                  <p className="text-sm text-coral font-medium">{d.spec}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{d.city}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-coral fill-coral"/>{d.rating} ({d.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
                <div>
                  <div className="text-xs text-muted-foreground">Consultation fee</div>
                  <div className="font-display font-bold text-lg text-primary">{d.fee} SAR</div>
                </div>
                <button className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-4 py-2.5 rounded-full text-sm shadow-soft hover:shadow-glow transition-smooth">
                  <Calendar className="w-4 h-4"/> Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
