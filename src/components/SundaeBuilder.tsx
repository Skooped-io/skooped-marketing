import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY } from "@/components/CallTextButton";
import { track } from "@/lib/analytics";

import cup1 from "@/assets/sundae/cup-1.png";
import cup2 from "@/assets/sundae/cup-2.png";
import cup3 from "@/assets/sundae/cup-3.png";
import waffle1 from "@/assets/sundae/waffle-1.png";
import waffle2 from "@/assets/sundae/waffle-2.png";
import waffle3 from "@/assets/sundae/waffle-3.png";
import coupe1 from "@/assets/sundae/coupe-1.png";
import coupe2 from "@/assets/sundae/coupe-2.png";
import coupe3 from "@/assets/sundae/coupe-3.png";
import topCherry from "@/assets/sundae/topping-cherry.png";
import topSprinkles from "@/assets/sundae/topping-sprinkles.png";
import topExtra from "@/assets/sundae/topping-extra.png";
import topPint from "@/assets/sundae/topping-pint.png";
import topChocDip from "@/assets/sundae/topping-chocdip.png";

/* ── Hero renders + measured crown points (percent of the 560×780 stage) ── */
type Hero = { src: string; cx: number; cy: number };
const HEROES: Record<string, Hero> = {
  "cup-1": { src: cup1, cx: 52.5, cy: 50.8 },
  "cup-2": { src: cup2, cx: 50.7, cy: 43.2 },
  "cup-3": { src: cup3, cx: 50.2, cy: 32.8 },
  "waffle-1": { src: waffle1, cx: 50.3, cy: 23.8 },
  "waffle-2": { src: waffle2, cx: 48.6, cy: 14.2 },
  "waffle-3": { src: waffle3, cx: 48.3, cy: 9.4 },
  "coupe-1": { src: coupe1, cx: 51.4, cy: 46.4 },
  "coupe-2": { src: coupe2, cx: 51.1, cy: 41.0 },
  "coupe-3": { src: coupe3, cx: 50.4, cy: 33.6 },
};

type ConeId = "cup" | "waffle" | "sundae";
type ScoopId = "single" | "double" | "triple";
type TopId = "sprinkles" | "cherry" | "chocdip" | "extra" | "pint";

const CONE_PREFIX: Record<ConeId, string> = { cup: "cup", waffle: "waffle", sundae: "coupe" };

// Step-1 thumbs all show a single scoop on purpose: the cards differ ONLY by vessel
// (the one-time build). Scoop count means the monthly plan, and that's shown in Step 2 —
// never let a build card imply "bigger build = more scoops."
const CONES: { id: ConeId; name: string; price: string; per: string; thumb: string; blurb: string; popular?: boolean }[] = [
  { id: "cup", name: "Cup", price: "$500", per: "one-time", thumb: "cup-1", blurb: "5-page site, on-page SEO, lead form wired to your phone." },
  { id: "waffle", name: "Waffle Cone", price: "$1,000", per: "one-time", thumb: "waffle-1", blurb: "Everything in the Cup + Google Business Profile, reviews & local SEO.", popular: true },
  { id: "sundae", name: "The Sundae", price: "from $2,000", per: "quoted", thumb: "coupe-1", blurb: "Custom — fixed quote via a $300 Sample Spoon session, credited to your build." },
];

const SCOOPS: { id: ScoopId; n: number; name: string; mo: number; thumb: string; blurb: string; popular?: boolean }[] = [
  { id: "single", n: 1, name: "Single", mo: 49, thumb: "waffle-1", blurb: "Hosting, security, every lead texted to you, monthly report." },
  { id: "double", n: 2, name: "Double", mo: 149, thumb: "waffle-2", blurb: "Single + Google posts, review replies & ongoing local SEO.", popular: true },
  { id: "triple", n: 3, name: "Triple", mo: 299, thumb: "waffle-3", blurb: "Double + ads management & social media." },
];

const TOPS: { id: TopId; name: string; price: string; per: string; thumb: string; blurb: string }[] = [
  { id: "sprinkles", name: "Sprinkles", price: "+$350", per: "/mo", thumb: topSprinkles, blurb: "Dedicated content specialist — on-site content day, 12 produced posts a month. Rides on the Triple plan." },
  { id: "cherry", name: "Cherry on Top", price: "+$500", per: "one-time", thumb: topCherry, blurb: "Business Launch Pack — LLC filing, EIN, starter operating agreement." },
  { id: "chocdip", name: "Chocolate Dipped", price: "+$200", per: "one-time", thumb: topChocDip, blurb: "One-round brand refresh — logo tidy + consistent colors across your whole site." },
  { id: "extra", name: "Extra Scoop", price: "+$25", per: "/mo", thumb: topExtra, blurb: "Another website on the same plan — same alerts, same report." },
  { id: "pint", name: "By the Pint", price: "10×", per: "once a year", thumb: topPint, blurb: "Prepay the year at 10× monthly — 2 months free." },
];

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const PHONE = "6153151541";

/* Live Stripe Payment Links (v2, terms-consent required) — STRIPE-CATALOG-2026-07.md in the
   HQ repo is canonical. Only the build (or the Sample Spoon, on custom) is payable up front:
   the monthly plan and toppings get set up at launch, so no links for those here. */
const PAY_LINKS: Record<"cup" | "waffle" | "sampleSpoon", string> = {
  cup: "https://buy.stripe.com/3cI28q82B0qg3ZPdyE8Ra06",
  waffle: "https://buy.stripe.com/00weVc1Ed2yo53T0LS8Ra07",
  sampleSpoon: "https://buy.stripe.com/4gM7sKbeN7SIcwl9io8Ra08",
};

/* ── Option card ── */
const OptionCard = ({
  thumb, name, blurb, price, per, popular, selected, onClick, role,
}: {
  thumb: string; name: string; blurb: string; price: string; per: string;
  popular?: boolean; selected: boolean; onClick: () => void; role: "radio" | "toggle";
}) => (
  <button
    type="button"
    onClick={onClick}
    role={role === "radio" ? "radio" : undefined}
    aria-checked={role === "radio" ? selected : undefined}
    aria-pressed={role === "toggle" ? selected : undefined}
    className={`relative grid grid-cols-[56px_1fr_auto] items-center gap-3 w-full text-left rounded-2xl border-2 p-2.5 pr-4 transition-all ${
      selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary hover:-translate-y-0.5"
    }`}
  >
    {selected && (
      <span className="absolute -top-2 -right-2 grid place-items-center rounded-full bg-primary text-[0.7rem] font-extrabold text-primary-foreground shadow" style={{ height: "1.375rem", width: "1.375rem" }}>
        ✓
      </span>
    )}
    <span className="grid h-14 w-14 place-items-center">
      <img src={thumb} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
    </span>
    <span className="min-w-0">
      <span className="font-heading text-base font-extrabold leading-tight text-foreground">
        {name}
        {popular && (
          <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-[0.62rem] font-extrabold uppercase tracking-wider text-accent-foreground">
            Most popular
          </span>
        )}
      </span>
      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{blurb}</span>
    </span>
    <span className="text-right">
      <span className="whitespace-nowrap font-heading text-[1.05rem] font-extrabold text-primary tabular-nums">{price}</span>
      <span className="block text-[0.68rem] text-muted-foreground">{per}</span>
    </span>
  </button>
);

const STAGE_BG = "radial-gradient(120% 90% at 50% 22%, #F7E3D6 0%, #E6C9C2 78%)";

/* The live ice-cream render + its crown-anchored / side topping overlays. Rendered at two
   sizes: the full desktop stage and the compact pinned mobile preview. Overlays are
   percent-positioned so they scale with whatever width the container is given. */
const StageArt = ({
  hero, heroKey, tops, coneName, scoopName,
}: {
  hero: Hero; heroKey: string; tops: Record<TopId, boolean>; coneName: string; scoopName: string;
}) => (
  <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "560 / 780", background: STAGE_BG }}>
    <AnimatePresence>
      <motion.img
        key={heroKey}
        src={hero.src}
        alt={`${coneName} with ${scoopName.toLowerCase()} scoop`}
        className="absolute inset-0 h-full w-full object-contain"
        style={{ filter: "drop-shadow(0 12px 10px rgba(90,20,40,.22))" }}
        initial={{ opacity: 0, y: -16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.42, ease: [0.24, 0.9, 0.34, 1.05] }}
      />
    </AnimatePresence>

    {/* crown-anchored overlays */}
    {/* chocolate coating — drawn first so sprinkles & cherry sit on top of the dip. */}
    <div className="pointer-events-none absolute" style={{ left: `${hero.cx}%`, top: `${hero.cy}%`, width: "56%", transform: "translate(-50%, -14%)", transition: "left .38s cubic-bezier(.34,1.3,.64,1), top .38s cubic-bezier(.34,1.3,.64,1)" }}>
      <img src={topChocDip} alt="" className={`w-full origin-top transition-all duration-300 ${tops.chocdip ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
    </div>
    <div className="pointer-events-none absolute" style={{ left: `${hero.cx}%`, top: `${hero.cy}%`, width: "34%", transform: "translate(-50%, -16%)", transition: "left .38s cubic-bezier(.34,1.3,.64,1), top .38s cubic-bezier(.34,1.3,.64,1)" }}>
      <img src={topSprinkles} alt="" className={`w-full origin-top transition-all duration-300 ${tops.sprinkles ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
    </div>
    <div className="pointer-events-none absolute" style={{ left: `${hero.cx}%`, top: `${hero.cy}%`, width: "20%", transform: "translate(-50%, -86%)", transition: "left .38s cubic-bezier(.34,1.3,.64,1), top .38s cubic-bezier(.34,1.3,.64,1)" }}>
      <img src={topCherry} alt="" className={`w-full origin-bottom transition-all duration-300 ${tops.cherry ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
    </div>

    {/* side overlays */}
    <div className="pointer-events-none absolute bottom-[5%] right-[1%] w-[25%]">
      <img src={topExtra} alt="" className={`w-full origin-bottom transition-all duration-300 ${tops.extra ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
    </div>
    <div className="pointer-events-none absolute bottom-[3%] left-[1%] w-[25%]">
      <img src={topPint} alt="" className={`w-full origin-bottom transition-all duration-300 ${tops.pint ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
    </div>
  </div>
);

const SundaeBuilder = () => {
  const [cone, setCone] = useState<ConeId>("cup");
  const [scoop, setScoop] = useState<ScoopId>("single");
  const [tops, setTops] = useState<Record<TopId, boolean>>({ sprinkles: false, cherry: false, chocdip: false, extra: false, pint: false });

  const scoopObj = SCOOPS.find((s) => s.id === scoop)!;
  const coneObj = CONES.find((c) => c.id === cone)!;
  const n = scoopObj.n;
  const heroKey = `${CONE_PREFIX[cone]}-${n}`;
  const hero = HEROES[heroKey];

  const custom = cone === "sundae";
  const pint = tops.pint;

  const { today, monthly, todayText, moText, order } = useMemo(() => {
    const todayVal =
      (custom ? 2000 : cone === "cup" ? 500 : 1000) +
      (tops.cherry ? 500 : 0) +
      (tops.chocdip ? 200 : 0) +
      (pint ? scoopObj.mo * 10 : 0);
    const monthlyVal = (pint ? 0 : scoopObj.mo) + (tops.sprinkles ? 350 : 0) + (tops.extra ? 25 : 0);
    const names = [coneObj.name, scoopObj.name];
    TOPS.forEach((t) => tops[t.id] && names.push(t.name));
    return {
      today: todayVal,
      monthly: monthlyVal,
      todayText: (custom ? "from " : "") + fmt(todayVal),
      moText: fmt(monthlyVal) + "/mo",
      order: names.join(" + "),
    };
  }, [cone, scoop, tops, custom, pint, coneObj.name, scoopObj.mo, scoopObj.name]);

  const detail = custom
    ? "Fixed quote via the $300 Sample Spoon — credited to your build."
    : pint
    ? `Plan prepaid for the year (${fmt(scoopObj.mo * 10)} — 2 months free).`
    : cone === "cup" && scoop === "single" && monthly === 49
    ? "Most clients start exactly here."
    : "Build billed once. Plan starts at launch.";

  const smsBody = custom
    ? `Hey Skooped — I built my sundae on your site: ${order}. I'd like to book the $300 Sample Spoon to get my quote.`
    : `Hey Skooped — I built my sundae on your site: ${order}. ${todayText} today, then ${moText}. Let's do it.`;
  const contactHref = `/contact?build=${encodeURIComponent(smsBody)}`;

  // Sprinkles rides on the Triple plan: toggling it on bumps the scoop to Triple,
  // and dropping below Triple removes it — keeps the builder honest to the ops rule
  // (the dedicated specialist only makes sense once Triple's ads amplify the content).
  const toggleTop = (id: TopId) => {
    const turningOn = !tops[id];
    setTops((t) => ({ ...t, [id]: !t[id] }));
    if (id === "sprinkles" && turningOn) setScoop("triple");
  };

  const selectScoop = (id: ScoopId) => {
    setScoop(id);
    if (id !== "triple" && tops.sprinkles) setTops((t) => ({ ...t, sprinkles: false }));
  };

  // High-intent conversion signal: the visitor assembled a sundae and hit the CTA.
  const fireSundaeBuilt = () =>
    track("sundae_built", {
      cone: coneObj.name,
      scoop: scoopObj.name,
      toppings: TOPS.filter((t) => tops[t.id]).map((t) => t.name).join(", ") || "none",
      today,
      monthly,
      custom,
    });

  return (
    <div className="relative">
      <div className="px-6">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[minmax(0,380px)_1fr] gap-8 items-start pb-6">

          {/* Stage — a live preview that stays pinned while you build.
              Desktop: the full vertical card in the left column.
              Mobile: a compact bar pinned under the navbar (top-16 = the 64px navbar) so the
              ice cream AND the running price never scroll out of view while the steps below
              scroll under it. */}
          <div className="sticky top-16 z-30 self-start md:top-20">
            {/* desktop */}
            <div className="hidden rounded-3xl border border-border bg-card p-4 shadow-md md:block">
              <div className="mx-auto w-full max-w-[360px]">
                <StageArt hero={hero} heroKey={heroKey} tops={tops} coneName={coneObj.name} scoopName={scoopObj.name} />
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                <strong className="text-foreground">{order}</strong>
                <br />
                {todayText} today · then {moText}
              </p>
            </div>
            {/* mobile: compact pinned preview */}
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-2.5 shadow-md backdrop-blur-sm md:hidden">
              <div className="w-[84px] shrink-0">
                <StageArt hero={hero} heroKey={heroKey} tops={tops} coneName={coneObj.name} scoopName={scoopObj.name} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-extrabold leading-tight text-foreground">{order}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-bold tabular-nums text-primary">{todayText}</span> today · then{" "}
                  <span className="font-bold tabular-nums text-primary">{moText}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-8">
            <div role="radiogroup" aria-label="One-time build">
              <h2 className="mb-0.5 flex items-baseline gap-2.5 font-heading text-xl font-extrabold text-foreground">
                <span className="text-[0.8rem] uppercase tracking-widest text-primary">Step 1 · One-time</span> Pick your cup
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">The one-time build everything sits on. Pay it once, own the site — never billed again.</p>
              <div className="flex flex-col gap-2">
                {CONES.map((c) => (
                  <OptionCard
                    key={c.id}
                    thumb={HEROES[c.thumb].src}
                    name={c.name}
                    blurb={c.blurb}
                    price={c.price}
                    per={c.per}
                    popular={c.popular}
                    selected={cone === c.id}
                    onClick={() => setCone(c.id)}
                    role="radio"
                  />
                ))}
              </div>
            </div>

            <div role="radiogroup" aria-label="Monthly plan">
              <h2 className="mb-0.5 flex items-baseline gap-2.5 font-heading text-xl font-extrabold text-foreground">
                <span className="text-[0.8rem] uppercase tracking-widest text-primary">Step 2 · Every month</span> Pick your scoops
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">The monthly plan that keeps it hosted, secure, and texting you every lead — billed every month.</p>
              <div className="flex flex-col gap-2">
                {SCOOPS.map((s) => (
                  <OptionCard
                    key={s.id}
                    thumb={HEROES[s.thumb].src}
                    name={s.name}
                    blurb={s.blurb}
                    price={`$${s.mo}`}
                    per="/mo"
                    popular={s.popular}
                    selected={scoop === s.id}
                    onClick={() => selectScoop(s.id)}
                    role="radio"
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-0.5 flex items-baseline gap-2.5 font-heading text-xl font-extrabold text-foreground">
                <span className="text-[0.8rem] uppercase tracking-widest text-primary">Step 3 · Add-ons</span> Add your toppings
                <span className="text-sm font-normal text-muted-foreground">(optional — tap to toggle)</span>
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">Add them at signup or whenever you're ready. Sprinkles rides on the Triple plan — pick it and we'll bump you up.</p>
              <div className="flex flex-col gap-2">
                {TOPS.map((t) => (
                  <OptionCard
                    key={t.id}
                    thumb={t.thumb}
                    name={t.name}
                    blurb={t.blurb}
                    price={t.price}
                    per={t.per}
                    selected={!!tops[t.id]}
                    onClick={() => toggleTop(t.id)}
                    role="toggle"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky receipt — pins while the builder is in view, releases into the content below */}
      <div className="sticky bottom-0 z-40 border-t-2 border-border bg-card/95 backdrop-blur-sm shadow-[0_-8px_24px_-14px_rgba(110,31,44,0.3)]">
        <div className="container mx-auto max-w-5xl px-6 py-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="min-w-0 flex-1 basis-56 text-sm text-muted-foreground leading-snug">
              <strong className="block text-foreground text-[0.9rem]">{order}</strong>
              {detail}
            </div>
            <div className="flex items-baseline gap-6">
              <div>
                <span className="block text-[0.64rem] font-bold uppercase tracking-widest text-muted-foreground">Due today</span>
                <motion.span key={today} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="inline-block font-heading text-xl font-extrabold text-primary tabular-nums">
                  {todayText}
                </motion.span>
              </div>
              <div>
                <span className="block text-[0.64rem] font-bold uppercase tracking-widest text-muted-foreground">Every month</span>
                <motion.span key={monthly} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="inline-block font-heading text-xl font-extrabold text-primary tabular-nums">
                  {fmt(monthly)}<small className="text-sm font-semibold text-muted-foreground">/mo</small>
                </motion.span>
              </div>
            </div>
            <Link to={contactHref} onClick={fireSundaeBuilt}>
              <Button variant="hero" size="lg" className="whitespace-nowrap">
                {custom ? "Get my Sample Spoon quote →" : "Get this build →"}
              </Button>
            </Link>
          </div>
          <p className="mt-1.5 text-[0.72rem] text-muted-foreground">
            Takes you to our contact form with the order pre-filled — or call/text{" "}
            <a href={`tel:${PHONE}`} className="text-primary font-semibold hover:underline">{PHONE_DISPLAY}</a>. Nothing is charged here.{" "}
            Ready right now?{" "}
            <a
              href={custom ? PAY_LINKS.sampleSpoon : cone === "cup" ? PAY_LINKS.cup : PAY_LINKS.waffle}
              onClick={() => {
                fireSundaeBuilt();
                track("pay_link_click", { item: custom ? "sample-spoon" : cone, source: "builder" });
              }}
              className="text-primary font-semibold hover:underline"
            >
              Pay online
            </a>
            {custom
              ? " — book your Sample Spoon ($300, credited to your build)."
              : ` — your ${coneObj.name} build (${cone === "cup" ? "$500" : "$1,000"}) checks out now; the plan starts at launch.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SundaeBuilder;
