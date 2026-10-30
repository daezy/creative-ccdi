import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const pages = JSON.parse(fs.readFileSync("src/lib/seo-pages.json", "utf8"));
const origin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://creativecdi.org",
).origin;
const indexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
const sitemap = fs.readFileSync("out/sitemap.xml", "utf8");
const robots = fs.readFileSync("out/robots.txt", "utf8");
const decode = (value) =>
  value
    ?.replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
const errors = [];
const images = new Set();
let articles = 0;
for (const [route, page] of Object.entries(pages)) {
  // Blog routes and copy now come from Sanity and may change independently.
  if (page.type === "article") continue;
  try {
    const file = path.join("out", route, "index.html");
    const html = fs.readFileSync(file, "utf8");
    const head = html.split("</head>")[0];
    const meta = (name) =>
      decode(
        head.match(
          new RegExp(
            `<meta (?:name|property)="${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}" content="([^"]*)"`,
          ),
        )?.[1],
      );
    const title = decode(head.match(/<title>(.*?)<\/title>/)?.[1]);
    const expectedTitle = page.title.includes("CCDI")
      ? page.title
      : `${page.title} | CCDI`;
    const canonical = `${origin}${route}`;
    assert.equal(title, expectedTitle, "Wrong page title");
    assert.equal(meta("description"), page.description, "Wrong description");
    assert.equal(
      decode(head.match(/<link rel="canonical" href="([^"]+)"/)?.[1]),
      canonical,
      "Wrong canonical origin or route",
    );
    assert.equal(meta("og:url"), canonical, "Wrong Open Graph URL");
    assert.equal(meta("og:title"), expectedTitle, "Wrong Open Graph title");
    assert.equal(
      meta("og:description"),
      page.description,
      "Wrong Open Graph description",
    );
    assert.equal(
      meta("og:type"),
      page.type === "article" ? "article" : "website",
      "Wrong Open Graph type",
    );
    assert.equal(meta("og:locale"), "en_NG");
    assert.equal(meta("og:site_name"), "Creative Craft Development Initiative");
    assert.equal(meta("twitter:card"), "summary_large_image");
    assert.equal(meta("twitter:title"), expectedTitle);
    assert.equal(meta("twitter:description"), page.description);
    const image = meta("og:image");
    assert.ok(
      image?.startsWith(`${origin}/social/`),
      "Preview must use the production origin",
    );
    assert.equal(
      meta("twitter:image"),
      image,
      "Open Graph and X preview mismatch",
    );
    assert.ok(
      meta("og:image:alt") && meta("twitter:image:alt"),
      "Missing preview alt text",
    );
    assert.equal(meta("og:image:width"), "1200");
    assert.equal(meta("og:image:height"), "630");
    assert.equal(meta("og:image:type"), "image/png");
    const buffer = fs.readFileSync(path.join("out", new URL(image).pathname));
    assert.equal(buffer.subarray(1, 4).toString(), "PNG");
    assert.equal(buffer.readUInt32BE(16), 1200, "Wrong preview width");
    assert.equal(buffer.readUInt32BE(20), 630, "Wrong preview height");
    assert.ok(buffer.length < 1_000_000, "Preview exceeds 1 MB");
    assert.ok(!images.has(image), "Each route needs its own preview image");
    images.add(image);
    assert.equal(meta("robots"), `${indexing ? "index" : "noindex"}, follow`);
    assert.ok(meta("googlebot")?.includes("max-image-preview:large"));
    assert.ok(
      sitemap.includes(`<loc>${canonical}</loc>`),
      "Route absent from sitemap",
    );
    const graphs = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json)["@graph"] || []);
    const get = (type) => graphs.find((entry) => entry["@type"] === type);
    const org = get("Organization");
    assert.equal(org?.url, `${origin}/`);
    assert.equal(org?.address.addressCountry, "NG");
    assert.ok(org?.logo.url.endsWith("ccdi-logo-transparent.png"));
    assert.equal(get("WebSite")?.["@id"], `${origin}/#website`);
    assert.ok(
      graphs.some((g) => g["@id"] === `${canonical}#webpage`),
      "Missing WebPage entity",
    );
    if (route !== "/") {
      const items = get("BreadcrumbList")?.itemListElement;
      assert.ok(items?.length >= 2, "Missing breadcrumbs");
      assert.equal(items.at(-1).item, canonical);
      assert.deepEqual(
        items.map((item) => item.position),
        items.map((_, i) => i + 1),
      );
    }
    if (page.type === "article") {
      assert.equal(get("BlogPosting")?.headline, page.title);
      assert.equal(
        get("BlogPosting")?.mainEntityOfPage["@id"],
        `${canonical}#webpage`,
      );
      articles++;
    }
    assert.ok(
      !head.includes("nicebook16.chatgpt.site"),
      "Old preview origin remains in metadata",
    );
  } catch (error) {
    errors.push(`${route}: ${error.message}`);
  }
}
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
const blogDirectory = "out/blog";
const blogSlugs = fs
  .readdirSync(blogDirectory, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      fs.existsSync(path.join(blogDirectory, entry.name, "index.html")),
  )
  .map((entry) => entry.name);
for (const slug of blogSlugs) {
  const route = `/blog/${slug}/`;
  try {
    const html = fs.readFileSync(
      path.join(blogDirectory, slug, "index.html"),
      "utf8",
    );
    const head = html.split("</head>")[0];
    const meta = (name) =>
      decode(
        head.match(
          new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`),
        )?.[1],
      );
    const canonical = `${origin}${route}`;
    assert.ok(
      head.includes(`<link rel="canonical" href="${canonical}"`),
      "Wrong article canonical",
    );
    assert.ok(meta("description"), "Missing article description");
    assert.equal(meta("og:type"), "article");
    assert.equal(meta("og:url"), canonical);
    assert.equal(meta("twitter:card"), "summary_large_image");
    assert.equal(meta("og:image"), meta("twitter:image"));
    assert.ok(
      meta("og:image")?.startsWith("https://"),
      "Missing article preview",
    );
    assert.ok(urls.includes(canonical), "Article missing from sitemap");
    const data = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => JSON.parse(json)["@graph"] || []);
    const post = data.find((item) => item["@type"] === "BlogPosting");
    assert.equal(post?.url, canonical);
    assert.equal(post?.headline, meta("og:title")?.replace(/ \| CCDI$/, ""));
    assert.ok(
      data.find((item) => item["@type"] === "BreadcrumbList")?.itemListElement
        ?.length >= 3,
      "Missing article breadcrumbs",
    );
    articles++;
  } catch (error) {
    errors.push(`${route}: ${error.message}`);
  }
}
const expectedPages =
  Object.values(pages).filter((page) => page.type !== "article").length +
  blogSlugs.length;
assert.equal(urls.length, expectedPages, "Sitemap route count mismatch");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URL");
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(robots.includes(indexing ? "Allow: /" : "Disallow: /"));
assert.ok(
  sitemap.includes("<image:loc>"),
  "Missing gallery image sitemap entries",
);
for (const [, image] of sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
  assert.ok(
    fs.existsSync(path.join("out", new URL(image).pathname)),
    `Missing sitemap image ${image}`,
  );
}
const manifest = JSON.parse(fs.readFileSync("out/site.webmanifest", "utf8"));
for (const icon of manifest.icons)
  assert.ok(fs.existsSync(path.join("out", icon.src)));
assert.ok(
  fs
    .readFileSync("out/404.html", "utf8")
    .includes('name="robots" content="noindex"'),
  "404 must not be indexed",
);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `SEO verified: ${expectedPages} canonical pages, ${images.size} static 1200×630 preview images, ${articles} articles, structured data, sitemap images, icons, robots and 404 noindex.`,
);
