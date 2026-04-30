import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 bg-gradient-to-b from-background to-primary-soft/30 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium healthcare, beauty & professional services — beyond products, beyond expectations.
          </p>
          <div className="flex gap-2">
            {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-full bg-card border border-border grid place-items-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/marketplace" className="hover:text-primary">Marketplace</Link></li>
            <li><Link to="/professionals" className="hover:text-primary">Professionals</Link></li>
            <li><Link to="/articles" className="hover:text-primary">Articles</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About EVE</li>
            <li>Careers</li>
            <li>Press</li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Stay in the loop</h4>
          <p className="text-sm text-muted-foreground mb-3">Premium health & beauty insights, monthly.</p>
          <div className="flex">
            <input placeholder="Your email" className="flex-1 px-4 py-2.5 rounded-l-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="px-5 rounded-r-full bg-gradient-primary text-primary-foreground text-sm font-semibold">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 EVE Marketplace. All rights reserved.</p>
          <div className="flex gap-5">
            <span>Privacy</span><span>Terms</span><span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
