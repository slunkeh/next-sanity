import { BlockRenderer } from "@/components/BlockRenderer";
import { sanityFetch } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { Metadata } from "next";

const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  content[] {
    _type,
    _key
  },
  seo {
    metaTitle,
    metaDescription,
    openGraphImage {
      asset->
    }
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
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    openGraphImage?: {
      asset: {
        url: string;
        metadata: {
          dimensions: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
} | null;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await sanityFetch<PageQueryResult>({
    query: PAGE_QUERY,
    params: { slug: params.slug },
  });

  if (!page || !page.seo) {
    return {};
  }

  const { seo } = page;
  const ogImage = seo.openGraphImage?.asset
    ? [
        {
          url: seo.openGraphImage.asset.url,
          width: seo.openGraphImage.asset.metadata.dimensions.width,
          height: seo.openGraphImage.asset.metadata.dimensions.height,
        },
      ]
    : [];

  return {
    title: seo.metaTitle || page.title,
    description: seo.metaDescription,
    openGraph: {
      title: seo.metaTitle || page.title,
      description: seo.metaDescription,
      images: ogImage,
    },
  };
}

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
