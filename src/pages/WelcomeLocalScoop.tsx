import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Copy, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";
import { pixel } from "@/lib/meta-pixel";
import { PHONE_DISPLAY } from "@/components/CallTextButton";

/*
 * Post-checkout landing for The Local Scoop. Stripe's payment links redirect here with
 * ?plan=monthly|annual&session_id={CHECKOUT_SESSION_ID}. Two jobs, in this order of importance:
 *
 * 1. Tell the buyer the one thing the product cannot start without (Manager access on their
 *    Google Business Profile). Stripe's own confirmation screen cannot carry this.
 * 2. Fire the Purchase pixel. Checkout happens off-site, so this page is the ONLY place a
 *    Purchase event can exist — without it the ad set optimizes toward button clicks.
 *
 * Renders completely with no query params: never gate the instructions on a session lookup.
 */

const PHONE = "6153151541";
const MANAGER_EMAIL = "joseph@skooped.io";
const PURCHASE_FIRED_KEY = "skooped_purchase_fired";
const INTAKE_ENDPOINT = "https://app.skooped.io/api/local-scoop/intake";

/* The persona fields, asked while the buyer is still sitting here. Every one of these would
   otherwise be a phone call, and the first review reply cannot be written without them. */
const INTAKE_FIELDS: { key: string; label: string; hint?: string; type?: "text" | "tel" | "email" | "textarea" }[] = [
  { key: "contact_name", label: "Your name", type: "text" },
  { key: "email", label: "Your email", hint: "I send your copy of these steps here.", type: "email" },
  { key: "phone", label: "Best number to reach you", hint: "For calls only. We never text this number.", type: "tel" },
  { key: "services", label: "Services you want to lead with", hint: "The two or three jobs you most want more of.", type: "textarea" },
  { key: "towns", label: "Towns you actually serve", type: "textarea" },
  { key: "escalation", label: "Who should I call about an unhappy customer, and at what number?", type: "textarea" },
  { key: "voice", label: 'Do you say "we" or "I" when you talk about the business?', type: "text" },
  { key: "never_say", label: "Anything I should never say on your behalf?", hint: "Prices, guarantees, a service you no longer offer.", type: "textarea" },
];

/** Meta dedupes on eventID, but a refresh with a stale pixel would still double count. */
function firePurchaseOnce(sessionId: string | null, plan: string) {
  const value = plan === "annual" ? 1000 : 100;
  const eventID = sessionId ? `ls_${sessionId}` : undefined;
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
    { value, currency: "USD", content_name: "local-scoop", content_type: "product" },
    eventID ? { eventID } : undefined
  );
}

const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <li className="flex gap-3">
    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
      {n}
    </span>
    <span className="leading-relaxed text-foreground">{children}</span>
  </li>
);

const WelcomeLocalScoop = () => {
  const [params] = useSearchParams();
  const plan = params.get("plan") === "annual" ? "annual" : "monthly";
  const sessionId = params.get("session_id");
  const [copied, setCopied] = useState(false);
  const [intake, setIntake] = useState<Record<string, string>>({});
  const [intakeState, setIntakeState] = useState<"idle" | "sending" | "done">("idle");

  const submitIntake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (intakeState === "sending") return;
    setIntakeState("sending");
    try {
      await fetch(INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...intake, session_id: sessionId ?? "", plan }),
      });
    } catch {
      /* Their answers are a convenience, not a gate. Never show a paying customer an error
         they cannot act on: the manager invite is the step that actually matters. */
    }
    setIntakeState("done");
  };

  usePageSeo({
    title: "You're in | The Local Scoop | Skooped",
    description: "Next steps for your Local Scoop plan: add Skooped as a manager on your Google Business Profile.",
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
    // Only a Stripe redirect carries a session_id. A direct or shared visit must not
    // fabricate a Purchase event: without the id there is no sale and no dedupe key.
    if (!sessionId) return;
    firePurchaseOnce(sessionId, plan);
  }, [sessionId, plan]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(MANAGER_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked: the address is on screen and selectable */
    }
  };

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
              You're in. One thing to do, then you're done.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Payment came through for The Local Scoop{plan === "annual" ? " (annual)" : ""}, thank you. Your website
              stays exactly where it is, I do not touch it. The one thing I need from you is manager access to your
              Google Business Profile, and it takes about ten minutes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── The one step ── */}
      <section className="pb-14 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-extrabold text-foreground mb-3">
                Add me as a manager on your Google Business Profile
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Sign in with the Google account that already manages your listing. That is the step people get wrong, so
                check which account you are in before you start. If you have more than one, use the one that can already
                edit your business hours.
              </p>

              <button
                type="button"
                onClick={copyEmail}
                className="mb-7 inline-flex w-full items-center justify-between gap-3 rounded-xl border-2 border-primary/40 bg-primary/5 px-4 py-3 text-left transition-colors hover:border-primary sm:w-auto"
              >
                <span className="font-heading text-base font-extrabold text-foreground break-all">{MANAGER_EMAIL}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-primary mb-4">
                    On a computer
                  </h3>
                  <ol className="space-y-3 text-sm">
                    <Step n={1}>Go to business.google.com and sign in.</Step>
                    <Step n={2}>
                      If you see a list of businesses, click yours. If you only have one, you are already in it.
                    </Step>
                    <Step n={3}>Click More, then Business Profile settings, then People and access.</Step>
                    <Step n={4}>
                      Click Add, paste {MANAGER_EMAIL}, choose Manager, then click Invite.
                    </Step>
                  </ol>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-primary mb-4">
                    On your phone
                  </h3>
                  <ol className="space-y-3 text-sm">
                    <Step n={1}>Open Google or Google Maps, signed in with that same account.</Step>
                    <Step n={2}>Search your own business name. Your profile controls appear at the top.</Step>
                    <Step n={3}>Tap Edit profile, then Business Profile settings, then People and access.</Step>
                    <Step n={4}>
                      Tap Add, paste {MANAGER_EMAIL}, choose Manager, then tap Invite.
                    </Step>
                  </ol>
                </div>
              </div>

              <p className="mt-7 rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-foreground leading-relaxed">
                There is nothing to send me. The invite comes straight to me, I accept it, and you get an email from me
                the same day so you know I am in.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Gotchas ── */}
      <section className="pb-14 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-5">Two things that trip people up</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2 text-accent">
                  <AlertTriangle size={16} />
                  <p className="font-heading font-bold text-foreground">Your profile is not verified yet</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nobody can be added as a manager until Google has verified your listing. Call or text me at{" "}
                  <a href={`tel:${PHONE}`} className="font-semibold text-primary hover:underline">
                    {PHONE_DISPLAY}
                  </a>{" "}
                  and I will walk you through verification.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2 text-accent">
                  <AlertTriangle size={16} />
                  <p className="font-heading font-bold text-foreground">You see two copies of your business</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  That is a duplicate listing, and it splits your reviews between them. Do not add me to both. Send me
                  both links and I will get them merged before we start.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Intake: the persona questions, asked once, here ── */}
      <section className="pb-14 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-extrabold text-foreground mb-2">
                While you're here: a few quick questions
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                This is what makes your review replies and posts sound like you instead of like
                software. Takes two minutes, and it saves us a phone call. Skip anything you would
                rather talk through.
              </p>

              {intakeState === "done" ? (
                <div className="rounded-xl bg-primary/10 p-5">
                  <p className="font-heading font-bold text-foreground mb-1">Got it, thank you.</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    That is everything I need on my end. The manager invite above is the only thing
                    still waiting on you.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitIntake} className="space-y-5">
                  {INTAKE_FIELDS.map((f) => (
                    <div key={f.key}>
                      <label htmlFor={f.key} className="block font-heading text-sm font-bold text-foreground mb-1">
                        {f.label}
                      </label>
                      {f.hint && <p className="mb-1.5 text-xs text-muted-foreground">{f.hint}</p>}
                      {f.type === "textarea" ? (
                        <textarea
                          id={f.key}
                          name={f.key}
                          rows={2}
                          value={intake[f.key] ?? ""}
                          onChange={(e) => setIntake((p) => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
                        />
                      ) : (
                        <input
                          id={f.key}
                          name={f.key}
                          type={f.type ?? "text"}
                          value={intake[f.key] ?? ""}
                          onChange={(e) => setIntake((p) => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
                        />
                      )}
                    </div>
                  ))}
                  <Button type="submit" variant="hero" size="lg" disabled={intakeState === "sending"}>
                    {intakeState === "sending" ? "Sending..." : "Send this to Joseph"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Nothing here is required. You can also just call me at {PHONE_DISPLAY} and we'll
                    do it out loud.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── First week ── */}
      <section className="pb-14 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-5">What happens in your first week</h2>
            <ul className="space-y-3">
              {[
                "I go through your profile and fix what is wrong: hours, phone, services, categories, holiday hours.",
                "Your first post goes up on your profile.",
                "I start working through reviews that never got a reply, a few at a time so it reads like a person, because it is one. If any of the old ones are from unhappy customers, I send those to you before anything posts.",
                "Anything three stars or under gets written by me personally. That never runs on autopilot.",
                "Once a month you get one link with your numbers: calls, direction requests, and clicks, straight from Google.",
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

      {/* ── Email + contact ── */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-2xl bg-maroon p-8 md:p-10 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-primary-foreground mb-3">Want these steps in writing?</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-xl mx-auto">
                Put your email in the questions above and I'll send you a copy of all of this. If it does not turn up in
                a few minutes, look in spam, then tell me.
              </p>
              <p className="text-primary-foreground/80 mb-4">
                Questions, or want to do this with me on the phone?
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

export default WelcomeLocalScoop;
