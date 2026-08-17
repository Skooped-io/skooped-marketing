/* Live Stripe Payment Links for combined build + plan checkout, one link per combo
   (v2 pattern: terms consent required, phone collection on, promo codes on, redirect to
   /welcome/build). Created 2026-08-16 via the Stripe MCP; STRIPE-CATALOG-2026-07.md in
   the HQ repo is canonical.

   Money model, and the reason two cadences differ:
   - monthly combos carry a 14-day free trial on the plan, so checkout charges the build
     alone today and the subscription's first charge lands at launch ("plan starts at
     launch" is a Stripe trial, not a manual step anymore).
   - annual (By the Pint) combos have no trial: checkout charges build + the prepaid year
     today, which is exactly what the builder's receipt shows for pint. */

export type ComboBuild = "cup" | "waffle";
export type ComboPlan = "single" | "double" | "triple";
export type ComboCadence = "monthly" | "annual";

const COMBO_PAY_LINKS: Record<ComboBuild, Record<ComboPlan, Record<ComboCadence, string>>> = {
  cup: {
    single: {
      monthly: "https://buy.stripe.com/4gM28qfv3a0QaodcuA8Ra0j",
      annual: "https://buy.stripe.com/8x27sK2Ih0qg0NDams8Ra0p",
    },
    double: {
      monthly: "https://buy.stripe.com/3cI3cufv34GwaodgKQ8Ra0k",
      annual: "https://buy.stripe.com/7sY8wO6Yx5KAdAp66c8Ra0q",
    },
    triple: {
      monthly: "https://buy.stripe.com/bJe7sK4Qp1ukdAp3Y48Ra0l",
      annual: "https://buy.stripe.com/eVqaEWeqZ6OEeEtbqw8Ra0r",
    },
  },
  waffle: {
    single: {
      monthly: "https://buy.stripe.com/00w4gyeqZgpeaodcuA8Ra0m",
      annual: "https://buy.stripe.com/fZu5kC6Yx1uk67X8ek8Ra0s",
    },
    double: {
      monthly: "https://buy.stripe.com/fZu8wObeN5KA2VLcuA8Ra0n",
      annual: "https://buy.stripe.com/eVq14maaJ8WM1RHcuA8Ra0t",
    },
    triple: {
      monthly: "https://buy.stripe.com/4gMdR8beNb4Ubsh9io8Ra0o",
      annual: "https://buy.stripe.com/6oU3cu6YxflaeEt66c8Ra0u",
    },
  },
};

/** Days between checkout and the plan's first charge on monthly combos (the build window). */
export const BUILD_TRIAL_DAYS = 14;

export const comboPayLink = (build: ComboBuild, plan: ComboPlan, cadence: ComboCadence): string =>
  COMBO_PAY_LINKS[build][plan][cadence];
