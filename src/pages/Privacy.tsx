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
        <p className="text-sm text-muted-foreground mb-10">Last updated: August 7, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground/90 text-base leading-relaxed">
          <p>
            Skooped.io is operated by SKOOPED LLC ("Skooped", "we", "our", "us"), a Tennessee limited liability
            company in Franklin, Tennessee. This page explains what information we collect on skooped.io and the
            app.skooped.io client platform, how we use it, and the choices you have.
          </p>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mt-0">What we collect on this website</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Contact and text-us forms:</strong> your name, phone number, email, and message — delivered to
                us by text and email so we can respond. That's their only job.
              </li>
              <li>
                <strong>Checkout:</strong> payments run on Stripe's secure hosted checkout. Stripe collects your name,
                email, billing details, and card — <strong>your card details never touch our servers</strong>. We
                receive your contact info, the plan you chose, and the website address your plan will manage.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Client accounts (app.skooped.io)</h2>
            <p>If you're a Skooped client with a portal account, we additionally store:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name, email, and business details; passwords are encrypted</li>
              <li>
                Optional Google connections you authorize — Google Business Profile (to manage your listing), Search
                Console (to monitor rankings), and Google Analytics (to track your traffic). We only access those
                specific services — never your Gmail, Drive, personal files, or anything else — and you can disconnect
                them at any time.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Lead alerts on websites we build</h2>
            <p>
              Websites we build for clients include a lead-capture form. When a visitor submits one, their name,
              contact details, and message go to the business that owns that website — by text and email — and we
              store the submission to power that business's monthly report. We process this information on our
              client's behalf, and we never sell it or use it for advertising.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">SMS text alerts (our messaging program)</h2>
            <p>
              Skooped sends SMS website inquiry alerts to our own contracted clients only. Text alerts are optional
              and are not a condition of purchasing or using any Skooped service; clients who decline receive the
              same alerts by email. Consent is a standalone, voluntary written election (unchecked by default, and
              the client agreement is complete and fully valid with it left blank): the client personally checks the
              box and writes in the mobile number that should receive alerts. The full opt-in experience is
              documented at <a href="/sms-opt-in" className="text-primary hover:underline">skooped.io/sms-opt-in</a>.
              Message frequency varies with your website's inquiry volume. Message and data rates may apply.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reply STOP to any alert to opt out; your inquiry alerts continue by email instead</li>
              <li>Reply START to resume texts, and HELP for assistance at any time</li>
              <li>
                We do not share or sell mobile numbers, SMS consent, or opt-in data with third parties or affiliates
                for marketing or promotional purposes
              </li>
            </ul>
            <p>Questions about text alerts: joseph@skooped.io or call/text 615-315-1541.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">How we use your information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond when you contact us</li>
              <li>To build and maintain your website and run the services on your plan</li>
              <li>To send you reports, lead alerts, and updates about your services</li>
              <li>To process payments and subscriptions through Stripe</li>
              <li>To meet legal and tax obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Third-party services</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Stripe: payment processing and billing (stripe.com/privacy)</li>
              <li>Vercel: website hosting (vercel.com/legal/privacy-policy)</li>
              <li>Supabase: authentication and data storage for the client platform (supabase.com/privacy)</li>
              <li>Resend: transactional email delivery (resend.com/legal/privacy-policy)</li>
              <li>Twilio: text-message delivery for lead alerts (twilio.com/legal/privacy)</li>
              <li>Google: Business Profile, Search Console, and Analytics APIs — only for accounts you connect</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Data security</h2>
            <p>
              We use industry-standard security measures to protect your data. Payment information is handled entirely
              by Stripe and never touches our servers. Google tokens and client data are stored securely and accessed
              only to deliver the services you're paying for.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Your rights</h2>
            <p>You can request to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access, update, or correct your personal data</li>
              <li>Delete your data (and your portal account, if you have one)</li>
              <li>Disconnect your Google account at any time</li>
              <li>Stop text messages from us — reply STOP to any text</li>
            </ul>
            <p className="mt-4">Contact us at joseph@skooped.io or call/text 615-315-1541.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Contact</h2>
            <p>SKOOPED LLC<br />Franklin, Tennessee<br />joseph@skooped.io · 615-315-1541</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
