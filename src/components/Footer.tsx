import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card py-16 px-6">
    <div className="container mx-auto">
      {/* Contact banner */}
      <div className="text-center mb-10">
        <a href="tel:6153151541" className="inline-block text-sm font-heading font-bold text-primary hover:underline transition-colors">
          Call or text 615-315-1541 — we'll tell you straight what fits →
        </a>
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
            <li><Link to="/templates" className="hover:text-primary transition-colors">Industries</Link></li>
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
            <li><a href="tel:6153151541" className="hover:text-primary transition-colors">615-315-1541</a></li>
            <li>Franklin, TN</li>
            <li><a href="https://instagram.com/skooped.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@skooped.io</a></li>
            <li><a href="https://app.skooped.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Client Login</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p className="mb-1">© 2026 Skooped. All rights reserved.</p>
        <p>Websites &amp; marketing for local businesses — Franklin, TN.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
