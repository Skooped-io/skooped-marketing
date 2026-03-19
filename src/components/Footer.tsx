const Footer = () => (
  <footer className="bg-card py-16 px-6">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <a href="#" className="font-heading font-extrabold text-2xl text-primary">
            Skooped
          </a>
        </div>

        <div>
          <h4 className="font-heading font-bold text-sm text-foreground mb-3">Pages</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#plans" className="hover:text-primary transition-colors">Plans</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-sm text-foreground mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
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
