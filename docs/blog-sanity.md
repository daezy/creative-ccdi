# CCDI blog editing

Project: `z53lde5i` (CCDI Blog). Dataset: `production`.

The Studio lives in `studio/`, independently of the static Next.js site.

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
SANITY_PROJECT_ID=z53lde5i
SANITY_DATASET=production
```

These are public project identifiers, with the CCDI project used by default if no override is set. The website requires no API token, reads only published content, and fetches posts during each build. Set `SANITY_USE_LOCAL_CONTENT=true` only for offline development with the original local articles. API failures fail the build to avoid silently deploying stale content.

## Publish

Create a Blog post, enter a title, generate a slug, add an excerpt, category and body. Upload an optional cover and describe it in the image description. Publish when ready.

Publishing updates Sanity immediately. The public website uses static export: run `npm run build`, `npm run check:export`, and `npm run check:seo` in the repository root, then deploy the new `out/` folder. New articles, metadata and sitemap entries are generated together.

Automatic publishing needs a Sanity webhook connected to the actual website deployment pipeline. It has not been configured by these files. cPanel needs a rebuild-and-upload pipeline; a Vercel deployment can use a Vercel deploy hook. Never put deploy hook URLs or write tokens in source control.

Unpublishing/removing a post takes effect on the next deployment. The schema's publication date is informational and does not schedule publication. Drafts are excluded from the website.
