import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { post } from "./schemaTypes/post";

export default defineConfig({
  name: "ccdi-blog",
  title: "CCDI Journal",
  projectId: "kpusk3kf",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: [post] },
});
