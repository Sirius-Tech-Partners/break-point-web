# Break Point — Pre-Launch Checklist

## DNS & Hosting
- [ ] Domain pointed to Vercel (A / CNAME records verified)
- [ ] `siteConfig.seo.metadataBase` updated to production URL (e.g. `https://breakpoint.bo`)
- [ ] Vercel project set to production branch `main`
- [ ] Custom domain shows valid SSL certificate (HTTPS)

## Environment Variables (Vercel → Settings → Environment Variables)
- [ ] `RESEND_API_KEY` — production Resend key
- [ ] `CONTACT_RECEIVER_EMAIL` — venue inbox email
- [ ] `UPSTASH_REDIS_REST_URL` — production Redis URL
- [ ] `UPSTASH_REDIS_REST_TOKEN` — production Redis token

## SEO & Discoverability
- [ ] `app/sitemap.ts` returns correct production URLs
- [ ] `app/robots.ts` sitemap URL matches production domain
- [ ] JSON-LD validated at [schema.org/validator](https://validator.schema.org/) — all 3 schemas pass
- [ ] `public/llms.txt` WhatsApp and address reflect live venue details
- [ ] `public/.well-known/security.txt` `Contact:` email is monitored

## Core Web Vitals (Lighthouse CI thresholds)
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] LCP < 2.5 s
- [ ] CLS < 0.1
- [ ] INP < 200 ms

Run locally with:
```bash
pnpm build && pnpm start &
pnpm exec lhci autorun
```

## Images & Assets
- [ ] OG image exists at `public/og-image.jpg` (1200×630 px)
- [ ] Venue photos are WebP or AVIF, no PNG > 200 KB in production
- [ ] `next/image` lazy loading confirmed (only hero uses `priority`)

## Forms & Integrations
- [ ] Contact form submits successfully in production (use a test email)
- [ ] Rate limiter triggers after 5 submissions from same IP within 1 hour
- [ ] Confirmation email received at venue inbox
- [ ] WhatsApp link opens correct number (+591...)

## Analytics & Monitoring (post-launch)
- [ ] Vercel Analytics enabled (zero-config, no extra package needed)
- [ ] Google Search Console — site verified, sitemap submitted
- [ ] Check `robots.txt` at `https://<domain>/robots.txt`
- [ ] Check `sitemap.xml` at `https://<domain>/sitemap.xml`

## Accessibility
- [ ] Keyboard navigation works end-to-end (Tab, Enter, Escape on modal/form)
- [ ] Screen-reader test with VoiceOver: hero, nav, form labels
- [ ] No color-contrast failures in Lighthouse accessibility audit

## Legal & Content
- [ ] Privacy policy / terms link added if collecting emails (Resend)
- [ ] All brand copy reviewed by client (prices, hours, address, phone)
- [ ] Images have proper rights / client-provided

## Final Go/No-Go
- [ ] All CI gates green on latest `main` commit
- [ ] Lighthouse CI informational check reviewed (no regressions)
- [ ] Client sign-off on staging preview URL
- [ ] DNS TTL lowered to 300 s at least 24 h before cutover
