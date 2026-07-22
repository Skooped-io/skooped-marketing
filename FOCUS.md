# Focus — skooped-marketing (skooped.io)

Priority lens for every session in this repo. Business-wide priorities live in
`skooped/FOCUS.md`. Rules: **Now stays short and ordered**; work that doesn't advance a
Now item gets an OFF-FOCUS callout (kit focus hook). Update in the same session work lands.

## Now

1. **Lead-router go-live wiring** — the router in `api/` ships every plan's promised
   text/email lead alerts and is deployed dormant (503). The moment env keys exist
   (Resend first — email leg needs no A2P; Twilio + Supabase after), set them in Vercel
   and verify live with a real POST. Blocked on the Vercel account handoff.
2. **Analytics decision for skooped.io** — Plausible script is installed but records
   nothing until the account/goal exists (or the decision flips to Vercel Analytics).
   Needed before the coaster-QR order.

## Next

- Swap the form component in the 13 industry templates → every new build ships with
  lead alerts by default
- NAP phone reconciliation (615-315-1541 vs legacy 615-856-3871) once the number's
  carrier is known
- Templates-section fate (Joseph deciding)

## Parked (explicitly not now — needs a reason to reopen)

- UI polish of any kind — the site is live and selling; cosmetic work only when a Now
  item requires it. (Named time sink — see kit PREFERENCES.md focus guardrails.)
- New sections/pages not tied to a promised deliverable
