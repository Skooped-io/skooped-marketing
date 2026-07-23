import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CallTextButton from "@/components/CallTextButton";
import usePageSeo from "@/hooks/use-page-seo";
import { CITY_PAGES, type CityPage as City } from "@/data/cityPages";

/* Inject/clean up page-scoped ProfessionalService + FAQPage JSON-LD. */
const useCityJsonLd = (page: City | undefined) => {
  useEffect(() => {
    if (!page) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "city-jsonld";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          name: "Skooped",
          url: `https://skooped.io/local/${page.slug}`,
          telephone: "+16153151541",
          address: { "@type": "PostalAddress", addressLocality: "Franklin", addressRegion: "TN" },
          areaServed: { "@type": "City", name: page.city },
          description: page.description,
        },
        {
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
    document.head.appendChild(el);
    return () => {
      document.getElementById("city-jsonld")?.remove();
    };
  }, [page]);
};

const services = [
  { name: "Website build — flat $500", desc: "Professional, fast, built for local search. Live in about a week." },
  { name: "Plans from $49/mo", desc: "Hosting, edits, monitoring — up to full local SEO and ads management." },
  { name: "Ongoing local SEO", desc: "Google Business Profile posts, review management, and one real page of content every month." },
  { name: "Every lead texted to you", desc: "Form fills hit your phone the moment they land — name, number, what they need." },
];

const CityPage = () => {
  const { slug } = useParams();
  const page = CITY_PAGES.find((p) => p.slug === slug);

  usePageSeo({
    title: page?.title ?? "Service Areas | Skooped",
    description: page?.description ?? "",
  });
  useCityJsonLd(page);

  if (!page) return <Navigate to="/" replace />;

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-[40%] -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />

        {/* Header */}
        <section className="relative pt-28 pb-8">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-[44px] md:leading-tight font-extrabold text-foreground mb-4">
                {page.headline}
              </h1>
            </ScrollReveal>
            {page.intro.map((p, i) => (
              <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-3 text-left sm:text-center">
                  {p}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="relative pb-10 px-6">
          <div className="container mx-auto px-0 max-w-4xl">
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <ScrollReveal key={s.name} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">{s.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <p className="text-sm text-muted-foreground text-center mt-6">
                See how it's priced on <Link to="/plans" className="text-primary hover:underline">the plans page</Link>,
                or browse <Link to="/templates" className="text-primary hover:underline">industries we build for</Link>.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Why local */}
        <section className="relative py-8 px-6">
          <div className="container mx-auto px-0 max-w-3xl">
            <ScrollReveal>
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border">
                <h2 className="font-heading text-2xl font-extrabold text-foreground mb-4">
                  Why {page.cityShort} is won on the map
                </h2>
                {page.whyLocal.map((p, i) => (
                  <p key={i} className="text-foreground/90 text-sm leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-8 px-6">
          <div className="container mx-auto px-0 max-w-3xl">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-extrabold text-foreground mb-4 text-center">
                Common questions
              </h2>
            </ScrollReveal>
            <div className="space-y-4">
              {page.faqs.map((f, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6">
                    <h3 className="font-heading font-bold text-base text-foreground mb-2">{f.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-10 pb-16 px-6">
          <div className="container mx-auto px-0 max-w-2xl">
            <ScrollReveal>
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-border">
                <p className="font-heading text-xl font-extrabold text-foreground mb-2">
                  Ready to be the business {page.cityShort} finds first?
                </p>
                <p className="text-muted-foreground text-sm mb-5">
                  Tell us what you do — we'll tell you straight what fits.
                </p>
                <CallTextButton />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CityPage;
