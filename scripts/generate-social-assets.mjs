import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { createElement as h } from "react";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og");
const pages = JSON.parse(
  await fs.readFile(
    new URL("../src/lib/seo-pages.json", import.meta.url),
    "utf8",
  ),
);
const logo = `data:image/png;base64,${(await fs.readFile(new URL("../public/images/ccdi-logo-corrected.png", import.meta.url))).toString("base64")}`;
const origin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://creativecdi.org",
).origin;
const output = new URL("../public/social/", import.meta.url);
const icons = new URL("../public/icons/", import.meta.url);
await fs.mkdir(output, { recursive: true });
await fs.mkdir(icons, { recursive: true });
const cardName = (path) =>
  `${path === "/" ? "home" : path.replace(/^\/+|\/+$/g, "").replaceAll("/", "--")}.png`;

for (const [path, page] of Object.entries(pages)) {
  const card = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#075b37",
        color: "#ffffff",
        padding: "52px 58px",
        borderTop: "12px solid #f5c842",
        fontFamily: "sans-serif",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 35,
          flexGrow: 1,
        },
      },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", width: 765 } },
        h(
          "div",
          { style: { color: "#f5c842", fontSize: 19, marginBottom: 30 } },
          page.category,
        ),
        h(
          "div",
          {
            style: {
              fontSize: page.title.length > 55 ? 51 : 58,
              lineHeight: 1.13,
              fontWeight: 700,
              letterSpacing: "-1.6px",
            },
          },
          page.title,
        ),
        h(
          "div",
          {
            style: {
              fontSize: 24,
              lineHeight: 1.45,
              color: "#dfebe3",
              marginTop: 26,
            },
          },
          page.description,
        ),
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            background: "#ffffff",
            padding: 12,
            width: 240,
            height: 240,
            borderRadius: 8,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          },
        },
        h("img", {
          src: logo,
          width: 216,
          height: 196,
          style: { objectFit: "contain" },
        }),
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #4f8167",
          paddingTop: 23,
          marginTop: 30,
          fontSize: 20,
        },
      },
      h("span", null, "Creative Craft Development Initiative"),
      h("span", { style: { color: "#f5c842" } }, new URL(origin).host),
    ),
  );
  const image = new ImageResponse(card, { width: 1200, height: 630 });
  await fs.writeFile(
    new URL(cardName(path), output),
    Buffer.from(await image.arrayBuffer()),
  );
}
for (const [name, size] of [
  ["favicon-16", 16],
  ["favicon-32", 32],
  ["favicon-48", 48],
  ["apple-touch-icon", 180],
  ["icon-192", 192],
  ["icon-512", 512],
]) {
  const image = new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      h("img", {
        src: logo,
        width: size,
        height: Math.round((size * 1193) / 1319),
      }),
    ),
    { width: size, height: size },
  );
  await fs.writeFile(
    new URL(`${name}.png`, icons),
    Buffer.from(await image.arrayBuffer()),
  );
}
console.log(
  `Generated ${Object.keys(pages).length} social preview cards and 6 icons using the corrected CCDI logo.`,
);
// Keep conventional and legacy URLs on the same approved artwork too.
const iconFrames = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    png: await fs.readFile(new URL(`favicon-${size}.png`, icons)),
  })),
);
const icoHeader = Buffer.alloc(6 + 16 * iconFrames.length);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(iconFrames.length, 4);
let offset = icoHeader.length;
iconFrames.forEach(({ size, png }, i) => {
  const entry = 6 + i * 16;
  icoHeader[entry] = size;
  icoHeader[entry + 1] = size;
  icoHeader.writeUInt16LE(1, entry + 4);
  icoHeader.writeUInt16LE(32, entry + 6);
  icoHeader.writeUInt32LE(png.length, entry + 8);
  icoHeader.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await fs.writeFile(
  new URL("../public/favicon.ico", import.meta.url),
  Buffer.concat([icoHeader, ...iconFrames.map(({ png }) => png)]),
);
await fs.copyFile(
  new URL("favicon-48.png", icons),
  new URL("../public/favicon.png", import.meta.url),
);
await fs.copyFile(
  new URL("apple-touch-icon.png", icons),
  new URL("../public/apple-touch-icon.png", import.meta.url),
);
const iconPng = await fs.readFile(new URL("icon-192.png", icons));
await fs.writeFile(
  new URL("../public/favicon.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,${iconPng.toString("base64")}"/></svg>\n`,
);
await fs.copyFile(
  new URL("home.png", output),
  new URL("../public/social-card.png", import.meta.url),
);
const homePng = await fs.readFile(new URL("home.png", output));
await fs.writeFile(
  new URL("../public/social-card.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><image width="1200" height="630" href="data:image/png;base64,${homePng.toString("base64")}"/></svg>\n`,
);
for (const width of [116, 232, 432]) {
  const height = Math.round((width * 1193) / 1319);
  const image = new ImageResponse(
    h(
      "div",
      { style: { width: "100%", height: "100%", display: "flex" } },
      h("img", { src: logo, width, height }),
    ),
    { width, height },
  );
  await fs.writeFile(
    new URL(`../public/images/ccdi-logo-${width}.png`, import.meta.url),
    Buffer.from(await image.arrayBuffer()),
  );
}
