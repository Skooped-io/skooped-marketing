/**
 * Blog posts — one entry per post, newest first.
 * Adding a post: append an object here, add the URL to public/sitemap.xml.
 * Slugs are permanent once deployed (see REDIRECT DISCIPLINE in CLAUDE.md).
 */

export type BlogBlock = {
  h2?: string;
  paragraphs?: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string; // meta description + index card
  datePublished: string; // ISO date
  readMinutes: number;
  blocks: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-local-businesses-get-found-on-google-2026",
    title: "How Local Businesses Actually Get Found on Google in 2026",
    description:
      "What actually decides which Franklin-area businesses show up when someone searches — your Google Business Profile, reviews, and website, in that order.",
    datePublished: "2026-07-23",
    readMinutes: 5,
    blocks: [
      {
        paragraphs: [
          "When someone in Franklin needs a fence fixed, a drain cleared, or a haircut, they don't scroll Facebook — they Google it. What they see next is decided in about two seconds: a map with three businesses on it (the \"local pack\"), then the regular results underneath. If you're not in one of those two places, you don't exist for that customer.",
          "The good news: what puts you there isn't a mystery, and it isn't a bidding war. Surveys of local-search professionals agree on roughly the same weighting year after year, and the 2026 numbers break down like this.",
        ],
      },
      {
        h2: "What actually moves local rankings",
        list: [
          "Your Google Business Profile — about a third of the whole game. Categories, completeness, photos, activity.",
          "Reviews — roughly 20%. Not just the star average: how recently, how often, and whether the business replies.",
          "Your website's content — about 15%. Real pages about real services in real places, not a one-page brochure.",
          "Everything else — links from local organizations, consistent directory listings, site speed — matters, but it's the supporting cast.",
        ],
        paragraphs: [
          "Notice what's NOT on that list: tricks. There's no secret meta tag, no \"SEO dust\" to sprinkle. The businesses that win the map pack are the ones that look — to Google and to customers — like the most active, most trusted option nearby.",
        ],
      },
      {
        h2: "The Google Business Profile is the new homepage",
        paragraphs: [
          "Most customers who find you on Google never visit your website at all — they call straight from the profile. So treat it like your storefront: every service listed, real photos (job sites, crew, finished work — not stock), correct hours, and a post every week or so, which tells Google the business is alive.",
          "An abandoned profile reads like a dark storefront. A maintained one quietly outranks competitors who \"did SEO once\" in 2023.",
        ],
      },
      {
        h2: "Reviews are a system, not luck",
        paragraphs: [
          "The businesses with 150 reviews aren't luckier than the ones with 12 — they ask, every time, at the moment the customer is happiest. Then they reply to every single one, because replies are visible to the next hundred people deciding whether to call.",
          "We wrote a separate guide on doing this right — the short version: make the ask a habit, make the link one tap, and never buy or fake a review.",
        ],
      },
      {
        h2: "What your website is actually for",
        paragraphs: [
          "The site's job in local search is to prove what the profile claims. A page for each service you offer and each area you serve gives Google something to rank and gives customers a reason to trust you. One thin homepage can't do either.",
          "That's why ongoing SEO isn't a switch you flip — it's one real page at a time: a service explained properly, a town you serve, a question every customer asks.",
        ],
      },
      {
        h2: "The honest timeline",
        paragraphs: [
          "SEO is planting, not a vending machine. Months one and two are soil work — the profile, the listings, the site. Months three and four, rankings start moving. Months four to six, the calls come. Unlike ads, it keeps producing after you stop feeding it — but anyone promising \"#1 on Google in 30 days\" is selling you something else.",
          "And there is no single #1 anymore: Google shows different results in Cool Springs than in Leiper's Fork. What matters is winning the map across the area you actually serve.",
        ],
      },
      {
        h2: "The takeaway",
        paragraphs: [
          "Profile, reviews, and real pages — done consistently — beat any trick. If you'd rather run your business while someone runs that loop for you, that is exactly what the Double plan ($149/mo) does: profile posts, review management, and one real page of SEO work every month, with a plain-English report of what changed.",
        ],
      },
    ],
  },
  {
    slug: "google-reviews-guide-local-business",
    title: "The Right Way to Ask for Google Reviews (and Why Replies Matter)",
    description:
      "Reviews are marketing you already earned. How local businesses should ask, what to text, and why replying — especially to bad ones — wins the next customer.",
    datePublished: "2026-07-23",
    readMinutes: 4,
    blocks: [
      {
        paragraphs: [
          "Every finished job where the customer says \"thank you, it looks great\" is a five-star review you either collected or left on the table. Most local businesses leave almost all of them on the table — not because customers refuse, but because nobody asked.",
          "Reviews do two jobs at once. They're roughly a fifth of what decides local rankings, and they're the first thing the next customer reads before choosing between you and the other guy on the map. No other marketing does both.",
        ],
      },
      {
        h2: "Ask at the peak, not later",
        paragraphs: [
          "The moment to ask is when the customer is happiest — standing in front of the finished work, saying so out loud. \"Would you mind putting that in a Google review? I'll text you the link right now.\" Said in person, followed by a text within the hour, that converts more than any follow-up email ever will.",
          "Here's a text that works — copy it:",
        ],
        list: [
          "\"Thanks again for choosing us! If you were happy with the work, a quick Google review helps us more than you'd believe: [your review link]. Takes about 30 seconds.\"",
        ],
      },
      {
        h2: "Make it one tap",
        paragraphs: [
          "Google gives every business a direct \"write a review\" link (find it in your Business Profile dashboard under \"Ask for reviews\"). Send that link — never \"just Google us and leave a review,\" which loses half the people at step one.",
        ],
      },
      {
        h2: "Reply to every review, especially the bad ones",
        paragraphs: [
          "Replies aren't for the person who wrote the review — they're for the hundred people who read it afterward. A business that answers every review, thanks people by name, and handles a bad review with grace looks run by an adult. Silence looks like nobody's home.",
          "For a negative review: acknowledge, don't argue, and move it offline. \"We're sorry this happened — call us at the shop and we'll make it right\" wins the reader even when it doesn't win back the reviewer.",
        ],
      },
      {
        h2: "The rules (Google enforces these)",
        list: [
          "Never buy reviews or trade discounts for them.",
          "Never review-gate — asking only happy customers via a filter that hides unhappy ones violates Google's policy.",
          "Never write reviews for yourself. It's obvious, and it's removable.",
        ],
        paragraphs: [
          "Play it straight — the compounding is the point. Two asks a week is a hundred asks a year; even a modest hit rate rebuilds your whole profile.",
        ],
      },
      {
        h2: "The takeaway",
        paragraphs: [
          "A review system is a habit plus a link. If you'd rather not think about it, the Double plan ($149/mo) handles the whole loop — the asks go out automatically, every review gets a drafted reply, and anything three stars or under waits for a human before a word is posted.",
        ],
      },
    ],
  },
];
