import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallTextButton from "@/components/CallTextButton";
import usePageSeo from "@/hooks/use-page-seo";
import { BLOG_POSTS, type BlogPost as Post } from "@/data/blogPosts";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* Inject/clean up a page-scoped Article JSON-LD <script>. */
const useArticleJsonLd = (post: Post | undefined) => {
  useEffect(() => {
    if (!post) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "blog-jsonld";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.datePublished,
          author: { "@type": "Person", name: "Joseph Anderson" },
          publisher: { "@type": "Organization", name: "Skooped", url: "https://skooped.io" },
          mainEntityOfPage: `https://skooped.io/blog/${post.slug}`,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Blog", item: "https://skooped.io/blog" },
            { "@type": "ListItem", position: 2, name: post.title, item: `https://skooped.io/blog/${post.slug}` },
          ],
        },
      ],
    });
    document.head.appendChild(el);
    return () => {
      document.getElementById("blog-jsonld")?.remove();
    };
  }, [post]);
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  usePageSeo({
    title: post ? `${post.title} | Skooped` : "Blog | Skooped",
    description: post?.description ?? "",
  });
  useArticleJsonLd(post);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />

        <article className="relative pt-28 pb-16 px-6">
          <div className="container mx-auto px-0 max-w-3xl">
            <Link to="/blog" className="text-sm text-primary font-semibold hover:underline">
              ← All posts
            </Link>
            <h1 className="text-3xl md:text-[40px] md:leading-tight font-extrabold text-foreground mt-4 mb-3">
              {post.title}
            </h1>
            <p className="text-xs text-muted-foreground mb-8">
              {formatDate(post.datePublished)} · {post.readMinutes} min read · Joseph Anderson, Skooped
            </p>

            <div className="space-y-6">
              {post.blocks.map((block, i) => (
                <div key={i} className="space-y-4">
                  {block.h2 && (
                    <h2 className="font-heading font-bold text-2xl text-foreground pt-2">
                      {block.h2}
                    </h2>
                  )}
                  {block.paragraphs?.map((p, j) => (
                    <p key={j} className="text-foreground/90 leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {block.list && (
                    <ul className="list-disc pl-6 space-y-2 text-foreground/90 leading-relaxed">
                      {block.list.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-border">
              <p className="font-heading text-xl font-extrabold text-foreground mb-2">
                Want this handled for you?
              </p>
              <p className="text-muted-foreground text-sm mb-5">
                Build from $500 + plans from $49/mo. Profile, reviews and SEO run monthly on the Double plan ($149),
                with every lead sent straight to you.{" "}
                <Link to="/plans" className="text-primary hover:underline">
                  See the plans
                </Link>
                .
              </p>
              <CallTextButton />
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
