<img src="public/images/ccdi-logo-transparent.png" alt="Creative Craft Development Initiative logo" width="96" />

# Creative Craft Development Initiative (CCDI)

The CCDI website, built with **Next.js App Router, React and TypeScript** with server hosting on Vercel and a static cPanel export. Both versions read current published blog content from Sanity. It presents the organisation’s skills development, social enterprise, benevolent and childcare, and community initiatives using supplied copy, photographs, videos, testimonials and documents.

The homepage carousel has six slides: the CCDI introduction, management with vision and mission, and one slide for each of the four project arms. Carousel content lives in `src/components/hero.tsx`; it reuses the organisation’s supplied statements and approved photographs.

The homepage also previews all eight supplied publication covers, a publication-unveiling film and the three existing journal articles. The publication list is shared with the resources page; article previews reuse the blog data. The standalone board/management section lives on the About page and is linked from “Who we are.”

## Getting started

Requires **Node.js 20.9 or newer** and npm. Node.js 24 is used in the current development environment.

```bash
git clone https://github.com/daezy/creative-ccdi.git creativecdi
cd creativecdi
npm ci
npm run dev -- --port 3124
```

Open [http://localhost:3124](http://localhost:3124). Changes to the source update the local preview automatically while the development server is running.

## Production builds

For Vercel (live server rendering):

```bash
npm run build
npm run start
```

Blog content and metadata are fetched from Sanity on each request; content changes do not require deployment.

For cPanel (static files with live browser fetching):

```bash
npm run package:cpanel
```

Upload **`dist/creativecdi-cpanel.zip`** including `.htaccess`. The package command builds `out/`, runs export/SEO checks and packages the result. Run `npm run build:cpanel` if only the exported directory is needed. New posts render from Sanity in the browser; Apache's rewrite rule supports URLs created after the export. The static sitemap and social previews remain snapshots until rebuilt. See [blog editing and hosting](docs/blog-sanity.md).

A simple static server can preview existing exported URLs, but testing a new article URL requires Apache with the supplied rewrite rule.

### Production domain

The confirmed production origin is **https://creativecdi.org**. Canonical links, sitemap URLs, structured data and social previews use this domain by default. To use a different deployment origin, set it before building:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
```

Copy `.env.example` to `.env.local` for local configuration. Use `NEXT_PUBLIC_ALLOW_INDEXING=false` on a publicly accessible staging deployment, then rebuild. The owner-private Sites preview retains its existing access settings; it is not accessible to search and social crawlers. Environment files are ignored by Git; do not commit credentials.

### SEO and link previews

All 28 pages have independent search titles, descriptions, absolute canonical URLs, Open Graph tags and X/Twitter large-image tags. Preview cards are generated at build time as public 1200 × 630 PNGs using the corrected CCDI logo. Metadata is in the exported HTML; crawlers do not need JavaScript or an image-generation server.

`src/lib/seo-pages.json` controls route-specific metadata and preview copy. `src/lib/seo.ts` builds metadata and structured data. `npm run generate:social` regenerates cards, favicon/touch icons and small logo assets; `npm run build` runs it automatically. When adding a route, add its SEO entry too. Run both checks after building:

All icon formats use `public/images/ccdi-logo-transparent.png` as their source: the multi-size `favicon.ico`, PNG/SVG favicon fallbacks, Apple touch icon and manifest icons. Legacy social-card URLs also display the current artwork with the actual logo.

```bash
npm run check:export
npm run check:seo
```

The SEO check validates every canonical and preview URL, image dimensions and size, metadata in the initial HTML, JSON-LD, article and breadcrumb relationships, sitemap images, icons, robots rules and 404 noindex. The page copy remains separate from search snippets and preview copy.

See [the SEO launch guide](docs/seo-launch.md) for domain activation, Search Console and Bing verification, sitemap submission, and social-platform checks. No analytics or third-party tracking has been added.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the versions recorded in the lockfile |
| `npm run dev -- --port 3124` | Run the live local preview |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run build` | Build the Next.js server version for Vercel |
| `npm run check:export` | Check exported pages, metadata, internal links, anchors, sitemap and robots.txt |
| `npm run generate:social` | Regenerate page previews, logo sizes and icons |
| `npm run check:seo` | Validate every page’s metadata, previews, structured data and indexing configuration |
| `npm run package:cpanel` | Build and check the static export, then create `dist/creativecdi-cpanel.zip` for the confirmed cPanel host (requires Python 3) |

Run `npm run build:cpanel` before `check:export`; the checker reads the generated `out/` directory.

## Website features

- 28 pre-rendered content pages with page-specific titles, descriptions and canonical URLs, plus a sitemap and robots.txt.
- A homepage showreel and photographic layouts across the four initiative pages, programmes, services, impact and participation pages.
- The supplied CCDI logo, local fonts, responsive layouts, keyboard focus styles and reduced-motion support.
- A catalogue of 229 images, grouped gallery collections, mixed image proportions and a keyboard-accessible image viewer.
- 12 programme and event videos with native playback controls.
- Five community testimonials and two leadership reflections, including their full supplied stories and identified portraits.
- Four original PDF documents, with their guidance also integrated into relevant training, membership, privacy and safeguarding pages.
- Contact information and Formspree enquiries; training, volunteer, partnership and support links prefill the shared contact form.
- Public contact email: `info@creativecdi.org`; Facebook, TikTok and WhatsApp group links are shared in the header, footer and Contact page. Contact also includes a Google Maps preview and directions link using the supplied Lagos address.

## Project structure

```text
src/
  app/
    page.tsx                  Homepage
    [slug]/page.tsx           Main organisation, programme and reference pages
    projects/[slug]/page.tsx  Four initiative pages
    blog/[slug]/page.tsx      Journal articles
    globals.css               Shared styles and responsive layouts
    layout.tsx                Site shell, fonts and shared metadata
  components/                 Navigation, footer, media, forms and page layouts
  lib/                        Copy, navigation, media registries and other data
public/
  images/                     Logo, portraits, optimised photographs and artwork
  videos/                     Programme and event video files
  documents/                  Original supplied PDF documents
scripts/check-export.mjs     Static output and link validation
docs/                       Content mapping and implementation notes
```

### Editing content

| File | Contents |
| --- | --- |
| `src/lib/organisation-copy.ts` | Organisation-supplied copy, vision, mission, governance and initiative purposes |
| `src/lib/programmes.ts` | Programme activities, achievements, challenges, funding and future plans |
| `src/lib/testimonials.ts` | Complete supplied community stories and leadership reflections |
| `src/lib/content.ts` | Navigation, page metadata, contact details, initiative and training data, and journal draft copy |
| `src/lib/media-library.json` | Image catalogue, descriptive alt text, categories and dimensions |
| `src/lib/media.ts` | Mapping between page photo labels and catalogue assets |
| `src/lib/video-library.json` | Video files, posters, titles and categories |
| `src/lib/documents.json` | PDF metadata and preview images |
| `src/components/document-content.tsx` | Form guidance and policy content integrated into the website |

Preserve the supplied wording when changing presentation. Use [the content map](docs/content-map.md) to locate the source material and outstanding items. Do not infer missing dates, fees, financial results, partner identities or consent records.

The three initial journal articles are **editorial draft copy**. They are separate from the organisation’s supplied statements and attributed testimonials, and should be reviewed as such.

### Images and video

The assets needed to build and run the website are included under `public/`. The original working collection in the root `images/` directory is kept locally and is ignored by Git; it is not required to build the site from a fresh clone.

Add web-ready files under `public/images/` or `public/videos/`, then update the relevant registry. Preserve accurate alt text and portrait attribution. Gallery categorisation should be based on the actual media, not inferred from filenames.

### Forms and documents

The original PDFs are available under `public/documents/`:

- `student-registration.pdf`
- `membership.pdf`
- `membership-conduct.pdf`
- `privacy-safeguarding.pdf`

The registration and membership PDFs are printable forms. Visitors are directed to contact CCDI to confirm how completed forms should be returned. The website does not receive completed forms. See [PDF integration notes](docs/pdf-integration.md) for page placement and source details.

## Current behaviour and remaining material

- The enquiry form submits directly to Formspree (`mgaaqbbw`) and emails `creativeselfcraft2008@gmail.com`. All enquiry topics share this inbox. It includes a loading state, confirmation, recoverable errors, email reply-to, a spam honeypot and a native POST fallback. Formspree stores submissions; the website privacy page describes this. The endpoint is public and needs no secret or server. See `docs/contact-form.md` for handover details.
- Donation/support options do not collect payments. Visitors contact CCDI to confirm current needs and official payment arrangements.
- Impact figures confirmed for this version are 18 years of impact, 3,000+ beneficiaries annually, 12,000+ people reached and 12+ community reach.
- Detailed financial statements, reporting periods, partner/sponsor logos and additional management biographies remain to be supplied.
- The supplied privacy/safeguarding framework leaves its effective date and designated focal-person contact fields blank. The website directs visitors to CCDI for the appropriate contact.
- The original navigation outline repeats “Skills Training” in the Projects menu. Both labels remain; the second links directly to the training areas.

## Hosting and repository hygiene

The site supports both hosting modes: `next.config.ts` enables `output: "export"` only with `STATIC_EXPORT=true`; the default is a Next.js server deployment. Both use trailing-slash URLs and unoptimised image delivery. A host should serve `out/` as the document root and support directory index files such as `/about/index.html`.

`.openai/hosting.json` records the existing Sites project and its static output directory. Preserve that identity when updating the existing hosted site. It is not needed by a separate static host and contains no authentication token.

Generated output (`out/`, `.next/`), dependencies (`node_modules/`), environment files and the original local image collection are excluded from Git. Commit source changes and `package-lock.json`; regenerate build output when deploying.

The supplied logo, photographs, videos, testimonials and organisation documents belong to their respective owners. No reuse licence is granted by this repository.

Skills and welfare photography uses the six visually reviewed additions from `images/skills/` and `images/welfare/`. `armPhoto()` in `src/lib/media.ts` selects stable, varied images for carousel, overview, project and related-arm placements. The gallery retains every supplied image.

The shared commitments section uses a green introduction panel and numbered promise rows. On the homepage it joins the participation invitation in one responsive block; organisation-supplied wording and action destinations are unchanged.

### Official email addresses

General enquiries use `info@creativecdi.org` in the header, footer, Contact page and organisation SEO data. Administration (`office@creativecdi.org`) and leadership (`director@creativecdi.org`) are on About CCDI; projects (`projects@creativecdi.org`) appear on programme and project pages; finance (`finance@creativecdi.org`), partnerships (`partnerships@creativecdi.org`) and donations (`donate@creativecdi.org`) appear on their corresponding pages. The personal Yahoo address is no longer used in site content.

Hosting setup is separate: create the `info@creativecdi.org` mailbox in cPanel, then create the other six addresses above as forwarders to that mailbox. Use the plural `partnerships` consistently. These website changes do not provision mailboxes or forwarders. Verify delivery to all seven addresses once the hosting setup is complete.

The management carousel slide uses the team photograph as a full-width backdrop, with its supplied introduction, vision and mission in a green panel below the faces. Mobile framing preserves the full group; the other five slides retain their existing layouts.

See [Launch security checklist](docs/launch-security.md) for the prepared Apache protections, hosting/account actions, backup checks, privacy responsibilities and future donation safeguards. Hosting-side controls remain pending verification.

The public telephone and direct WhatsApp contact both use `08026264133` (`+2348026264133`). The membership and student registration downloads and their thumbnails use the approved logo, green/orange/red/yellow CCDI lettering and official phone/email details. The Social Enterprise hero pairs the supplied catering-team photo with the Our Kitchen flyer, whose old contact numbers were replaced with the official number. The confirmed YouTube channel is linked from the header, footer, Contact page and organisation SEO data.
