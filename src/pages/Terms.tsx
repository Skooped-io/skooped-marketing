import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageSeo } from "@/hooks/use-page-seo";

const Terms = () => {
  usePageSeo({
    title: "Terms of Service | Skooped.io",
    description: "Skooped.io terms of service — plans, billing, cancellation, and your rights.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-32 pb-20">
        <h1 className="font-heading text-4xl font-extrabold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 22, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground/90 text-base leading-relaxed">
          <p>By using Skooped.io, you agree to these terms.</p>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mt-0">The Service</h2>
            <p>
              Skooped.io provides AI-powered website creation, SEO, social media management, and digital marketing services for local businesses. We build and manage your online presence so you can focus on running your business.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Plans &amp; Pricing</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Starter: $49/month</li>
              <li>Growth: $99/month</li>
              <li>Scale: $149/month</li>
              <li>Custom website builds: $299 one-time fee (in addition to monthly plan)</li>
              <li>All plans include a 14-day free trial with no credit card required to start</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Free Trial</h2>
            <p>
              Your 14-day free trial begins when you complete signup. During the trial, you have full access to all features of your selected plan. No charge is made until the trial ends. You can cancel at any time during the trial.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Billing &amp; Cancellation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Billing is monthly, starting after your 14-day trial</li>
              <li>You can cancel anytime from your dashboard — no contracts, no cancellation fees</li>
              <li>If you cancel, your website remains active through the end of your current billing period</li>
              <li>After cancellation, your website will be taken offline. You can export your content before cancellation.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Your Website</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Template websites are built from our pre-designed industry templates customized with your business information</li>
              <li>Custom websites are designed and built specifically for your business</li>
              <li>You own your business content (text, images, logos you provide)</li>
              <li>Website designs and templates remain the property of Skooped.io</li>
              <li>We host your website on our infrastructure for the duration of your subscription</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Your Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate business information</li>
              <li>Respond to communications from your Skooped team in a timely manner</li>
              <li>Do not use the service for any illegal, harmful, or deceptive purpose</li>
              <li>You are responsible for the accuracy of content you provide for your website</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Limitation of Liability</h2>
            <p>
              Skooped.io provides marketing services to increase your online visibility. We do not guarantee specific results, revenue outcomes, or financial performance. Results vary by industry, location, competition, and other factors.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Changes to Terms</h2>
            <p>We may update these terms from time to time. We will notify you of significant changes via email.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Contact</h2>
            <p>
              Questions? Reach out through your dashboard or email support@skooped.io.
            </p>
            <p>Skooped.io<br />Franklin, Tennessee</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
