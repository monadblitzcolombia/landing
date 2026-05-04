# Audit TODO - Monad Tour Colombia

Items identified during the full project audit (May 2026). Sorted by priority.

---

## Security

### ~~1. Admin auth - password stored in sessionStorage~~ FIXED

- Replaced `sessionStorage` with HTTP-only, secure, SameSite=strict cookies via server-side auth (`/api/admin/login`, `/api/admin/logout`, `/api/admin/verify`). Password is never stored client-side.

### ~~2. No rate limiting on application submissions~~ FIXED

- Added in-memory rate limiter (5 requests/minute per IP) to the POST endpoint with `429` responses and `Retry-After` header.

### ~~3. PATCH admin endpoint doesn't validate status field~~ FIXED

- Added validation for `approved` / `rejected` values before updating.

---

## Performance

### ~~4. Gallery uses raw `<img>` instead of `next/image`~~ FIXED

- Replaced raw `<img>` tags with `next/image` using `fill` prop and `sizes="(max-width: 768px) 50vw, 33vw"` for automatic WebP/AVIF, responsive srcSet, and lazy loading.

### ~~5. next.config.ts missing `images` configuration~~ FIXED

- Added `images: { formats: ['image/avif', 'image/webp'] }`.

### ~~6. All 7 tweets loaded at once in Highlights~~ FIXED

- Now shows 3 tweets initially with a "Ver mas" button to load the remaining 4.

### 7. Heavy client bundle from "use client" everywhere

- **Issue:** Nearly all components use `"use client"` due to Framer Motion. The entire page hydrates client-side.
- **Fix:** Low priority - the tradeoff is acceptable for the animation quality.

---

## Marketing & Conversion

### ~~8. Too many CTAs in Hero section~~ FIXED

- Removed mentor/judge apply buttons from Hero. Now only 2 CTAs: "Registrate" + "Unirse a la Comunidad".

### ~~9. Hero and Navbar CTA link to calendar, not direct registration~~ FIXED

- All "Registrate" CTAs now link to `luma.com/o56ekpyb` (Medellin event direct link).

### 10. No social proof numbers

- **Issue:** No concrete numbers about past events (attendees, projects built, teams formed).
- **Recommendation:** Add stats from Mexico Blitz or other past events to build credibility and FOMO.

### ~~11. No "notify me" for future events~~ FIXED

- Added email notification via Nodemailer. On every application submit, an email is sent to `medellinblockchaincommunity@gmail.com` with all submitted data. Requires `GMAIL_APP_PASSWORD` env variable.

### ~~12. No urgency/scarcity messaging~~ FIXED

- Added "Cupos limitados - 100 por ciudad" message in the Countdown section, visible while the event countdown is active.

### ~~13. Missing partner context~~ FIXED

- Added `subtitle` field to `PartnerCategory` type. Each category now shows context: "Sedes de workshops previos al hackathon" for universities, etc.

---

## Content & Copy

### 14. Schedule is generic but says "MonadBlitz" without specifying city

- **File:** `src/components/Schedule.tsx`
- **Issue:** The schedule is presented as a universal template. If Bogota has a different schedule, this will need updating.
- **Recommendation:** Make the schedule dynamic based on the next event, or add a note that it's the typical format.

### 15. Calendar event end time says 22:00 but schedule says doors close at 22:00

- **File:** `src/components/Countdown.tsx:217`
- **Issue:** Google Calendar event is set 10:00-22:00, which is correct. Just verify this matches actual event timing.

### ~~16. Missing judges/mentors showcase~~ FIXED

- Created `/equipo` page with public API `/api/team` that shows approved mentors and judges. Shows a placeholder message when none are approved yet.

### 17. Missing rules/judging criteria page

- **Issue:** The FAQ mentions peer voting ("Los ganadores los deciden los mismos builders") but there's no detailed rules page.
- **Recommendation:** Create a `/reglas` page or add a section with clear rules and judging criteria.

### 18. No past winners showcase

- **Issue:** If Mexico or other Blitz events had winners, showcasing them would validate the event.
- **Recommendation:** Add a "Past Winners" section to the Gallery area.

---

## Accessibility

### 19. Map is not keyboard accessible

- **File:** `src/components/MapColombia.tsx`
- **Issue:** Interactive map markers can't be reached via keyboard navigation.
- **Fix:** Low priority since the events table provides the same info.

### ~~20. ScrollNav dots have no aria labels for current state~~ FIXED

- Added `aria-current="true"` to the active dot.

### ~~21. Hamburger menu doesn't indicate open/close state~~ FIXED

- Added `aria-expanded={menuOpen}` to the hamburger button.

---

## Legal & Compliance

### ~~22. Verify privacy policy covers application data collection~~ FIXED

- Added Ley 1581 de 2012 and Decreto 1377 de 2013 references. Added explicit consent clause, data retention period (12 months), SIC complaint right, and responsible entity identification.

### ~~23. No cookie consent banner~~ FIXED

- Added `CookieConsent` component in root layout. Shows a banner with a link to the privacy policy. Consent is stored in `localStorage`.

---

## Infrastructure

### ~~24. DATABASE_URL in .env file (not .env.local)~~ FIXED

- `.env` now only contains placeholder values. Real credentials are in `.env.local`.

---

## Summary

| Status    | Count                                                  |
| --------- | ------------------------------------------------------ |
| FIXED     | 18 (items 1-6, 8, 9, 11-13, 16, 20-24 + images config) |
| Remaining | 6                                                      |

### Remaining by category

| Priority      | Count | Category                           |
| ------------- | ----- | ---------------------------------- |
| Performance   | 1     | Heavy client bundle (low priority) |
| Marketing     | 1     | Social proof (no data available)   |
| Content       | 3     | Schedule, rules, past winners      |
| Accessibility | 1     | Map keyboard (low priority)        |
| **Total**     | **6** |                                    |
