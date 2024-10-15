import { sanityFetch } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";

export default async function Home() {
  const data = await sanityFetch({ query: HOME_PAGE_QUERY });
  return (
    <main>
      <BlockRenderer blocks={data.content} />
    </main>
  );
}
