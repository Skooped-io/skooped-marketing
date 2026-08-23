# Skooped lead router

`POST /api/lead` — the single endpoint every client site's contact form will POST to.
It validates the lead, resolves the owner by `site_id`, **texts them (Twilio)**, **emails
them (Resend)**, and **stores the lead (Supabase)** for the monthly proof-of-value report.

**It ships dormant.** With no env vars configured it answers `503 lead router not
configured yet` and delivers nothing — so it can live on production safely today and
come alive purely through Vercel env config. No code changes needed at go-live.

## Payload

```json
{
  "site_id": "gunns-fencing",
  "name": "Jane Doe",
  "phone": "615-555-0100",
  "email": "jane@example.com",
  "service": "Fence quote",
  "message": "Need ~120ft of privacy fence.",
  "source_url": "https://gunnsfencing.com/contact",
  "company_website": ""
}
```

- `site_id` required; at least one of `phone`/`email` required.
- `company_website` is a **honeypot** — include it as a hidden field on every form;
  if a bot fills it the router answers 200 but delivers nothing.

## Env vars (Vercel → Project → Settings → Environment Variables)

| Var | Purpose |
|---|---|
| `LEAD_ROUTES` | JSON routing table: `{"<site_id>": {"sms": "+1615...", "email": "...", "label": "Gunn's Fencing"}, "default": {"sms": "+16153151541", "email": "joseph@skooped.io", "label": "Skooped"}}` |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER` | SMS alerts. **A2P 10DLC registration needs the LLC's EIN — sequence after the LLC.** |
| `RESEND_API_KEY` / `LEAD_FROM_EMAIL` | Email alerts. From-address must be on the verified skooped.io Resend domain. |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Lead storage, table `leads` (schema below). Optional — until set, Vercel function logs are the ledger. |

Each sender is independently gated: set only Resend keys and you get email-only alerts.

## Supabase table (when ready)

```sql
create table leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  site_id text not null,
  name text, phone text, email text, message text, service text, source_url text,
  sms_sent boolean not null default false,
  email_sent boolean not null default false
);
```

## Wiring a client site's form (the template-library swap)

```html
<form onsubmit="sendLead(event)">
  <input name="name" placeholder="Your name" />
  <input name="phone" placeholder="Phone" required />
  <textarea name="message" placeholder="What do you need?"></textarea>
  <input name="company_website" style="display:none" tabindex="-1" autocomplete="off" />
  <button>Send</button>
</form>
<script>
  async function sendLead(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.site_id = "gunns-fencing"; // per site
    data.source_url = location.href;
    const res = await fetch("https://skooped.io/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    e.target.innerHTML = res.ok
      ? "<p>Got it, you'll hear from us shortly.</p>"
      : "<p>Something went wrong, please call us instead.</p>";
  }
</script>
```

The skooped.io contact form does NOT post here — a browser cannot hold the shared
secret. It posts to **`POST /api/contact`** (2026-08-12), which forces
`site_id: "skooped"`, skips the secret, and reuses the same senders
(`api/_lead-senders.ts`). If the router is unconfigured or down, the form falls back
to the old SMS/mailto composer so no lead is lost.

## Smoke test

```bash
curl -s -X POST https://skooped.io/api/lead \
  -H "Content-Type: application/json" \
  -d '{"site_id":"test","phone":"615-555-0100","name":"Smoke Test"}'
# before config: {"ok":false,"error":"lead router not configured yet"}
# after config:  {"ok":true,"delivered":{"sms":true,"email":true,"stored":true}}
```

Unit tests for the pure logic: `npm test` (see `src/test/lead-core.test.ts`).

## `POST /api/sms-enroll` (2026-08-20)

One-time enrollment confirmation text (the message the A2P registration promises),
sent to a route that already carries `sms` + a valid `sms_consent_on`. Body
`{"site_id":"..."}`, header `x-skooped-secret`. Fails closed: 503 with no secret
configured, 401 on mismatch, 404 for an unknown site_id (no `default` fallback),
409 without consent. GET answers 405 with the live commit sha (deploy probe for
`hq/ops/sms-enroll.ps1`). Exists because every prod env var is write-only, so the
Twilio token can only be used from the deployment.

## Spam gate (2026-08-23)

Every lead is scored before any sender fires. Two stages, cheapest first:

1. **Blocklist** — exact sender match on email, email domain, or phone (digits
   only, so formatting never decides it). Env var `LEAD_BLOCKLIST`:
   ```json
   {"emails":["someone@example.com"],"domains":["jmailservice.com"],"phones":["8054002077"]}
   ```
   This is the mechanism behind a client asking "block this one". Tuning it is an
   env change plus a redeploy, never a code change.
2. **Content score** — weighted markers over `message` + `service`. The weights
   key on the *shape* of a pitch (someone selling: "we offer", "I'm X from Y",
   "your website", "are you interested") rather than its topic, because Skooped's
   own inbound is people asking about SEO and websites. Topic words alone are
   capped and can never reach the threshold by themselves.

On a hit the row is **stored and flagged** (`spam`, `spam_reason`) and the SMS and
email legs are skipped; the endpoint still answers 200 so a spammer learns
nothing and the client site does not retry. Nothing is ever dropped: a false
positive that silently eats a real lead costs far more than one spam email, so
flagged rows stay queryable and the full lead is written to the Vercel log line
`lead-router: spam suppressed` as the audit trail.

The portal's monthly report cron excludes flagged rows from the lead count
(`countCentralLeads`), so a client's proof-of-value number is never inflated by
junk. Schema: `client-portal/supabase/migrations/20260823000000_leads_spam_flag.sql`.
