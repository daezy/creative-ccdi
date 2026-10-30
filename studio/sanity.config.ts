import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { post } from "./schemaTypes/post";

export default defineConfig({
  name: "ccdi-blog",
  title: "CCDI Journal",
  projectId: "z53lde5i",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: [post] },
});
