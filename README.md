# simny.dev

Personal site built with the Next.js App Router. The codebase combines typed MDX content, a small curated data layer, and Cloudinary-backed photography collections.

## Architecture

- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS 4
- **Content:** `content-collections` + MDX
- **Media:** Cloudinary + `next-cloudinary`
- **SEO:** Metadata API, JSON-LD, RSS, sitemap, robots
- **Deployment:** Vercel

## Content model

- `content/writing/*.mdx` → long-form writing posts
- `content/now/*.mdx` → now page entries
- `data/*.ts(x)` → curated navigation, project, and gallery metadata

## Local development

1. Install dependencies with `npm install`
2. Create `.env.local`
3. Start the app with `npm run dev`

### Environment variables

The project can run with a minimal environment, but these variables unlock production behaviour:

- `NEXT_PUBLIC_SITE_URL` – canonical site origin override
- `REVALIDATION_SECRET` – protects the gallery revalidation webhook
- Cloudinary credentials required by the Cloudinary SDK

## Important routes

- `app/page.tsx` – homepage
- `app/writing/page.tsx` – article index
- `app/writing/[slug]/page.tsx` – article detail
- `app/work/page.tsx` – work index
- `app/photography/page.tsx` – photography index
- `app/photography/[slug]/page.tsx` – gallery collection detail
- `app/rss/route.ts` – RSS feed
- `app/sitemap.ts` – sitemap
- `app/api/revalidate/route.ts` – Cloudinary-triggered gallery revalidation

## Notes

- MDX compilation and derived metadata live in [content-collections.ts](content-collections.ts).
- Cloudinary gallery reads are cached and can be invalidated through the revalidation route.
- Static site metadata is centralized in [data/constants.ts](data/constants.ts).
