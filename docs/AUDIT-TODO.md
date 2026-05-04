# Audit TODO - Monad Tour Colombia

Items identified during the full project audit (May 2026). Sorted by priority.

---

## Security

### 1. Admin auth - password stored in sessionStorage

- **File:** `src/app/admin/layout.tsx:28`
- **Issue:** Plain-text password stored in `sessionStorage` as `admin_token`. Anyone with DevTools access can read it.
- **Fix:** Use HTTP-only cookies or server-side sessions instead. Consider JWT with short expiry.

### 2. No rate limiting on application submissions

- **File:** `src/app/api/applications/route.ts`
- **Issue:** POST endpoint has no rate limiting. Could be spammed to fill the database.
- **Fix:** Add rate limiting middleware (e.g. `next-rate-limit` or a simple in-memory token bucket).

### ~~3. PATCH admin endpoint doesn't validate status field~~ FIXED

- Added validation for `approved` / `rejected` values before updating.

---

## Performance

### 4. Gallery uses raw `<img>` instead of `next/image`

- **File:** `src/components/Gallery.tsx:149`
- **Issue:** 8 full-resolution JPGs loaded with raw `<img>` tags. No automatic WebP/AVIF conversion, no responsive srcSet, no blur placeholder.
- **Fix:** Replace with `next/image` using `fill` prop and `sizes` attribute.

### ~~5. next.config.ts missing `images` configuration~~ FIXED

- Added `images: { formats: ['image/avif', 'image/webp'] }`.

### 6. All 7 tweets loaded at once in Highlights

- **File:** `src/components/Highlights.tsx:73`
- **Issue:** 7 tweet embeds render simultaneously, each fetching its own assets. Heavy on mobile.
- **Fix:** Show 3 initially with a "Ver mas" button, or use intersection observer to lazy-load rows.

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

### 11. No "notify me" for future events

- **Issue:** With only 2 cities now, visitors from other Colombian cities have no way to express interest.
- **Recommendation:** Add a simple email capture for "Te avisamos cuando haya eventos en tu ciudad".

### 12. No urgency/scarcity messaging

- **Issue:** No "X spots remaining" or "limited capacity" messaging.
- **Recommendation:** If events have capacity limits, show remaining spots near the registration CTA.

### 13. Missing partner context

- **Issue:** University logos are shown but there's no explanation of the partnership (venue? academic credit? student access?).
- **Recommendation:** Add a short description per partner category.

---

## Content & Copy

### 14. Schedule is generic but says "MonadBlitz" without specifying city

- **File:** `src/components/Schedule.tsx`
- **Issue:** The schedule is presented as a universal template. If Bogota has a different schedule, this will need updating.
- **Recommendation:** Make the schedule dynamic based on the next event, or add a note that it's the typical format.

### 15. Calendar event end time says 22:00 but schedule says doors close at 22:00

- **File:** `src/components/Countdown.tsx:217`
- **Issue:** Google Calendar event is set 10:00-22:00, which is correct. Just verify this matches actual event timing.

### 16. Missing judges/mentors showcase

- **Issue:** Application forms exist for judges and mentors, but there's no public page showing confirmed judges/mentors.
- **Recommendation:** Once applications are approved, create a "Nuestro equipo" section or page.

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

### 22. Verify privacy policy covers application data collection

- **File:** `src/app/privacidad/page.tsx`
- **Issue:** Application forms collect personal data (name, email, phone, social handles). Colombian data protection law (Ley 1581 de 2012) requires explicit consent.
- **Action:** Review privacy policy to ensure it covers: what data is collected, how it's used, who has access, retention period, and how to request deletion.

### 23. No cookie consent banner

- **Issue:** If any analytics or tracking is added later, a cookie consent banner will be needed.
- **Action:** Low priority now since no cookies are set beyond essential ones.

---

## Infrastructure

### 24. DATABASE_URL in .env file (not .env.local)

- **File:** `.env`
- **Issue:** The database URL with credentials is in `.env` instead of `.env.local`. While `.env*` is in `.gitignore`, `.env` is typically meant for non-secret defaults. Credentials should always be in `.env.local`.
- **Fix:** Move `DATABASE_URL` to `.env.local` and keep `.env` empty or with placeholder values only.

---

## Summary

| Status    | Count                                        |
| --------- | -------------------------------------------- |
| FIXED     | 7 (items 3, 5, 8, 9, 20, 21 + images config) |
| Remaining | 17                                           |

### Remaining by category

| Priority       | Count  | Category                                |
| -------------- | ------ | --------------------------------------- |
| Security       | 2      | Auth, rate limiting                     |
| Performance    | 3      | Gallery images, tweets, bundle          |
| Marketing      | 4      | Social proof, notify, urgency, partners |
| Content        | 5      | Schedule, rules, showcase               |
| Accessibility  | 1      | Map keyboard                            |
| Legal          | 2      | Privacy, cookies                        |
| Infrastructure | 1      | Env file                                |
| **Total**      | **17** |                                         |
