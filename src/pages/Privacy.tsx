import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePageSeo from "@/hooks/use-page-seo";

const Privacy = () => {
  usePageSeo({
    title: "Privacy Policy | Skooped.io",
    description: "Skooped.io privacy policy — how we collect, use, and protect your data.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-32 pb-20">
        <h1 className="font-heading text-4xl font-extrabold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 22, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground/90 text-base leading-relaxed">
          <p>
            Skooped.io ("we", "our", "us") operates the skooped.io website and app.skooped.io platform. This page informs you of our policies regarding the collection, use, and disclosure of personal information.
          </p>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mt-0">Information We Collect</h2>
            <p>When you sign up for Skooped, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name and email address</li>
              <li>Your business name, address, phone number, and industry</li>
              <li>Your selected plan and service preferences</li>
              <li>Payment information (processed securely by Stripe — we never store your card details)</li>
            </ul>
            <p className="mt-4">When you connect your Google account, we request access to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google Business Profile (to manage your business listing)</li>
              <li>Google Search Console (to monitor your search rankings)</li>
              <li>Google Analytics (to track your website traffic)</li>
            </ul>
            <p className="mt-4">
              We only access the specific Google services listed above. We never access your Gmail, Google Drive, personal files, or any other Google service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To build and maintain your website</li>
              <li>To run your SEO, social media, and advertising campaigns</li>
              <li>To send you reports and updates about your marketing performance</li>
              <li>To communicate with you about your account and services</li>
              <li>To process payments through Stripe</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Third-Party Services</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Stripe: Payment processing (stripe.com/privacy)</li>
              <li>Supabase: Authentication and data storage (supabase.com/privacy)</li>
              <li>Vercel: Website hosting (vercel.com/legal/privacy-policy)</li>
              <li>Resend: Transactional emails (resend.com/legal/privacy-policy)</li>
              <li>Google: Business Profile, Search Console, Analytics APIs</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Data Security</h2>
            <p>
              We use industry-standard security measures to protect your data. Your passwords are encrypted. Your Google tokens are stored securely. Payment information is handled entirely by Stripe and never touches our servers.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Your Rights</h2>
            <p>You can request to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your personal data</li>
              <li>Update or correct your data</li>
              <li>Delete your account and all associated data</li>
              <li>Disconnect your Google account at any time</li>
            </ul>
            <p className="mt-4">Contact us at privacy@skooped.io or through the Contact Cooper page in your dashboard.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Contact</h2>
            <p>Skooped.io<br />Franklin, Tennessee<br />privacy@skooped.io</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
