import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSeo from "@/hooks/use-page-seo";
import { BLOG_POSTS } from "@/data/blogPosts";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Blog = () => {
  usePageSeo({
    title: "Blog | Local Marketing, Straight Answers | Skooped",
    description:
      "Plain-English guides on how local businesses get found — Google Business Profiles, reviews, and SEO that actually moves the phone. From Skooped in Franklin, TN.",
  });

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />

        <section className="relative pt-28 pb-8">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-[48px] md:leading-tight font-extrabold text-foreground mb-3">
                Straight answers on local marketing.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                How local businesses actually get found — no jargon, no magic tricks.
                Written by the people running it every day in Franklin, TN.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative pb-20 px-6">
          <div className="container mx-auto px-0 max-w-3xl space-y-5">
            {BLOG_POSTS.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.08}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="block rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors"
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatDate(post.datePublished)} · {post.readMinutes} min read
                  </p>
                  <h2 className="font-heading font-bold text-xl text-foreground mb-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.description}
                  </p>
                  <p className="text-primary text-sm font-semibold mt-3">Read it →</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
