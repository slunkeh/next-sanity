import { BlockRenderer } from "@/components/BlockRenderer";
import { sanityFetch } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  content[] {
    ...,
    _type == "image" => {
      "url": asset->url,
      "alt": asset->alt
    }
  }
}`;

type PageQueryResult = {
  title: string;
  content: Array<{
    _type: string;
    _key: string;
    [key: string]: any;
  }>;
} | null;

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await sanityFetch<PageQueryResult>({
    query: PAGE_QUERY,
    params: { slug: params.slug },
  });

  if (!page) {
    return notFound();
  }

  console.log("Page data:", JSON.stringify(page, null, 2));

  return (
    <main>
      <BlockRenderer blocks={page.content} />
    </main>
  );
}
