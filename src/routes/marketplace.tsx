import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Star, Plus, Heart } from "lucide-react";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [
    { title: "Marketplace — EVE" },
    { name: "description", content: "Curated wellness, beauty and bariatric products from trusted brands." },
  ]}),
  component: MarketplacePage,
});

const products = [
  { img: p1, name: "Bariatric Whey Protein", caps: "60 capsules", rating: 4.8, price: 189, original: 249, discount: 24 },
  { img: p2, name: "Daily Multivitamin", caps: "120 capsules", rating: 4.9, price: 89, original: 109, discount: 18 },
  { img: p3, name: "Glow Vitamin C Serum", caps: "30 ml", rating: 4.7, price: 145, original: 199, discount: 27 },
  { img: p4, name: "Meal Replacement Powder", caps: "500 g", rating: 4.6, price: 220, original: 280, discount: 21 },
  { img: p1, name: "Iron + Folate Complex", caps: "90 capsules", rating: 4.7, price: 99, original: 129, discount: 23 },
  { img: p2, name: "Omega-3 Premium", caps: "60 softgels", rating: 4.9, price: 159, original: 199, discount: 20 },
  { img: p3, name: "Hydra Plump Cream", caps: "50 ml", rating: 4.6, price: 175, original: 230, discount: 24 },
  { img: p4, name: "Collagen Boost Powder", caps: "300 g", rating: 4.8, price: 245, original: 310, discount: 21 },
];

const categories = ["All", "Bariatric", "Beauty", "Vitamins", "Skincare", "Supplements", "Devices"];

function MarketplacePage() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteNav />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-up">
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight mb-3">
            <span className="text-gradient-primary">Marketplace</span>
          </h1>
          <p className="text-lg text-muted-foreground">Premium wellness, beauty & bariatric products — authenticated and curated.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c, i) => (
            <button key={c} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-smooth ${i===0 ? "bg-gradient-primary text-primary-foreground shadow-soft" : "bg-card border border-border hover:border-primary"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <div key={i} className="bg-card rounded-3xl p-4 shadow-card hover-lift border border-border/40 group animate-fade-up" style={{ animationDelay: `${i*60}ms`}}>
              <div className="relative aspect-square rounded-2xl bg-gradient-soft overflow-hidden mb-4">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" loading="lazy" width={600} height={600}/>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-coral text-coral-foreground text-[10px] font-bold">-{p.discount}%</div>
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur grid place-items-center hover:bg-coral hover:text-coral-foreground transition-smooth">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-display font-bold leading-tight line-clamp-2">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{p.caps}</p>
              <div className="flex items-center gap-1 text-xs mt-2">
                <Star className="w-3.5 h-3.5 text-coral fill-coral" />
                <span className="font-semibold">{p.rating}</span>
              </div>
              <div className="flex items-end justify-between pt-3">
                <div>
                  <div className="font-display font-bold text-lg text-primary">{p.price} <span className="text-xs font-normal">SAR</span></div>
                  <div className="text-xs text-muted-foreground line-through">{p.original} SAR</div>
                </div>
                <button className="w-10 h-10 bg-gradient-primary text-primary-foreground rounded-full grid place-items-center shadow-soft hover:shadow-glow hover:scale-110 transition-smooth">
                  <Plus className="w-4 h-4" />
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
