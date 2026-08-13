import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePageSeo from "@/hooks/use-page-seo";

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
        <p className="text-sm text-muted-foreground mb-10">Last updated: August 7, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground/90 text-base leading-relaxed">
          <p>
            Skooped.io is operated by SKOOPED LLC, a Tennessee limited liability company ("Skooped", "we").
            By using Skooped.io or purchasing our services, you agree to these terms.
          </p>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mt-0">The Service</h2>
            <p>
              Skooped.io provides AI-powered website creation, SEO, social media management, and digital marketing services for local businesses. We build and manage your online presence so you can focus on running your business.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">SMS Lead Alert Terms</h2>
            <p>
              Program: Skooped website inquiry alerts, operated by SKOOPED LLC. We send contracted clients one SMS
              each time a visitor submits the contact form on the client's own website, so the client can respond
              quickly. Message frequency varies with your website's inquiry volume. Message and data rates may apply.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Reply <strong>STOP</strong> to any alert to opt out at any time; your inquiry alerts continue by
                email instead. Reply START to resume texts.
              </li>
              <li>
                Reply <strong>HELP</strong> for help at any time, or contact us at joseph@skooped.io or 615-315-1541.
              </li>
              <li>
                Text alerts are optional. Consent is a standalone, voluntary written election: the checkbox is
                unchecked by default, your agreement is complete and fully valid with it left blank, and texting
                can be added or dropped at any time with no effect on price or service. It is never a condition
                of purchasing or using any Skooped service; clients who decline receive the same alerts by email.
                The full opt-in experience is documented at{" "}
                <a href="/sms-opt-in" className="text-primary hover:underline">skooped.io/sms-opt-in</a>.
              </li>
              <li>
                Mobile numbers and SMS consent data are never shared with or sold to third parties or affiliates
                for marketing or promotional purposes.
              </li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Plans &amp; Pricing</h2>
            <p className="mb-2">One-time website builds:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cup: $500 one-time — a 5-page website (requires an active monthly plan)</li>
              <li>Waffle Cone: $1,000 one-time — website plus Google Business Profile and local SEO (requires an active monthly plan)</li>
              <li>Custom builds and integrations ("The Sundae"): from $2,000, quoted through a Discovery session and billed in milestones (50% to start, 50% at launch)</li>
              <li>Business Launch Pack add-on ("Cherry on Top"): +$500 (LLC filing assistance in your state with the state filing fee passed through at cost, EIN, starter operating agreement, Google Business Profile verification support — filing assistance, not legal advice)</li>
              <li>Brand refresh add-on ("Chocolate Dipped"): +$200 one-time (one bounded round — a tidy pass on your existing logo and one consistent color palette applied across your site; not a full rebrand)</li>
            </ul>
            <p className="mt-3 mb-2">Monthly plans and add-ons:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Single: $49/month</li>
              <li>Double: $149/month</li>
              <li>Local Scoop: $100/month (Google Business Profile management only; your website stays with whoever hosts it)</li>
              <li>Triple: $299/month. Includes management of your Google ads (Local Services and Search) and Meta ads (Facebook and Instagram), plus 4 social posts per month, each published to both Facebook and Instagram. Ad spend bills directly to your own payment method and we do not mark up ad spend. Which ad platforms run, and at what budget, is agreed with you before anything launches.</li>
              <li>Content add-on ("Sprinkles"): +$350/month, requires the Triple plan, subject to availability. Increases social posts from 4 to 12 per month, curated and edited from photos and video you and your team provide, including at least 4 video posts per month. On-site visits by Skooped are available on request at no additional charge and are not a scheduled or guaranteed deliverable. Engaging an outside professional videographer is quoted and approved separately before any shoot.</li>
              <li>Additional website on the same plan ("Extra Scoop"): +$25/month</li>
              <li>Annual prepay ("By the Pint"): 10× the monthly price (equivalent to 2 months free)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Website Edits &amp; Turnaround</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Single includes 30 minutes of small edits per month. Requests are queued and shipped together in one monthly batch, timed with your monthly report.</li>
              <li>Double includes 1 hour of edits per month and Triple includes 2 hours, both with same-week turnaround (no batching).</li>
              <li>Need a Single edit sooner than the monthly batch? Rush service is a flat $75 per request.</li>
              <li>Included edit time does not roll over month to month. Work beyond your included time is quoted and approved before we start.</li>
              <li>If your website is down or broken, we fix it immediately at no charge on every plan.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Discovery Sessions</h2>
            <p>
              Custom work is scoped through a paid Discovery session ($300): a one-hour consultation followed by a written
              roadmap and fixed cost estimate within 7 days. The full $300 is credited toward your build if you sign within
              30 days of receiving the roadmap.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-foreground">Billing &amp; Cancellation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Build fees are due before work begins; monthly plans bill to a card on file</li>
              <li>Your scope and plan are confirmed on a one-page agreement. No long-term lock-in and no cancellation fees.</li>
              <li>You can cancel your monthly plan anytime with 30 days' notice by contacting us; your website remains active through the end of that notice period</li>
              <li>Annual prepay ("By the Pint") is refundable in full within 14 days of payment. After that you can cancel anytime and we refund the unused whole months at the annual rate; a partial month is not refunded.</li>
              <li>After cancellation, your website will be taken offline. You can request an export of your content before cancellation.</li>
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
              <li>Websites we build and host include a small "Built by Skooped" credit link in the footer</li>
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
            <h2 className="font-heading text-xl font-bold text-foreground">Our Team</h2>
            <p>
              Skooped's staff and contractors work for Skooped. You agree not to engage them directly for the services
              covered by your plan during our work together and for 12 months after.
            </p>
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
              Questions? Call or text 615-315-1541, or email joseph@skooped.io.
            </p>
            <p>SKOOPED LLC<br />Franklin, Tennessee</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
