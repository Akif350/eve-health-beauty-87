import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  Search, Bell, ShoppingCart, MapPin, ChevronDown, Star, Plus,
  Stethoscope, Pill, Upload, ArrowRight, Sparkles, ShoppingBag,
  Briefcase, ChevronLeft, ChevronRight, Heart, Home, BookOpen, User2
} from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";
import consultDoctor from "@/assets/consult-doctor.jpg";
import consultPharm from "@/assets/consult-pharmacist.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import bannerBeauty from "@/assets/banner-beauty.jpg";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Patient Dashboard — EVE" }] }),
  component: Dashboard,
});

const products = [
  { img: p1, name: "Bariatric Whey Protein", caps: "60 capsules", rating: 4.8, price: 189, original: 249, discount: 24 },
  { img: p2, name: "Daily Multivitamin", caps: "120 capsules", rating: 4.9, price: 89, original: 109, discount: 18 },
  { img: p3, name: "Glow Vitamin C Serum", caps: "30 ml", rating: 4.7, price: 145, original: 199, discount: 27 },
  { img: p4, name: "Meal Replacement Powder", caps: "500 g", rating: 4.6, price: 220, original: 280, discount: 21 },
];

const brands = ["Cetaphil", "Bio Cal-D", "Diataal", "Enterogermina", "La Roche", "Vichy"];

const articles = [
  { img: article1, title: "Oral Thrush in Babies: Why It Happens and How to Manage It Safely at Home", desc: "A practical guide for new parents on identifying and treating oral thrush early.", tag: "Pediatrics" },
  { img: article2, title: "Bariatric Nutrition: Building the Perfect Plate Post-Surgery", desc: "Expert-approved meal frameworks to support sustainable weight loss.", tag: "Nutrition" },
  { img: article3, title: "Glow From Within: Your 5-Step Evening Skincare Ritual", desc: "Dermatologist-recommended ingredients for radiant skin overnight.", tag: "Beauty" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <DashHeader />

      <main className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12 mt-8">
        <HeroBanner />
        <ServicesGrid />
        <ConsultationSection />
        <PrescriptionUpload />
        <ProductShowcase />
        <PromoBanner />
        <BrandsSection />
        <ArticlesSection />
      </main>
    </div>
  );
}

function DashHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center gap-6">
        <Logo />
        <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted hover:bg-primary-soft transition-smooth text-sm font-medium">
          <MapPin className="w-4 h-4 text-coral" />
          <span>Jeddah, KSA</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search products, doctors, services..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-muted border border-transparent focus:bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {[Home, BookOpen].map((Icon, i) => (
            <button key={i} className="w-10 h-10 grid place-items-center rounded-full hover:bg-muted transition-smooth">
              <Icon className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </nav>

        <button className="relative w-10 h-10 grid place-items-center rounded-full bg-muted hover:bg-primary-soft transition-smooth">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-coral-foreground text-[10px] font-bold rounded-full grid place-items-center">3</span>
        </button>
        <button className="relative w-10 h-10 grid place-items-center rounded-full bg-muted hover:bg-primary-soft transition-smooth">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full" />
        </button>

        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-muted hover:bg-primary-soft transition-smooth">
          <div className="w-8 h-8 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold text-sm">SK</div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary shadow-elegant animate-fade-up">
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -bottom-20 w-80 h-80 bg-coral/30 rounded-full blur-3xl" />

      <div className="relative grid lg:grid-cols-2 gap-6 p-8 lg:p-14 items-center">
        <div className="text-primary-foreground space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> Bariatric Special
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl leading-tight">
            Your Health is<br />Important
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Finding something for Bariatric? Discover curated nutrition, supplements and care.
          </p>
          <button className="inline-flex items-center gap-2 bg-card text-primary font-semibold px-7 py-3.5 rounded-full hover:bg-coral hover:text-coral-foreground transition-smooth shadow-soft">
            Order Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative h-64 lg:h-80">
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative w-72 h-72 rounded-full bg-white/20 backdrop-blur-xl border border-white/30">
              <img src={heroDoctor} alt="Doctor" className="absolute inset-0 w-full h-full object-cover rounded-full" loading="lazy" width={400} height={400}/>
            </div>
          </div>
          <div className="absolute top-2 right-4 glass rounded-2xl p-3 shadow-elegant animate-float w-44">
            <div className="text-xs text-muted-foreground">Free shipping</div>
            <div className="font-bold text-sm">Above 100 SAR</div>
          </div>
          <div className="absolute bottom-0 left-0 glass rounded-2xl p-3 shadow-elegant animate-float-slow">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-coral-soft grid place-items-center"><Heart className="w-4 h-4 text-coral"/></div>
              <div>
                <div className="text-[10px] text-muted-foreground">Wellness +</div>
                <div className="font-bold text-sm">12% off</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const services = [
    { icon: Sparkles, title: "Beauty Ecosystem", desc: "Curated beauty & skincare experts", tone: "from-rose to-coral-soft", iconColor: "text-coral" },
    { icon: ShoppingBag, title: "Product Marketplace", desc: "Premium wellness products & brands", tone: "from-mint to-primary-soft", iconColor: "text-primary" },
    { icon: Briefcase, title: "Professional Marketplace", desc: "Connect with top-rated specialists", tone: "from-beige to-secondary", iconColor: "text-primary" },
  ];
  return (
    <section>
      <SectionTitle title="Dynamic Services" subtitle="Everything you need, beautifully organized" />
      <div className="grid md:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <div key={s.title} className={`group relative overflow-hidden rounded-3xl p-7 border border-border/40 bg-gradient-to-br ${s.tone} hover-lift cursor-pointer animate-fade-up`} style={{ animationDelay: `${i*100}ms` }}>
            <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-card grid place-items-center shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-smooth">
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <div className="mt-16 lg:mt-24">
              <h3 className="font-display font-bold text-xl mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConsultationSection() {
  const items = [
    { img: consultDoctor, title: "Doctor's Consultation", desc: "Connect with verified specialists in minutes", icon: Stethoscope },
    { img: consultPharm, title: "Pharmacist Advising", desc: "Get expert guidance on your medications", icon: Pill },
  ];
  return (
    <section>
      <SectionTitle title="Talk to an Expert" subtitle="Premium care, just one click away" />
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((c, i) => (
          <div key={c.title} className="relative overflow-hidden rounded-3xl shadow-card hover-lift group animate-fade-up h-72" style={{ animationDelay: `${i*100}ms` }}>
            <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" loading="lazy" width={800} height={600} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            <div className="absolute inset-0 p-7 flex flex-col justify-end text-primary-foreground">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur grid place-items-center">
                  <c.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-2xl mb-1">{c.title}</h3>
              <p className="text-primary-foreground/80 text-sm mb-4 max-w-xs">{c.desc}</p>
              <button className="self-start inline-flex items-center gap-2 bg-card text-primary font-semibold px-5 py-2.5 rounded-full hover:bg-coral hover:text-coral-foreground transition-smooth text-sm">
                Consult Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PrescriptionUpload() {
  return (
    <section>
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground uppercase tracking-[0.25em] font-medium">Or You Can Order Via</p>
      </div>
      <button className="w-full group relative overflow-hidden rounded-full p-1 bg-gradient-to-r from-primary-soft via-card to-coral-soft hover:shadow-elegant transition-smooth">
        <div className="flex items-center justify-center gap-4 py-5 px-8 rounded-full bg-card/80 backdrop-blur border-2 border-dashed border-primary/30 group-hover:border-primary transition-smooth">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft group-hover:scale-110 transition-smooth">
            <Upload className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg lg:text-xl">Upload Your Prescription</span>
          <span className="hidden md:inline text-sm text-muted-foreground">Get personalized product recommendations</span>
        </div>
      </button>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display font-extrabold text-3xl tracking-tight">Top Bariatric Products</h2>
          <p className="text-muted-foreground mt-1">Hand-picked for your wellness journey</p>
        </div>
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <div key={p.name} className="bg-card rounded-3xl p-4 shadow-card hover-lift border border-border/40 group animate-fade-up" style={{ animationDelay: `${i*80}ms`}}>
            <div className="relative aspect-square rounded-2xl bg-gradient-soft overflow-hidden mb-4">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" loading="lazy" width={600} height={600}/>
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-coral text-coral-foreground text-[10px] font-bold">-{p.discount}%</div>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur grid place-items-center hover:bg-coral hover:text-coral-foreground transition-smooth">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold leading-tight line-clamp-2">{p.name}</h3>
              <p className="text-xs text-muted-foreground">{p.caps}</p>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 text-coral fill-coral" />
                <span className="font-semibold">{p.rating}</span>
                <span className="text-muted-foreground">(238)</span>
              </div>
              <div className="flex items-end justify-between pt-1">
                <div>
                  <div className="font-display font-bold text-lg text-primary">{p.price} <span className="text-xs font-normal">SAR</span></div>
                  <div className="text-xs text-muted-foreground line-through">{p.original} SAR</div>
                </div>
                <button className="w-10 h-10 bg-gradient-primary text-primary-foreground rounded-full grid place-items-center shadow-soft hover:shadow-glow hover:scale-110 transition-smooth">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PromoBanner() {
  const [idx, setIdx] = useState(0);
  const slides = [
    { title: "Nourish Your Natural Glow Every Day", offer: "Get 5% Extra with Eve Marketplace Credit" },
    { title: "Bariatric Essentials for the New You", offer: "Free shipping on orders over 200 SAR" },
    { title: "Beauty That Begins With Wellness", offer: "Up to 30% off premium skincare brands" },
  ];
  const cur = slides[idx];
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] shadow-elegant">
      <img src={bannerBeauty} alt="Beauty banner" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1600} height={600}/>
      <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/80 to-transparent" />
      <div className="relative p-10 lg:p-16 max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral text-coral-foreground text-xs font-bold">
          <Sparkles className="w-3 h-3" /> Featured Offer
        </div>
        <h2 className="font-display font-extrabold text-3xl lg:text-5xl tracking-tight leading-tight">{cur.title}</h2>
        <p className="text-muted-foreground text-lg">{cur.offer}</p>
        <div className="flex items-center gap-3 pt-2">
          <button className="bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-soft hover:shadow-glow transition-smooth">Shop Now</button>
          <div className="flex gap-2 ml-4">
            <button onClick={() => setIdx((idx-1+slides.length)%slides.length)} className="w-10 h-10 rounded-full bg-card border border-border grid place-items-center hover:bg-primary-soft transition-smooth">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setIdx((idx+1)%slides.length)} className="w-10 h-10 rounded-full bg-card border border-border grid place-items-center hover:bg-primary-soft transition-smooth">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-1.5 pt-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i===idx ? "w-8 bg-primary" : "w-3 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandsSection() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display font-extrabold text-3xl tracking-tight">Featured Brands</h2>
          <p className="text-muted-foreground mt-1">Trusted by millions worldwide</p>
        </div>
        <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((b, i) => (
          <div key={b} className="aspect-square bg-card rounded-3xl p-6 shadow-soft hover-lift border border-border/40 grid place-items-center text-center animate-fade-up" style={{animationDelay: `${i*60}ms`}}>
            <div>
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-soft mb-3 grid place-items-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display font-bold text-sm">{b}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display font-extrabold text-3xl tracking-tight">Educational Articles</h2>
          <p className="text-muted-foreground mt-1">Insights from leading healthcare experts</p>
        </div>
        <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
          Read All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {articles.map((a, i) => (
          <article key={a.title} className="bg-card rounded-3xl overflow-hidden shadow-card hover-lift border border-border/40 group animate-fade-up" style={{animationDelay:`${i*100}ms`}}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" loading="lazy" width={800} height={600}/>
            </div>
            <div className="p-6">
              <div className="inline-block px-2.5 py-1 rounded-full bg-primary-soft text-primary text-[10px] font-bold uppercase tracking-wider mb-3">{a.tag}</div>
              <h3 className="font-display font-bold text-lg leading-snug mb-2 line-clamp-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{a.desc}</p>
              <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display font-extrabold text-3xl tracking-tight">{title}</h2>
      <p className="text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}
