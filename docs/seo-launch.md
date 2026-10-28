# CCDI SEO and social-preview launch

## Implemented

- Production origin: `https://creativecdi.org`, overrideable at build time with `NEXT_PUBLIC_SITE_URL`.
- Unique, descriptive search titles and meta descriptions for all 28 routes, without changing supplied page copy.
- Self-referencing canonical URLs, including trailing slashes. Query strings such as contact interests canonicalise to the base page.
- Complete Open Graph and X/Twitter metadata on every route, including title, description, absolute URL, image, dimensions, format and image alt text. Every route has its own static 1200 × 630 PNG under `/social/`.
- Corrected logo in preview artwork, browser/touch icons, and an ordinary web manifest. Responsive small logo assets reduce the shared header/footer image payload.
- Linked `Organization`, `WebSite`, page and breadcrumb JSON-LD entities. Organisation address, both telephone numbers, email, logo and verified Facebook profile use the supplied information. The three journal articles include `BlogPosting` metadata with the displayed organisation byline. No publication dates, ratings, accreditation or registration identifiers have been invented.
- `robots.txt`, canonical page sitemap and gallery image sitemap entries. No fictional last-modified dates or guaranteed update schedules.
- Index/follow and large-image preview permission by default; build-time staging opt-out. The static 404 is noindex.
- Existing static HTML, heading hierarchy, factual image alt text, image dimensions, lazy loading, local fonts, first-hero-image priority and deferred video loading remain in place.

## Remaining launch work outside the source code

The confirmed host is **cPanel**. On 28 October 2026, the apex HTTPS domain responded with HTTP 200 and the existing “COMING SOON” HTML. It did not serve this project. No cPanel files or DNS records were changed by this SEO update.

1. Serve the generated `out/` directory at **https://creativecdi.org** with a valid TLS certificate and public access. The current Sites preview is owner-private. Its successful deployment does not connect this domain or allow external crawlers to read it.
2. At the production host, return real 404 status codes for missing routes, serve `.html` as HTML and `.png` as PNG, and serve robots and sitemap without sign-in. Avoid a single-page-app fallback that returns the homepage with HTTP 200 for unknown URLs. Use the exported `404.html` as the error document.
3. Configure permanent redirects from HTTP and `www.creativecdi.org` to the canonical HTTPS apex origin, preserving paths and query strings. Do not redirect all deep links to the homepage. Enable compression and long-lived caching for hashed `/_next/static/` assets. Use shorter caching or revalidation for HTML, sitemaps and metadata assets so updates can be fetched.
4. Verify ownership in Google Search Console and Bing Webmaster Tools. DNS verification is useful for a domain-wide property. If using HTML meta verification, add the actual issued codes as `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`, then rebuild. No account verification was performed as part of this source update.
5. Submit `https://creativecdi.org/sitemap.xml` in both tools. Inspect the homepage, an initiative page and a journal article using their live URL tools. Check indexing reports after launch and fix any redirect, canonical, robots or fetch errors.
6. If CCDI has or qualifies for a Google Business Profile, manage the real profile with the organisation’s account and keep the supplied name, address and phone consistent. No listing, ratings or review claims have been created.
7. After launch, measure real mobile performance in PageSpeed Insights and Search Console’s Core Web Vitals report. Optimise from measured results. This source work does not establish field-performance scores or guarantee search positions.

### cPanel upload

Run `npm run build` and `npm run package:cpanel`. The resulting `dist/creativecdi-cpanel.zip` contains the contents of `out/` directly, plus `.htaccess`; there is no extra `out` folder to move. The archive is checked for required files and ZIP integrity. It contains no source code, npm dependencies or environment files.

1. In cPanel, confirm the document root for **creativecdi.org** under Domains. It may be `public_html`, or a separate domain directory; do not assume.
2. Download a backup of the existing site and `.htaccess` first. Keep email, other domains, `.well-known`, and hosting-specific files intact. Merge any essential existing host rules rather than blindly discarding them.
3. In File Manager, enable **Show Hidden Files** so `.htaccess` is visible. Upload the ZIP to the confirmed document root and extract it there. Verify that `index.html`, `_next/`, `about/`, `social/`, `robots.txt` and `sitemap.xml` sit directly in the root. Ensure an old `index.php` or other default index file does not take precedence.
4. The supplied `.htaccess` sets `index.html` as the directory index, normalises HTTP/www requests to the canonical domain and uses `/404.html` for missing resources. It also enables compression when the host supports it. These rules target Apache-compatible cPanel/LiteSpeed hosting and still require verification on the actual host. If a reverse proxy terminates TLS upstream, use the provider’s HTTPS configuration to avoid redirect loops; do not trust arbitrary forwarded headers.
5. Keep `.well-known` and certificate validation working. Confirm AutoSSL or the equivalent covers the apex and www names before redirecting HTTPS www traffic.
6. Check homepage and deep routes directly, a missing route, the sitemap, robots file and social cards. Confirm the production responses return the expected status and content type. Clear LiteSpeed/hosting caches if the old placeholder remains. Remove the uploaded ZIP after extraction so it is not left as a public download.

Do not upload the repository or run `npm start` on cPanel. This is a static export and needs only the packaged files. Indexing and platform preview checks begin after the public files are in place.

## Platform previews

Open Graph is the shared metadata basis for compatible social and messaging previews; X also has explicit card tags. A website cannot force every platform to render a clickable card. Platform behaviour, cache state, app settings and public crawler access determine the result. In particular, Instagram and TikTok placements do not universally generate website link cards.

After the domain is public, check the homepage, a programme page and a journal page:

- Facebook/Messenger: use the [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) and request a fresh scrape after changes.
- LinkedIn: use the [Post Inspector](https://www.linkedin.com/post-inspector/).
- X: inspect a draft in the composer; do not publish a test post just to validate a preview.
- WhatsApp, Telegram, Slack, Discord and Apple Messages: inspect the link in the app’s compose field or a private test conversation under the owner’s control. No test messages were sent by this work.

The source and exported tags are validated automatically. Actual platform screenshots and cached previews cannot be verified against the private preview. Cards and assets must be directly accessible over HTTPS without authentication, cookie requirements or bot challenges. A robots `Allow` rule cannot override hosting authentication.

## Maintenance

1. Update `src/lib/seo-pages.json` when page subjects or routes change. Keep descriptions factual and based on the supplied content; avoid stuffing keywords or adding unsupported claims.
2. Run `npm run build`, `npm run check:export` and `npm run check:seo`. Commit the generated images with the source.
3. Deploy the exact checked `out/` directory. Changing an environment variable after a static build does not change the exported tags.
4. Add real publication/modification dates to article data only when confirmed. Do not use each build’s timestamp as a substitute for content updates.
5. Monitor Search Console and Bing for coverage, search queries and crawl errors. Keep profile/contact information and canonical domain consistent.

## Primary references

- [Next.js metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Open Graph protocol](https://ogp.me/)
- [Google organisation structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google robots metadata](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)
- [Apache redirects](https://httpd.apache.org/docs/2.4/rewrite/remapping.html)
- [Apache error documents](https://httpd.apache.org/docs/2.4/custom-error.html)
