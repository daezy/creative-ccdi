import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const root = path.resolve("out");
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
}
const files = walk(root).filter(
  (f) =>
    f.endsWith(".html") &&
    !f.endsWith("/404.html") && !f.includes("/404/") &&
    !f.includes("/_not-found/"),
);
const errors = [];
const titles = new Set();
let links = 0;
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1)
    errors.push(`${relative}: requires exactly one h1`);
  if (!/<meta name="description" content="[^"]+"/.test(html))
    errors.push(`${relative}: missing description`);
  if (!/<link rel="canonical" href="https:\/\/[^\"]+"/.test(html))
    errors.push(`${relative}: missing canonical`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (!title || titles.has(title))
    errors.push(`${relative}: missing or duplicate title`);
  titles.add(title);
  for (const [, href] of html.matchAll(/href="([^\"]+)"/g)) {
    if (
      !href.startsWith("/") ||
      href.startsWith("//") ||
      href.startsWith("/_next/")
    )
      continue;
    const [pathname, hash] = href.split("#");
    const p = decodeURIComponent(pathname.split("?")[0]);
    let target = path.join(root, p);
    if (p.endsWith("/")) target = path.join(target, "index.html");
    if (!fs.existsSync(target)) {
      errors.push(`${relative}: broken link ${href}`);
      continue;
    }
    if (
      hash &&
      target.endsWith(".html") &&
      !fs.readFileSync(target, "utf8").includes(`id="${hash}"`)
    )
      errors.push(`${relative}: missing anchor ${href}`);
    links++;
  }
}
assert.ok(fs.existsSync(path.join(root, "robots.txt")), "Missing robots.txt");
assert.ok(fs.existsSync(path.join(root, "sitemap.xml")), "Missing sitemap.xml");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Verified ${files.length} content pages: unique titles, descriptions, canonical URLs, one h1 each, ${links} internal links, sitemap, and robots.txt.`,
);
