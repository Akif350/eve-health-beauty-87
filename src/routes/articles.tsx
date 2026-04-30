import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight } from "lucide-react";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [
    { title: "Articles — EVE" },
    { name: "description", content: "Health, beauty and bariatric insights from leading experts." },
  ]}),
  component: ArticlesPage,
});

const articles = [
  { img: article1, title: "Oral Thrush in Babies: Why It Happens and How to Manage It Safely at Home", desc: "A practical guide for new parents.", tag: "Pediatrics", time: "6 min" },
  { img: article2, title: "Bariatric Nutrition: Building the Perfect Plate Post-Surgery", desc: "Expert-approved meal frameworks.", tag: "Nutrition", time: "8 min" },
  { img: article3, title: "Glow From Within: Your 5-Step Evening Skincare Ritual", desc: "Dermatologist-recommended ingredients.", tag: "Beauty", time: "5 min" },
  { img: article2, title: "Vitamins After 40: What Your Body Actually Needs", desc: "A no-fluff guide to supplementation.", tag: "Wellness", time: "7 min" },
  { img: article3, title: "Hyperpigmentation: Causes, Myths & What Truly Works", desc: "From dermatology to daily routine.", tag: "Skincare", time: "9 min" },
  { img: article1, title: "Sleep & Hormones: The Underrated Link", desc: "How rest shapes your wellness.", tag: "Health", time: "6 min" },
];

function ArticlesPage() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteNav />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight mb-3">
            <span className="text-gradient-primary">Insights</span> & Articles
          </h1>
          <p className="text-lg text-muted-foreground">Trusted knowledge from healthcare leaders.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <article key={i} className="bg-card rounded-3xl overflow-hidden shadow-card hover-lift border border-border/40 group animate-fade-up" style={{animationDelay:`${i*80}ms`}}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" loading="lazy" width={800} height={600}/>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-primary-soft text-primary text-[10px] font-bold uppercase tracking-wider">{a.tag}</span>
                  <span className="text-xs text-muted-foreground">{a.time} read</span>
                </div>
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
      <SiteFooter />
    </div>
  );
}
