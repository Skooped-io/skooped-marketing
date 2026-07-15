import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { menuItems, menuOrder, categoryLabels, type MenuCategory } from "@/data/menuItems";

const ORDER: MenuCategory[] = ["build", "plan", "topping"];

/**
 * The full-menu index that sits under the interactive builder on /plans.
 * Every item deep-links to its own detail page (/plans/:slug) — the internal-linking
 * layer that turns the builder into a browsable, SEO-friendly menu.
 */
const MenuIndex = () => (
  <section className="py-12 px-6">
    <div className="container mx-auto max-w-5xl">
      <ScrollReveal>
        <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-2">
          The full menu, explained
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Every scoop and topping, with exactly what's included and what it costs. Tap any item for the details.
        </p>
      </ScrollReveal>

      <div className="flex flex-col gap-10">
        {ORDER.map((cat) => {
          const items = menuOrder.map((s) => menuItems[s]).filter((i) => i.category === cat);
          return (
            <div key={cat}>
              <ScrollReveal>
                <div className="mb-4">
                  <h3 className="font-heading text-lg font-extrabold text-foreground">{categoryLabels[cat].title}</h3>
                  <p className="text-sm text-muted-foreground">{categoryLabels[cat].blurb}</p>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, i) => (
                  <ScrollReveal key={item.slug} delay={i * 0.04}>
                    <Link
                      to={`/plans/${item.slug}`}
                      className="group relative flex items-center gap-4 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-4 h-full transition-all hover:border-primary hover:-translate-y-0.5 hover:shadow-md"
                    >
                      {item.popular && (
                        <span className="absolute -top-2 right-3 rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-wider text-accent-foreground">
                          Popular
                        </span>
                      )}
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/5">
                        <img src={item.hero} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</span>
                          <span className="whitespace-nowrap font-heading text-sm font-extrabold text-primary tabular-nums">
                            {item.priceLabel}
                            <small className="ml-0.5 font-semibold text-muted-foreground">{item.priceUnit}</small>
                          </span>
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          Details <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default MenuIndex;
