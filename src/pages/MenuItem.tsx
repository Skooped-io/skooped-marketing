import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronRight, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";
import { PHONE_DISPLAY } from "@/components/CallTextButton";
import { menuItems, categoryLabels, type MenuItem as MItem } from "@/data/menuItems";

const PHONE = "6153151541";

/* ───── schema.org JSON-LD (Product + FAQPage + BreadcrumbList) ───── */
const buildJsonLd = (item: MItem) => {
  const url = `https://skooped.io/plans/${item.slug}`;
  const { offer } = item;

  let offers: Record<string, unknown>;
  if (offer.kind === "fixed" || offer.kind === "recurring") {
    offers = {
      "@type": "Offer",
      price: String(offer.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    };
    if (offer.kind === "recurring" && offer.unit) {
      offers.priceSpecification = {
        "@type": "UnitPriceSpecification",
        price: String(offer.price),
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: offer.unit === "MONTH" ? "MON" : "ANN",
      };
    }
  } else if (offer.kind === "from") {
    offers = {
      "@type": "AggregateOffer",
      lowPrice: String(offer.lowPrice),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    };
  } else {
    offers = {
      "@type": "AggregateOffer",
      lowPrice: String(offer.lowPrice),
      highPrice: String(offer.highPrice),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    };
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Product",
      name: `${item.name} — ${item.subtitle}`,
      description: item.seo.description,
      brand: { "@type": "Brand", name: "Skooped" },
      offers,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Plans", item: "https://skooped.io/plans" },
        { "@type": "ListItem", position: 2, name: item.name, item: url },
      ],
    },
  ];

  if (item.faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: item.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

/* Inject/clean up a page-scoped JSON-LD <script>. */
const useJsonLd = (item: MItem | undefined) => {
  useEffect(() => {
    if (!item) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "menu-jsonld";
    el.text = JSON.stringify(buildJsonLd(item));
    document.head.appendChild(el);
    return () => {
      document.getElementById("menu-jsonld")?.remove();
    };
  }, [item]);
};

/* ───── FAQ item ───── */
const FaqItem = ({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) => (
  <div className="border-b border-border">
    <button className="w-full flex items-center justify-between py-5 text-left group" onClick={toggle}>
      <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors pr-4">{q}</span>
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown size={20} className="text-muted-foreground shrink-0" />
      </motion.span>
    </button>
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-5 text-sm text-muted-foreground leading-relaxed bg-card rounded-lg px-4 py-3 mb-4">{a}</p>
    </motion.div>
  </div>
);

/* ═══════════════════ PAGE ═══════════════════ */
const MenuItem = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? menuItems[slug] : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageSeo(item?.seo ?? { title: "Plans | Skooped", description: "" });
  useJsonLd(item);

  if (!item) return <Navigate to="/plans" replace />;

  const contactHref = `/contact?build=${encodeURIComponent(item.cta.message)}`;
  const catLabel = categoryLabels[item.category].title;
  const related = item.related.map((s) => menuItems[s]).filter(Boolean);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div
          className="absolute inset-0 bg-background"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 25% 35%, hsl(340 72% 52% / 0.07), transparent 55%), radial-gradient(ellipse at 75% 60%, hsl(34 68% 48% / 0.05), transparent 55%)",
          }}
        />
        <div className="relative container mx-auto px-6 max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/plans" className="hover:text-primary transition-colors">Plans</Link>
            <ChevronRight size={14} className="opacity-60" />
            <span className="text-foreground font-medium">{item.name}</span>
          </nav>

          <div className="grid md:grid-cols-[1fr_minmax(0,380px)] gap-10 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-bold text-accent mb-5">
                  {catLabel}
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-1">
                  {item.name}
                  {item.popular && (
                    <span className="ml-3 align-middle rounded-full bg-accent px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider text-accent-foreground">
                      Most popular
                    </span>
                  )}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="font-heading text-lg font-bold text-primary mb-4">{item.subtitle}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">{item.tagline}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-extrabold text-primary tabular-nums">{item.priceLabel}</span>
                  <span className="text-sm text-muted-foreground">{item.priceUnit}</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-wrap gap-3">
                  <Link to={contactHref}><Button variant="hero" size="lg">{item.cta.label}</Button></Link>
                  <Link to="/plans"><Button variant="outline" size="lg">Build your sundae</Button></Link>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Or call/text{" "}
                  <a href={`tel:${PHONE}`} className="font-semibold text-primary hover:underline">{PHONE_DISPLAY}</a>. Nothing is charged here.
                </p>
              </ScrollReveal>
            </div>

            {/* Hero image on the builder's stage */}
            <ScrollReveal delay={0.2}>
              <div className="rounded-3xl border border-border bg-card p-4 shadow-md">
                <div
                  className="relative mx-auto grid aspect-square w-full max-w-[340px] place-items-center overflow-hidden rounded-2xl p-6"
                  style={{ background: "radial-gradient(120% 90% at 50% 22%, #F7E3D6 0%, #E6C9C2 78%)" }}
                >
                  <img
                    src={item.hero}
                    alt={`${item.name} — ${item.subtitle}`}
                    className="max-h-full max-w-full object-contain"
                    style={{ filter: "drop-shadow(0 12px 10px rgba(90,20,40,.22))" }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Intro + What's included ── */}
      <section className="py-16 px-6 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-lg text-foreground leading-relaxed mb-10 max-w-3xl">{item.intro}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-6">{item.includesHeading}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {item.includes.map((inc, i) => (
              <ScrollReveal key={inc.label} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 h-full">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10">
                    <Check size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground leading-snug">{inc.label}</p>
                    {inc.note && <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{inc.note}</p>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {item.disclaimer && (
            <ScrollReveal>
              <p className="mt-6 text-xs text-muted-foreground italic">{item.disclaimer}</p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ── Best for + How it fits ── */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-extrabold text-foreground mb-5">Who it's for</h2>
            <ul className="space-y-3">
              {item.bestFor.map((b) => (
                <li key={b} className="flex items-start gap-3 text-muted-foreground">
                  <ArrowRight size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border-2 border-primary/25 bg-primary/5 p-6 h-full">
              <h2 className="font-heading text-xl font-extrabold text-foreground mb-3">How it fits the menu</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.fits}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Goes with (related) ── */}
      {related.length > 0 && (
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-extrabold text-foreground mb-6">Goes well with</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r, i) => (
                <ScrollReveal key={r.slug} delay={i * 0.05}>
                  <Link
                    to={`/plans/${r.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-3 grid h-16 w-16 place-items-center rounded-xl bg-primary/5">
                      <img src={r.hero} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                    <p className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{r.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-snug flex-1">{r.subtitle}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      See details <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {item.faq.length > 0 && (
        <section className="py-16 px-6 bg-card/50">
          <div className="container mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-8">Questions about the {item.name}</h2>
            </ScrollReveal>
            {item.faq.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="py-20 px-6 bg-maroon">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              Ready to add the {item.name}?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Takes you to our contact form with your order pre-filled. Nothing is charged there.
            </p>
            <Link to={contactHref}><Button variant="hero" size="xl">{item.cta.label}</Button></Link>
            <div className="mt-6">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 font-heading font-bold text-primary-foreground/80 hover:text-primary transition-colors">
                <Phone size={18} /> Or call/text: {PHONE_DISPLAY}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MenuItem;
