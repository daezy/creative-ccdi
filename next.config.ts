import type { NextConfig } from "next";
const config: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true"
    ? { output: "export" as const }
    : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  env: { BLOG_BUILD_ID: Date.now().toString() },
};
export default config;
