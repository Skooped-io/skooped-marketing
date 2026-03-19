import {
  Globe, Search, MapPin, Instagram, Megaphone, Star,
  PhoneIncoming, BarChart3, type LucideIcon,
} from "lucide-react";

export interface IndustryFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
  premium?: boolean;
}

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface IndustryTemplate {
  slug: string;
  name: string;
  emoji: string;
  badge: string;
  headline: string;
  subtext: string;
  mockupCompany: string;
  mockupHeadline: string;
  mockupLocation: string;
  mockupCta: string;
  featuresHeading: string;
  features: IndustryFeature[];
  statsHeading: string;
  stats: IndustryStat[];
  testimonial: { quote: string; cite: string };
  faq: IndustryFaq[];
  ctaHeadline: string;
  ctaSub: string;
  seo: { title: string; description: string };
}

/* ───── Shared features builder ───── */
const baseFeatures = (industry: string, searchTerms: string, socialContent: string): IndustryFeature[] => [
  { icon: Globe, title: `Custom ${industry} Website`, desc: `Not a generic template. Built specifically for ${industry.toLowerCase()} businesses with service pages, galleries, and quote request forms.` },
  { icon: Search, title: "Local SEO That Works", desc: `We target the searches that matter: ${searchTerms}. Your competitors are ranking. You should be too.` },
  { icon: MapPin, title: "Google Business Profile", desc: "We set up and optimize your Google Business Profile so you show up in Maps, local search, and the 3-pack." },
  { icon: Instagram, title: "Social Media Content", desc: `${socialContent} — all created and scheduled automatically.` },
  { icon: Megaphone, title: "Google Local Service Ads", desc: "Pay-per-lead ads that put you at the very top of Google. Only pay when a customer calls.", premium: true },
  { icon: Star, title: "Review Management", desc: "Automated review requests after every job. More 5-star reviews = more trust = more calls." },
  { icon: PhoneIncoming, title: "Call/Text Back System", desc: "Miss a call? We automatically text them back within 60 seconds. Don't lose that lead.", premium: true },
  { icon: BarChart3, title: "Weekly Reports", desc: "Know exactly how many people visited your site, called your number, and found you on Google." },
];

const baseStats: IndustryStat[] = [
  { value: "8,000+", label: "Google impressions in 3 months" },
  { value: "3x", label: "More phone calls in 60 days" },
  { value: "$0", label: "Down to get started" },
];

const baseFaq = (industry: string): IndustryFaq[] => [
  { q: `How is this different from other ${industry.toLowerCase()} marketing companies?`, a: `Traditional agencies charge thousands and lock you in contracts. Skooped gives you an entire AI marketing team for a fraction of the price — and you own everything.` },
  { q: "I already have a website. Can you work with it?", a: "Absolutely. We can rebuild from this template or optimize what you have. We'll do a free review and give you an honest recommendation." },
  { q: `Do you work with ${industry.toLowerCase()} businesses outside of Tennessee?`, a: "Yes. Our AI team works nationwide. We target the specific cities and services you cover." },
  { q: "How quickly will I see results?", a: "Your website goes live within a week. SEO movement starts in 30-60 days. Ad leads can start the same week your campaigns launch." },
  { q: "What if I need to update my website myself?", a: "You'll have access to a simple editor in your dashboard. Change your colors, update your text, swap photos — no coding needed." },
];

/* ═══════════════════ INDUSTRY DATA ═══════════════════ */

export const industryTemplates: Record<string, IndustryTemplate> = {
  roofing: {
    slug: "roofing",
    name: "Roofing",
    emoji: "🏠",
    badge: "Built for Roofers",
    headline: "A website that gets your phone ringing.",
    subtext: "Built specifically for roofing contractors. Custom design, SEO that targets homeowners in your area, Google Ads, social media — all managed by your AI team. Be online in under a week.",
    mockupCompany: "Your Roofing Company",
    mockupHeadline: "Your Trusted\nRoofing Experts",
    mockupLocation: "Serving Nashville & Middle Tennessee",
    mockupCta: "Get a Free Estimate",
    featuresHeading: "Everything a roofing company needs to dominate online",
    features: baseFeatures("Roofing", "'roof repair near me', 'roofing contractor [your city]', 'emergency roof leak'", "Before and after photos, seasonal tips, storm damage awareness posts"),
    statsHeading: "What Skooped does for roofing companies",
    stats: baseStats,
    testimonial: { quote: "We went from barely showing up on Google to getting calls every day. Skooped built our site, set up our ads, and now we're on track for our best year ever.", cite: "Roofing contractor, Franklin TN" },
    faq: [
      { q: "How is this different from HomeAdvisor or Angi?", a: "Those platforms own your leads and charge you per click. With Skooped, you own your website, your SEO, and your customers. No middleman taking a cut." },
      { q: "I already have a website. Can you work with it?", a: "Absolutely. We can rebuild from this template or optimize what you have. We'll do a free review and give you an honest recommendation." },
      { q: "Do you work with roofing companies outside of Tennessee?", a: "Yes. Our AI team works nationwide. We target the specific cities and services you cover." },
      { q: "How quickly will I see results?", a: "Your website goes live within a week. SEO movement starts in 30-60 days. Ad leads can start the same week your campaigns launch." },
      { q: "What if I need to update my website myself?", a: "You'll have access to a simple editor in your dashboard. Change your colors, update your text, swap photos — no coding needed." },
    ],
    ctaHeadline: "Your next customer is searching for a roofer right now.",
    ctaSub: "Make sure they find you.",
    seo: {
      title: "Roofing Contractor Website & Marketing | Built for Roofers | Skooped",
      description: "Get a custom roofing website with SEO, Google Ads, and social media — all managed by AI. Built specifically for roofing contractors. From $49/mo. No contracts.",
    },
  },

  landscaping: {
    slug: "landscaping",
    name: "Landscaping",
    emoji: "🌿",
    badge: "Built for Landscapers",
    headline: "Grow your business like you grow lawns.",
    subtext: "A website built for landscaping professionals. Showcase your work, rank for local searches, and let your AI team handle the marketing while you handle the yards.",
    mockupCompany: "Your Landscaping Company",
    mockupHeadline: "Beautiful Yards,\nHappy Clients",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Get a Free Quote",
    featuresHeading: "Everything a landscaping business needs to grow online",
    features: baseFeatures("Landscaping", "'landscaping near me', 'lawn care [your city]', 'landscape design services'", "Project showcases, seasonal lawn tips, before and after transformations"),
    statsHeading: "What Skooped does for landscaping companies",
    stats: baseStats,
    testimonial: { quote: "We used to rely on word of mouth. Now we're getting 10+ calls a week from Google alone. Skooped made it effortless.", cite: "Landscaping business owner" },
    faq: baseFaq("Landscaping"),
    ctaHeadline: "Homeowners are searching for a landscaper right now.",
    ctaSub: "Make sure they find you.",
    seo: {
      title: "Landscaping Website & Marketing | Built for Landscapers | Skooped",
      description: "Custom landscaping website with SEO, social media, and Google Ads — all managed by AI. From $49/mo. No contracts.",
    },
  },

  fencing: {
    slug: "fencing",
    name: "Fencing",
    emoji: "🏗️",
    badge: "Built for Fence Companies",
    headline: "Build your fence business a stronger online presence.",
    subtext: "Custom website designed for fencing contractors. Show off your work, rank locally, and let AI handle your digital marketing around the clock.",
    mockupCompany: "Your Fencing Company",
    mockupHeadline: "Quality Fences,\nBuilt to Last",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Get a Free Estimate",
    featuresHeading: "Everything a fencing company needs to win online",
    features: baseFeatures("Fencing", "'fence installation near me', 'fence company [your city]', 'privacy fence contractor'", "Project galleries, fence style guides, seasonal promotion posts"),
    statsHeading: "What Skooped does for fencing companies",
    stats: baseStats,
    testimonial: { quote: "Skooped built us a site that actually looks professional. We're ranking on Google and the phone hasn't stopped ringing.", cite: "Fence company owner" },
    faq: baseFaq("Fencing"),
    ctaHeadline: "Someone nearby is searching for a fence contractor right now.",
    ctaSub: "Make sure they find you.",
    seo: {
      title: "Fencing Contractor Website & Marketing | Skooped",
      description: "Custom fencing website with SEO, Google Ads, and social media — managed by AI. From $49/mo. No contracts.",
    },
  },

  construction: {
    slug: "construction",
    name: "Construction",
    emoji: "👷",
    badge: "Built for Contractors",
    headline: "Build your reputation online like you build on-site.",
    subtext: "A powerful website for construction companies. Showcase projects, attract commercial and residential clients, and rank where it counts — all on autopilot.",
    mockupCompany: "Your Construction Company",
    mockupHeadline: "Building Trust,\nOne Project at a Time",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Request a Bid",
    featuresHeading: "Everything a construction company needs to dominate online",
    features: baseFeatures("Construction", "'general contractor near me', 'construction company [your city]', 'home builder contractor'", "Project progress photos, completed builds, team spotlights, safety tips"),
    statsHeading: "What Skooped does for construction companies",
    stats: baseStats,
    testimonial: { quote: "We needed a website that matched the quality of our work. Skooped delivered — and the leads followed.", cite: "General contractor" },
    faq: baseFaq("Construction"),
    ctaHeadline: "Your next big project starts with someone searching Google.",
    ctaSub: "Make sure they find your company.",
    seo: {
      title: "Construction Company Website & Marketing | Skooped",
      description: "Custom construction website with SEO, Google Ads, and social media — managed by AI. From $49/mo. No contracts.",
    },
  },

  "therapy-counseling": {
    slug: "therapy-counseling",
    name: "Therapy & Counseling",
    emoji: "💙",
    badge: "Built for Therapists",
    headline: "Help more people find the support they need.",
    subtext: "A calming, professional website built for therapists and counselors. Attract new clients, rank in local search, and let your AI team handle the marketing.",
    mockupCompany: "Your Therapy Practice",
    mockupHeadline: "A Safe Space\nto Heal & Grow",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Book a Consultation",
    featuresHeading: "Everything a therapy practice needs to connect with clients",
    features: baseFeatures("Therapy", "'therapist near me', 'counseling [your city]', 'anxiety therapist', 'couples counseling'", "Mental health tips, self-care content, awareness posts, client resources"),
    statsHeading: "What Skooped does for therapy practices",
    stats: baseStats,
    testimonial: { quote: "I was relying on Psychology Today for referrals. Now my own website brings in clients every week. It's been a game-changer.", cite: "Licensed therapist" },
    faq: baseFaq("Therapy"),
    ctaHeadline: "Someone is searching for a therapist in your area right now.",
    ctaSub: "Make sure they find your practice.",
    seo: {
      title: "Therapist Website & Marketing | Built for Counselors | Skooped",
      description: "Custom therapy website with SEO, social media, and online booking — managed by AI. From $49/mo. No contracts.",
    },
  },

  "life-coaching": {
    slug: "life-coaching",
    name: "Life Coaching",
    emoji: "🧭",
    badge: "Built for Coaches",
    headline: "Guide more people — starting with your website.",
    subtext: "A bold, inspiring website for life coaches. Build credibility, attract high-value clients, and let AI amplify your message across every channel.",
    mockupCompany: "Your Coaching Practice",
    mockupHeadline: "Transform Your Life,\nStarting Today",
    mockupLocation: "Serving Clients Worldwide",
    mockupCta: "Book a Discovery Call",
    featuresHeading: "Everything a coaching business needs to scale online",
    features: baseFeatures("Life Coaching", "'life coach near me', 'career coach [your city]', 'executive coaching', 'business coach'", "Motivational content, client success stories, coaching tips, workshop announcements"),
    statsHeading: "What Skooped does for coaching businesses",
    stats: baseStats,
    testimonial: { quote: "My old website looked amateur. Skooped built something that actually reflects the transformation I offer. Bookings are up 200%.", cite: "Certified life coach" },
    faq: baseFaq("Life Coaching"),
    ctaHeadline: "Your next client is looking for a coach right now.",
    ctaSub: "Make sure they find you.",
    seo: {
      title: "Life Coach Website & Marketing | Skooped",
      description: "Custom life coaching website with SEO, social media, and booking — managed by AI. From $49/mo. No contracts.",
    },
  },

  "auto-repair": {
    slug: "auto-repair",
    name: "Auto Repair",
    emoji: "🔧",
    badge: "Built for Auto Shops",
    headline: "Drive more customers to your shop.",
    subtext: "A website built for auto repair shops and mechanics. Show your services, build trust with reviews, and rank for every 'mechanic near me' search in your area.",
    mockupCompany: "Your Auto Repair Shop",
    mockupHeadline: "Honest Service,\nExpert Repairs",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Schedule Service",
    featuresHeading: "Everything an auto shop needs to win online",
    features: baseFeatures("Auto Repair", "'auto repair near me', 'mechanic [your city]', 'oil change near me', 'brake repair'", "Maintenance tips, seasonal car care reminders, behind-the-scenes shop content"),
    statsHeading: "What Skooped does for auto repair shops",
    stats: baseStats,
    testimonial: { quote: "We were invisible online. Now we're the first result for 'mechanic near me' in our town. Skooped changed everything.", cite: "Auto shop owner" },
    faq: baseFaq("Auto Repair"),
    ctaHeadline: "Someone's car just broke down and they're Googling a mechanic.",
    ctaSub: "Make sure they find your shop.",
    seo: {
      title: "Auto Repair Website & Marketing | Built for Mechanics | Skooped",
      description: "Custom auto repair website with SEO, Google Ads, and social media — managed by AI. From $49/mo. No contracts.",
    },
  },

  "real-estate": {
    slug: "real-estate",
    name: "Real Estate Services",
    emoji: "🏡",
    badge: "Built for Real Estate Pros",
    headline: "List your business, not just properties.",
    subtext: "A polished website for real estate agents and property managers. Stand out in your market, generate leads, and let AI keep your marketing running 24/7.",
    mockupCompany: "Your Real Estate Business",
    mockupHeadline: "Find Your\nDream Home",
    mockupLocation: "Serving Your Local Market",
    mockupCta: "Search Properties",
    featuresHeading: "Everything a real estate business needs to dominate online",
    features: baseFeatures("Real Estate", "'real estate agent near me', 'homes for sale [your city]', 'property manager [your area]'", "Market updates, listing spotlights, neighborhood guides, home buying tips"),
    statsHeading: "What Skooped does for real estate businesses",
    stats: baseStats,
    testimonial: { quote: "I was paying hundreds for leads on Zillow. Now my own site generates more qualified leads for a fraction of the cost.", cite: "Real estate agent" },
    faq: baseFaq("Real Estate"),
    ctaHeadline: "Buyers and sellers are searching for an agent right now.",
    ctaSub: "Make sure they find you first.",
    seo: {
      title: "Real Estate Website & Marketing | Skooped",
      description: "Custom real estate website with SEO, social media, and lead gen — managed by AI. From $49/mo. No contracts.",
    },
  },

  "personal-training": {
    slug: "personal-training",
    name: "Personal Training",
    emoji: "💪",
    badge: "Built for Trainers",
    headline: "Flex your online presence.",
    subtext: "A high-energy website for personal trainers and fitness coaches. Showcase transformations, book clients online, and let AI handle your marketing while you train.",
    mockupCompany: "Your Fitness Business",
    mockupHeadline: "Transform Your\nBody & Mind",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Book a Session",
    featuresHeading: "Everything a personal trainer needs to grow online",
    features: baseFeatures("Personal Training", "'personal trainer near me', 'fitness coach [your city]', 'weight loss trainer'", "Client transformations, workout tips, nutrition advice, motivational content"),
    statsHeading: "What Skooped does for personal trainers",
    stats: baseStats,
    testimonial: { quote: "I went from posting on Instagram and hoping for DMs to having a real website that books clients automatically. Total game-changer.", cite: "Certified personal trainer" },
    faq: baseFaq("Personal Training"),
    ctaHeadline: "Someone in your area just decided to get in shape.",
    ctaSub: "Make sure they find your gym.",
    seo: {
      title: "Personal Trainer Website & Marketing | Skooped",
      description: "Custom personal training website with SEO, social media, and booking — managed by AI. From $49/mo. No contracts.",
    },
  },

  "salon-barbershop": {
    slug: "salon-barbershop",
    name: "Salon & Barbershop",
    emoji: "💇",
    badge: "Built for Salons & Barbers",
    headline: "Cut through the competition.",
    subtext: "A stylish website for salons and barbershops. Show off your work, let clients book online, and rank for every 'haircut near me' search in your area.",
    mockupCompany: "Your Salon or Barbershop",
    mockupHeadline: "Look Good,\nFeel Great",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Book Appointment",
    featuresHeading: "Everything a salon needs to stand out online",
    features: baseFeatures("Salon", "'hair salon near me', 'barbershop [your city]', 'best haircut near me'", "Style galleries, before and after shots, trend posts, seasonal promotions"),
    statsHeading: "What Skooped does for salons & barbershops",
    stats: baseStats,
    testimonial: { quote: "Our bookings doubled in the first month. Skooped made us look as professional online as we are in the chair.", cite: "Salon owner" },
    faq: baseFaq("Salon"),
    ctaHeadline: "Someone nearby is looking for a fresh cut or color right now.",
    ctaSub: "Make sure they book with you.",
    seo: {
      title: "Salon & Barbershop Website & Marketing | Skooped",
      description: "Custom salon website with SEO, booking, and social media — managed by AI. From $49/mo. No contracts.",
    },
  },

  plumbing: {
    slug: "plumbing",
    name: "Plumbing",
    emoji: "🔵",
    badge: "Built for Plumbers",
    headline: "Stop leaking leads.",
    subtext: "A website that works as hard as you do. Built for plumbers who want to rank on Google, get more emergency calls, and grow without the agency price tag.",
    mockupCompany: "Your Plumbing Company",
    mockupHeadline: "Fast, Reliable\nPlumbing Service",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Call for Service",
    featuresHeading: "Everything a plumbing company needs to dominate online",
    features: baseFeatures("Plumbing", "'plumber near me', 'emergency plumber [your city]', 'drain cleaning', 'water heater repair'", "Maintenance tips, seasonal plumbing advice, emergency prep posts, project spotlights"),
    statsHeading: "What Skooped does for plumbing companies",
    stats: baseStats,
    testimonial: { quote: "We're now the first result for 'emergency plumber' in three cities. Skooped did in weeks what our old agency couldn't do in a year.", cite: "Plumbing company owner" },
    faq: baseFaq("Plumbing"),
    ctaHeadline: "Someone's pipe just burst and they're Googling a plumber.",
    ctaSub: "Make sure they call you.",
    seo: {
      title: "Plumbing Website & Marketing | Built for Plumbers | Skooped",
      description: "Custom plumbing website with SEO, Google Ads, and social media — managed by AI. From $49/mo. No contracts.",
    },
  },

  electrical: {
    slug: "electrical",
    name: "Electrical",
    emoji: "⚡",
    badge: "Built for Electricians",
    headline: "Power up your marketing.",
    subtext: "A professional website for electricians and electrical contractors. Rank for local searches, showcase your expertise, and let AI bring the leads to you.",
    mockupCompany: "Your Electrical Company",
    mockupHeadline: "Licensed & Trusted\nElectrical Experts",
    mockupLocation: "Serving Your Local Area",
    mockupCta: "Get a Free Quote",
    featuresHeading: "Everything an electrical company needs to grow online",
    features: baseFeatures("Electrical", "'electrician near me', 'electrical contractor [your city]', 'panel upgrade', 'emergency electrician'", "Safety tips, electrical code updates, project showcases, energy-saving advice"),
    statsHeading: "What Skooped does for electrical companies",
    stats: baseStats,
    testimonial: { quote: "We went from zero online presence to fully booked in 60 days. Skooped handles all our marketing so we can focus on the work.", cite: "Electrical contractor" },
    faq: baseFaq("Electrical"),
    ctaHeadline: "A homeowner just lost power and they're searching for an electrician.",
    ctaSub: "Make sure they find you.",
    seo: {
      title: "Electrician Website & Marketing | Skooped",
      description: "Custom electrical contractor website with SEO, Google Ads, and social media — managed by AI. From $49/mo. No contracts.",
    },
  },
};
