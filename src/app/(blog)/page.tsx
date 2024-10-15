// ./src/app/(blog)/page.tsx

import { BlockRenderer } from "@/components/BlockRenderer";
import { sanityFetch } from "@/sanity/lib/client";

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  title,
  content
}`;

type HomepageQueryResult = {
  title: string;
  content: Array<{
    _type: string;
    [key: string]: any;
  }>;
} | null;

export default async function Page() {
  const homepage = await sanityFetch<HomepageQueryResult>({
    query: HOMEPAGE_QUERY,
  });

  if (!homepage) {
    return <div>No homepage content found</div>;
  }

  return (
    <main>
      <h1>{homepage.title}</h1>
      <BlockRenderer blocks={homepage.content} />
    </main>
  );
}
