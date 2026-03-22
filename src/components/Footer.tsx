import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card py-16 px-6">
    <div className="container mx-auto">
      {/* Trial banner */}
      <div className="text-center mb-10">
        <Link to="/templates" className="inline-block text-sm font-heading font-bold text-primary hover:underline transition-colors">
          Start your 14-day free trial — no credit card required →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <Link to="/" className="font-heading font-extrabold text-2xl text-primary">
            Skooped
          </Link>
        </div>

        <div>
          <h4 className="font-heading font-bold text-sm text-foreground mb-3">Pages</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/plans" className="hover:text-primary transition-colors">Plans</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-sm text-foreground mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-sm text-foreground mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="tel:6158563871" className="hover:text-primary transition-colors">615-856-3871</a></li>
            <li>Franklin, TN</li>
            <li><a href="https://instagram.com/skooped.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@skooped.io</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p className="mb-1">© 2026 Skooped. All rights reserved.</p>
        <p>An AI-first marketing platform built for local businesses.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
