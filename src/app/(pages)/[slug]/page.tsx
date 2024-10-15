import { BlockRenderer } from "@/components/BlockRenderer";
import { sanityFetch } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  content
}`;

type PageQueryResult = {
  title: string;
  content: Array<{
    _type: string;
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

  return (
    <main>
      <h1>{page.title}</h1>
      <BlockRenderer blocks={page.content} />
    </main>
  );
}
