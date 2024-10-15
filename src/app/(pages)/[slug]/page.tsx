import { BlockRenderer } from "@/components/BlockRenderer";
import { sanityFetch } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";

const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  content[] {
    _type,
    _key
  }
}`);

type PageContent = {
  _type: string;
  _key: string;
};

type PageQueryResult = {
  _id: string;
  title: string;
  content: PageContent[];
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
    <>
      <main>
        <BlockRenderer blocks={page.content} pageId={page._id} />
      </main>
    </>
  );
}
