/**
 * Service-area ("city") pages — /local/:slug.
 * One entry per town we serve. Slugs are permanent once deployed
 * (see REDIRECT DISCIPLINE in CLAUDE.md). Add new URLs to public/sitemap.xml.
 */

export type CityFaq = { q: string; a: string };

export type CityPage = {
  slug: string;
  city: string; // "Brentwood, TN"
  cityShort: string; // "Brentwood"
  title: string; // meta title
  description: string; // meta description
  headline: string;
  intro: string[];
  whyLocal: string[];
  faqs: CityFaq[];
};

export const CITY_PAGES: CityPage[] = [
  {
    slug: "brentwood-tn",
    city: "Brentwood, TN",
    cityShort: "Brentwood",
    title: "Websites & Local SEO for Brentwood, TN Businesses | Skooped",
    description:
      "Skooped builds websites and runs local SEO for Brentwood, TN businesses — $500 builds, plans from $49/mo, and every lead emailed to you instantly (texts optional). Based next door in Franklin.",
    headline: "Websites & local marketing for Brentwood businesses",
    intro: [
      "Brentwood might be the most competitive place in Middle Tennessee to be a local business. Between Maryland Farms, the Cool Springs edge, and some of the highest household spending in the state, the customers are here — and so is everyone competing for them.",
      "Skooped is based ten minutes down the road in Franklin. We build fast, professional websites for a flat $500, then run the monthly work that decides who Brentwood customers actually find: your Google Business Profile, your reviews, and real pages about your services. Every lead your site captures reaches you the moment it lands, by email always and by text if you opt in.",
    ],
    whyLocal: [
      "Google shows different results on Concord Road than it does in Cool Springs — local search is a map, not a leaderboard. Winning Brentwood means looking active and trusted to Google specifically in the neighborhoods you serve.",
      "That's monthly work, not a one-time fix: profile posts, review replies, and a steady drip of real content. It's exactly what our plans automate — with a real person in Franklin running it.",
    ],
    faqs: [
      {
        q: "Do you already work with Brentwood businesses?",
        a: "Our clients are home-service and local businesses across Williamson County and greater Nashville — fencing, landscaping, cleaning, wellness, and more. Brentwood is squarely in our home service area; we're in Franklin, one exit away.",
      },
      {
        q: "What does it cost?",
        a: "A professional site build is a flat $500, and monthly plans start at $49/mo. The Double plan ($149/mo) adds the ongoing local SEO — Google Business Profile posts, review management, and monthly content — that competitive markets like Brentwood reward.",
      },
      {
        q: "How fast can we launch?",
        a: "Most builds go live in about a week. The local SEO work starts the same month — first the foundations (profile, listings, site), then rankings typically start moving in months two to four.",
      },
    ],
  },
  {
    slug: "spring-hill-tn",
    city: "Spring Hill, TN",
    cityShort: "Spring Hill",
    title: "Websites & Local SEO for Spring Hill, TN Businesses | Skooped",
    description:
      "Skooped builds websites and runs local SEO for Spring Hill, TN businesses — $500 builds, plans from $49/mo, and every lead emailed to you instantly (texts optional). Based in Franklin.",
    headline: "Websites & local marketing for Spring Hill businesses",
    intro: [
      "Spring Hill is one of the fastest-growing cities in Tennessee — thousands of new households a year, whole subdivisions appearing between visits. Every one of those new residents needs a plumber, a landscaper, a gym, a salon — and none of them know who to call yet. They all start with Google.",
      "Skooped builds fast, professional websites for a flat $500, then runs the monthly work that decides who those new neighbors find first: your Google Business Profile, your reviews, and real pages about your services. Every lead your site captures reaches you the moment it lands, by email always and by text if you opt in.",
    ],
    whyLocal: [
      "In a town growing this fast, the map is up for grabs — the businesses that look active on Google this year become the default choices for the next wave of new residents. Search results in the new subdivisions off Buckner Lane look different than they do near the crossroads; winning Spring Hill means winning the whole map.",
      "That's steady monthly work — profile posts, review replies, real content — which is exactly what our plans automate, with a real person in Franklin running it.",
    ],
    faqs: [
      {
        q: "Do you work with Spring Hill businesses?",
        a: "Our clients are home-service and local businesses across Williamson and Maury counties and greater Nashville. Spring Hill is in our core service area — we're based up the road in Franklin.",
      },
      {
        q: "What does it cost?",
        a: "A professional site build is a flat $500, and monthly plans start at $49/mo. The Double plan ($149/mo) adds ongoing local SEO — Google Business Profile posts, review management, and monthly content — which is how new businesses get established on the Spring Hill map.",
      },
      {
        q: "How fast can we launch?",
        a: "Most builds go live in about a week. The local SEO work starts the same month — foundations first (profile, listings, site), with rankings typically moving in months two to four.",
      },
    ],
  },
];
