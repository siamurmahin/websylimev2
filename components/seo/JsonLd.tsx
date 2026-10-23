/**
 * Structured data for search engines (schema.org JSON-LD). A plain <script>
 * per the Next.js guide; `<` is escaped so content can never close the tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
