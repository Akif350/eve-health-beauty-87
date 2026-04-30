import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — EVE" },
    { name: "description", content: "Get in touch with the EVE team." },
  ]}),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteNav />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-up">
            <h1 className="font-display font-extrabold text-4xl lg:text-6xl tracking-tight mb-4">
              Let's <span className="text-gradient-primary">talk.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Questions about products, partnerships or our platform? Our team is here to help — typically replies within 4 hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email us", value: "hello@eve-marketplace.com" },
                { icon: Phone, label: "Call us", value: "+966 12 345 6789" },
                { icon: MapPin, label: "Visit", value: "Jeddah Healthcare District, KSA" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-5 bg-card rounded-2xl shadow-soft border border-border/40 hover-lift">
                  <div className="w-12 h-12 rounded-2xl bg-primary-soft grid place-items-center">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</div>
                    <div className="font-semibold">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="bg-card rounded-3xl p-8 lg:p-10 shadow-elegant border border-border/40 space-y-4 animate-scale-in">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full name" placeholder="Sarah Khalid"/>
              <Field label="Email" type="email" placeholder="you@email.com"/>
            </div>
            <Field label="Subject" placeholder="How can we help?"/>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Message</span>
              <textarea rows={5} placeholder="Tell us a bit about your needs..." className="mt-2 w-full px-4 py-3 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth resize-none"/>
            </label>
            <button type="button" className="w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl shadow-elegant hover:shadow-glow transition-smooth">
              Send message <Send className="w-4 h-4"/>
            </button>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({ label, type="text", placeholder }: { label:string; type?:string; placeholder?:string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</span>
      <input type={type} placeholder={placeholder} className="mt-2 w-full px-4 py-3 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth"/>
    </label>
  );
}
