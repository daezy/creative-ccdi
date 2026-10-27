# CCDI website — working first edition

A statically generated Next.js / React / TypeScript website for Creative Craft Development Initiative. This is an expandable first version; the organisation has more content and images to supply.

## Run and export

- `npm install`
- `npm run dev` (local preview)
- `npm run typecheck`
- `npm run build` (static HTML, CSS, JS, and locally hosted fonts in `out/`)
- `npm run check:export` (checks all internal links, heading counts, and SEO essentials)

Deploy `out/` to a static host. Set `NEXT_PUBLIC_SITE_URL` to the final production origin before building for a new domain. No Node server is required after export.

## Design

Editorial layouts inspired by the supplied Drolix, Benevia, Sustainax, Giveza, Hopera, and Karuna references. Deep green, white, gold, and restrained orange accents. Manrope and DM Sans are self-hosted. The supplied CCDI logo is retained. The homepage alone has a controlled showreel. Animation uses CSS transitions and respects reduced motion.

## Content and images

- `src/lib/content.ts`: navigation, four project arms, programme areas, values, metadata, and introductory journal content.
- `src/lib/media.ts`: central image registry. Add actual photographs under `public/images/`, then add an entry whose key matches the existing PhotoSlot label. The layout remains the same when an image replaces a placeholder.
- `src/components/ui.tsx`: shared image slots, calls to action, and design elements.
- `src/app/[slug]/page.tsx`: section pages, including About, Contact, training, giving, policies, and resources.
- `src/app/projects/[slug]/page.tsx`: individual arm pages.
- `src/app/blog/[slug]/page.tsx`: initial programme-perspective articles written from the supplied content. These are new editorial copy, not historical news or attributed quotations; review before a public launch.

### Image priorities

1. Homepage: training hero (landscape), smaller community photo (portrait), About image, three training photos, volunteering image.
2. Four project-arm banners (wide landscape).
3. Six training-area images (landscape).
4. Trustee portraits for Gloria Omoze Omagbemi and Temisan Ignatius Omagbemi (portrait).
5. Gallery collections, team profiles, and approved beneficiary stories.
6. Partner logos once names and permissions are confirmed.

PhotoSlot labels are descriptive so you can search for a slot. Placeholder artwork is CSS, not photography or a claim about actual events. Do not add identifying child photos without consent and safeguarding review.

## Deliberately unfinished facts and integrations

- The source outline repeats “Skills Training” in the Projects dropdown. Both visible labels have been preserved; the second points directly to training areas. Confirm the intended second item before public launch.
- The supplied text uses “18+” for both operating history and beneficiary age. The 3,000 annual reach / 12,000 community reach / 12+ programme figures also need clarification. The website instead displays countable structure (four arms, six training areas) and makes intended outcomes distinct from measured results.
- No invented training dates, fees, accreditation bodies, founder claims, office address, phone, email, payments, partner identities, or testimonials.
- Management/facilitator names and bios are still to be supplied. Existing unlabelled portrait files are not assigned to people.
- The contact form prepares and copies an enquiry locally. It sends nothing. The visitor can then contact the verified Facebook page. Clipboard failure has a selectable message fallback.
- Donation choices lead to a prefilled enquiry. No payment collection is connected.
- Resource and video pages are honest empty states, ready for approved documents and media.
- Privacy, child protection, and financial transparency pages describe the supplied commitments and current site behaviour; approved organisational policies and reports are still needed.
- Confirm legal registration details, approved mission copy, all leadership roles, and final four-arm naming before public launch.

## Hosting

`.openai/hosting.json` contains the private Sites project identity. Preserve it across updates. The static export is portable and does not depend on Sites for runtime features.

## Additional programme content

The additional programme overview supplied in this chat is maintained in `src/lib/programmes.ts`. It covers youth, women, benevolent and childcare, and community/family programmes; reported achievements; delivery challenges; funding sources and uses; future plans; and five reserved testimonial slots. Reporting-period dates, financial amounts, evidence attachments, and actual testimonial quotations were not supplied. The catalogue and related project pages use the supplied programme names, including Couples Blissful Day events. Original images in the root `images/` folder remain local; only approved assets placed in `public/images/` are part of the web build.

## Testimonials and leadership reflections

The named portraits from `images/testimonials/` are copied unchanged into `public/images/testimonials/`. `src/lib/testimonials.ts` preserves the five supplied community stories and two leadership reflections, with duplicate Gloria and Adanma submissions removed. Only punctuation, obvious typos, and the organisation’s spelling are lightly normalised. Excerpts are drawn from the supplied narratives; the complete text is available through accessible native disclosure controls and is included in the static HTML. Reported dates and the “over 200 students and facilitators” statement remain attributed to the speakers rather than being reused as verified organisational metrics. Gloria’s Chairman role and Temisan’s Trustee Secretary role, plus their named portraits, are also reflected in the About governance section. Other unlabelled team photos remain unassigned.
