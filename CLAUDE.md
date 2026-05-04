# Monad Tour Colombia - Landing Page

## Stack

- Next.js 16 (App Router + Turbopack)
- TypeScript 5 (strict)
- Tailwind CSS v4 (PostCSS, not config file)
- Prisma ORM with PostgreSQL
- Framer Motion for animations

## Architecture

Single landing page (`/`) with additional routes for forms, legal pages, team showcase, and admin.

All UI components use `"use client"` due to Framer Motion. This is intentional.

Content is hardcoded in Spanish. No i18n.

## Key Patterns

- **Admin auth:** HTTP-only cookies with HMAC-SHA256 tokens (`src/lib/admin-auth.ts`)
- **Rate limiting:** In-memory token bucket per IP (`src/lib/rate-limit.ts`)
- **Form validation:** Zod schemas in `src/lib/validations/applications.ts`, used with React Hook Form
- **Email:** Fire-and-forget Nodemailer notifications on application submit (`src/lib/email.ts`)
- **Database:** Prisma singleton in `src/lib/db.ts`

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection
- `ADMIN_PASSWORD` - Admin dashboard password
- `GMAIL_APP_PASSWORD` - Gmail app password for notifications

## Notes

- When unsure about a Next.js API, check `node_modules/next/dist/docs/` for reference - read only the specific file you need.
- Cities data lives in `src/lib/constants.ts` (Medellin and Bogota only).
- Partner logos are in `public/images/partners/` organized by category (sponsors, universities, communities).
