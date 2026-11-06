# CCDI blog editing

Client-owned project: `kpusk3kf` (CCDI Blog). Dataset: `production`.

Editor: [CCDI Journal](https://creativecdi-journal.sanity.studio/).
Sign in with Google using the client's `creativeselfcraft2008@gmail.com` account.
The organization and project are owned by that account.

The Studio lives in `studio/`, independently of the static Next.js site.

## Client account migration (6 November 2026)

The three current posts were exported from the previous project and imported into the client-owned project, preserving their document IDs, text and slugs. There were no uploaded image assets in the previous dataset. The old project/editor were left intact; use the new editor above for all future posts.

Both the default website project and Studio configuration now use `kpusk3kf`. If any hosting environment explicitly overrides `SANITY_PROJECT_ID`, update that override too. Rebuilt cPanel files use the new project after upload.

## Start the editor locally

```sh
cd studio
npm ci
npm run dev
```

Open the local URL printed by Sanity and sign in with the account that owns the project.

To host the editor at a permanent `*.sanity.studio` address, run `npm run deploy` from `studio/`. The CLI may require `npx sanity login` first. Studio access still requires Sanity authentication.

## Existing articles

`studio/import/existing-posts.ndjson` contains the three original published website articles as rich text. No publication dates were invented. Import once with:

```sh
cd studio
npx sanity dataset import import/existing-posts.ndjson --dataset production --missing
```

`--missing` skips existing document IDs, preserving subsequent editor changes. Keep existing slugs to preserve article links. Publication dates can be filled in when known.

## Connect the website

Set these in the website's `.env.local` and in the build host's environment:

```dotenv
SANITY_PROJECT_ID=kpusk3kf
SANITY_DATASET=production
```

These are public project identifiers, with the CCDI project used by default if no override is set. The website requires no API token, reads only published content, and reads current published posts at request time on Vercel or in the browser on cPanel. Set `SANITY_USE_LOCAL_CONTENT=true` only for offline development with the original local articles. API failures are surfaced rather than replacing unpublished posts with the original local articles.

## Publish

Create a Blog post, enter a title, generate a slug, add an excerpt, category and body. Upload an optional cover and describe it in the image description. Publish when ready.

Publishing updates Sanity immediately. No website rebuild or redeployment is needed for article changes after the updated website code is installed.

### Vercel

`npm run build` produces a Next.js server deployment. The homepage journal, blog listing, article pages and sitemap read Sanity without a persistent data cache. New slugs work on demand, article metadata is rendered on the server, and missing/unpublished posts return HTTP 404. No publish webhook or deploy hook is needed.

### cPanel

Run `npm run package:cpanel` to build, validate and package the static version, then upload `dist/creativecdi-cpanel.zip` including its `.htaccess` file. This initial installation is required once. `npm run build:cpanel` separately creates `out/`.

The exported homepage journal, blog listing and article pages fetch current published content in the browser on load, on returning to the tab, and every 60 seconds while visible. Existing content is retained with an error notice if a refresh fails. Unpublished posts disappear after a successful refresh; an empty dataset displays an empty journal.

Apache's rewrite rule sends new `/blog/<slug>/` URLs to `/blog/__live__/index.html`. The browser then reads the requested slug from the address bar and renders its Sanity article. Blog cards use full-page navigation so Next's exported route manifests cannot block a new URL. Apache `mod_rewrite` and the supplied `.htaccess` are required. The rule was tested with Apache locally.

**Static hosting limits:** new cPanel posts need JavaScript to render, and an unknown URL initially returns a generic shell with HTTP 200. After loading, missing posts show an unavailable message and `noindex`. The browser updates metadata for real articles, but social crawlers that do not run JavaScript see the exported snapshot or generic fallback. The static sitemap is also a build-time snapshot. Rebuilding is only needed to refresh those crawler-facing files, not to show new content to visitors. Vercel handles current metadata, sitemap and HTTP status on the server.

Sanity CORS permits the production domain, www domain, Vercel alias and localhost testing origins to read published content without credentials. If hosting on a new domain, add its exact origin in the project's CORS settings without credential access.

The schema's publication date is informational and does not schedule publication. Drafts are excluded from the website. Publishing, editing and unpublishing apply on the next server request or successful cPanel browser refresh.
