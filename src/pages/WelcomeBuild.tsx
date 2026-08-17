import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";
import { pixel } from "@/lib/meta-pixel";
import { PHONE_DISPLAY } from "@/components/CallTextButton";
import { BUILD_TRIAL_DAYS } from "@/data/comboPayLinks";

/*
 * Post-checkout landing for the build + plan combo payment links. Stripe redirects here with
 * ?build=cup|waffle&plan=single|double|triple&cadence=monthly|annual&session_id={CHECKOUT_SESSION_ID}.
 * Two jobs, same as /welcome/local-scoop:
 *
 * 1. Tell the buyer what was charged, what starts when, and what to send so the build moves.
 * 2. Fire the Purchase pixel: checkout happens off-site, so this page is the only place a
 *    Purchase event can exist.
 *
 * Renders completely with no query params: never gate the content on a session lookup.
 */

const PHONE = "6153151541";
const PURCHASE_FIRED_KEY = "skooped_purchase_fired";

const BUILD_INFO: Record<string, { name: string; price: number }> = {
  cup: { name: "Cup", price: 500 },
  waffle: { name: "Waffle Cone", price: 1000 },
};
const PLAN_INFO: Record<string, { name: string; mo: number; yr: number }> = {
  single: { name: "Single Scoop", mo: 49, yr: 490 },
  double: { name: "Double Scoop", mo: 149, yr: 1490 },
  triple: { name: "Triple Scoop", mo: 299, yr: 2990 },
};

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

/** Meta dedupes on eventID, but a refresh with a stale pixel would still double count. */
function firePurchaseOnce(sessionId: string | null, contentName: string, value: number) {
  const eventID = sessionId ? `bld_${sessionId}` : undefined;
  try {
    if (sessionId) {
      const seen = JSON.parse(localStorage.getItem(PURCHASE_FIRED_KEY) ?? "[]") as string[];
      if (seen.includes(sessionId)) return;
      localStorage.setItem(PURCHASE_FIRED_KEY, JSON.stringify([...seen.slice(-19), sessionId]));
    }
  } catch {
    /* storage blocked: fire anyway, eventID still dedupes on Meta's side */
  }
  pixel(
    "Purchase",
    { value, currency: "USD", content_name: contentName, content_type: "product" },
    eventID ? { eventID } : undefined
  );
}

const WelcomeBuild = () => {
  const [params] = useSearchParams();
  const build = BUILD_INFO[params.get("build") ?? ""] ?? BUILD_INFO.cup;
  const plan = PLAN_INFO[params.get("plan") ?? ""] ?? PLAN_INFO.single;
  const cadence = params.get("cadence") === "annual" ? "annual" : "monthly";
  const sessionId = params.get("session_id");

  const chargedToday = build.price + (cadence === "annual" ? plan.yr : 0);
  const contentName = `build-${params.get("build") ?? "cup"}-${params.get("plan") ?? "single"}-${cadence}`;

  usePageSeo({
    title: "You're in | Your build starts now | Skooped",
    description: "Next steps for your new Skooped website build and monthly plan.",
  });

  /* Not a page Google should index or rank: it only makes sense right after a payment. */
  useEffect(() => {
    const el = document.createElement("meta");
    el.name = "robots";
    el.content = "noindex, nofollow";
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, []);

  useEffect(() => {
    firePurchaseOnce(sessionId, contentName, chargedToday);
  }, [sessionId, contentName, chargedToday]);

  return (
    <>
      <Navbar />

      {/* ── Confirmation ── */}
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute top-20 left-[-3rem] w-72 h-72 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-6 max-w-3xl">
          <ScrollReveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
              <Check size={16} /> Payment received
            </div>
            <h1 className="text-4xl md:text-[46px] md:leading-tight font-extrabold text-foreground mb-4">
              You're in. Your build starts now.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Payment came through for your {build.name} build and your {plan.name} plan, thank you. Here is exactly
              what was charged, what happens next, and the one thing you can do right now to speed everything up.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What was charged ── */}
      <section className="pb-10 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-extrabold text-foreground mb-3">Your billing, in plain terms</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Check size={17} className="mt-0.5 shrink-0 text-primary" />
                  <span className="leading-relaxed text-foreground">
                    <strong>Charged today: {fmt(chargedToday)}.</strong>{" "}
                    {cadence === "annual"
                      ? `That is your ${build.name} build (${fmt(build.price)}) plus your ${plan.name} plan prepaid for the year (${fmt(plan.yr)}, two months free).`
                      : `That is your ${build.name} build, billed once. You own the site.`}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={17} className="mt-0.5 shrink-0 text-primary" />
                  <span className="leading-relaxed text-foreground">
                    {cadence === "annual" ? (
                      <>
                        <strong>Nothing else is due for a year.</strong> Your plan renews annually and you can cancel the
                        renewal any time.
                      </>
                    ) : (
                      <>
                        <strong>
                          Your {plan.name} plan ({fmt(plan.mo)}/mo) starts in {BUILD_TRIAL_DAYS} days,
                        </strong>{" "}
                        which is your build window. If your build ever needs longer than that, tell me and I push the
                        start date back. Nothing else is charged today.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={17} className="mt-0.5 shrink-0 text-primary" />
                  <span className="leading-relaxed text-foreground">
                    Any toppings you picked in the builder (Cherry on Top, Chocolate Dipped, Sprinkles, Extra Scoop) are
                    not charged at checkout. We set those up together at launch.
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What happens next ── */}
      <section className="pb-10 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-5">What happens next</h2>
            <ul className="space-y-3">
              {[
                "Within one business day you hear from me at joseph@skooped.io to kick off your build.",
                "We nail down your pages together: services, the towns you work, photos, and the phone number leads should reach.",
                "Your site goes live, your plan starts, and every lead texts you the moment it lands.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Check size={17} className="mt-1 shrink-0 text-primary" />
                  <span className="text-muted-foreground leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Speed it up ── */}
      <section className="pb-14 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-extrabold text-foreground mb-2">
                Want it live faster? Have these ready.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                When my email lands, replying with these gets your build moving the same day:
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Your domain name and where it is registered, if you already own one. No domain? I will help you pick one.",
                  "Your logo, if you have one. No logo is fine too.",
                  "10 to 20 real photos of your work. Real beats stock every time.",
                  "The phone number that should get a text the moment a lead comes in.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span className="leading-relaxed text-muted-foreground">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-2xl bg-maroon p-8 md:p-10 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-primary-foreground mb-3">
                Questions before my email arrives?
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-xl mx-auto">
                Call or text any time. You are talking to the person who builds your site, not a queue.
              </p>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 font-heading text-2xl font-extrabold text-primary-foreground hover:underline"
              >
                <Phone size={22} /> {PHONE_DISPLAY}
              </a>
              <p className="mt-8 text-sm text-primary-foreground/70 leading-relaxed">
                Joseph Anderson
                <br />
                <Link to="/" className="hover:underline">
                  skooped.io
                </Link>
                <br />
                {PHONE_DISPLAY}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WelcomeBuild;
