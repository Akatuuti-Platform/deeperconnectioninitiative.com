# Deeper Connection Initiative (Web)

Public website for **[Deeper Connection Initiative](https://deeperconnectioninitiative.com)** (DCI Wellness) — a mental health initiative building community-owned healing infrastructure through tactile toolkits, guided reflection, storytelling, and connection.

**Live:** [deeperconnectioninitiative.com](https://deeperconnectioninitiative.com)

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) + Svelte 5
- TypeScript
- Tailwind CSS v4
- [bits-ui](https://bits-ui.com) components
- [Flutterwave](https://flutterwave.com) checkout (server-side payment creation + webhooks)
- [Resend](https://resend.com) for contact / order email
- Deployed on [Vercel](https://vercel.com) (`@sveltejs/adapter-vercel`, Node 22)

## Getting started

```sh
# From the web/ directory
npm install
cp .env.example .env   # then fill in secrets
npm run dev -- --open
```

### Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Local dev server           |
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |
| `npm run check`   | Typecheck (svelte-check)   |
| `npm run lint`    | ESLint + Prettier check    |
| `npm run format`  | Format with Prettier       |

## Environment variables

Copy `.env.example` to `.env` for local development. In production, set the same keys in the Vercel project settings.

| Variable | Purpose |
| -------- | ------- |
| `FLUTTERWAVE_PUBLIC_KEY` | Flutterwave public key |
| `FLUTTERWAVE_SECRET_KEY` | Server-only secret for creating/verifying payments |
| `FLUTTERWAVE_WEBHOOK_HASH` | Must match the secret hash in Flutterwave → Settings → Webhooks |
| `ORDERS_TO_EMAIL` | Where payment notifications are sent (falls back to `CONTACT_TO_EMAIL`) |
| `RESEND_API_KEY` | Resend API key for outbound email |
| `CONTACT_TO_EMAIL` | Inbox for contact-form enquiries |
| `CONTACT_FROM_EMAIL` | Verified sender address (e.g. `DCI Website <hello@deeperconnectioninitiative.com>`) |

Never commit `.env` or expose `FLUTTERWAVE_SECRET_KEY` / `RESEND_API_KEY` to the client.

## Main routes

| Path | Description |
| ---- | ----------- |
| `/` | Marketing home |
| `/toolkit` | Product toolkit (card game, journal, mood tracker, full kit) |
| `/checkout/[slug]` | Express checkout → Flutterwave hosted payment |
| `/payment/callback` | Post-payment return / verification |
| `/api/flutterwave/webhook` | Flutterwave payment webhooks |
| `/events`, `/trainings`, `/champions` | Programs & community |
| `/connection-miles` | Connection Miles map |
| `/performance` + `/performance/assessment` | Performance / Blueprint Assessment |
| `/contact` | Contact form (honeypot + Resend) |
| `/platform`, `/partners`, `/volunteering` | Org & partnership pages |

Product photo galleries live under `static/photos/` (`card-game/`, `journal/`, `mood-tracker/`, etc.).

## Project layout

```
web/
├── src/
│   ├── lib/
│   │   ├── components/     # UI + page sections
│   │   ├── config/         # site, SEO, structured data
│   │   ├── server/         # Flutterwave + other server-only code
│   │   ├── payment-links.ts
│   │   └── product-photos.ts
│   ├── routes/             # SvelteKit file-based routes
│   └── hooks.server.ts     # Security headers, etc.
├── static/                 # Public assets (photos, favicons, media)
├── .env.example
└── svelte.config.js        # Vercel adapter (nodejs22.x)
```

## Deploy

The repo is connected to Vercel under **kolynzbs-projects / deeperconnectioninitiative-com**.

- Pushes to `main` deploy to **production** (custom domain + `*.vercel.app`).
- Root directory for the Vercel project is `web/`.
- After changing env vars in Vercel, trigger a redeploy so serverless functions pick them up.

```sh
# Optional: deploy from CLI while logged in as the project owner
vercel --prod
```

## Contributing

1. Branch from `main` (or open a PR against `main`).
2. Keep secrets out of git; use `.env.example` as the contract for new vars.
3. Run `npm run check` and `npm run lint` before opening a PR when practical.
4. Collaborators only need GitHub write access — Vercel deploys from the connected repo under the project owner’s Hobby/free account; no paid team seat required for Git-based deploys.

## Links

- Site: https://deeperconnectioninitiative.com  
- Vercel project: https://vercel.com/kolynzbs-projects/deeperconnectioninitiative-com  
- Instagram: https://www.instagram.com/dci_wellness  
