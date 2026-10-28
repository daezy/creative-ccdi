import { pageStructuredData } from "@/lib/seo";

export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PageStructuredData({ path }: { path: string }) {
  return <StructuredData data={pageStructuredData(path)} />;
}
