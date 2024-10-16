import { sanityFetch } from "@/sanity/lib/client";
import { BlockRenderer } from "@/components/BlockRenderer";
import { defineQuery } from "next-sanity";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsApp } from "@/components/WhatsApp";

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]  { 
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
  }
`);

type HomePageContent = {
  _type: string;
  _key: string;
};

type HomePageData = {
  _id: string;
  title: string;
  content: HomePageContent[];
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
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<HomePageData>({ query: HOME_PAGE_QUERY });

  if (!data || !data.seo) {
    return {};
  }

  const { seo } = data;
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
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: ogImage,
    },
  };
}

export default async function Home() {
  const data = await sanityFetch<HomePageData>({ query: HOME_PAGE_QUERY });

  if (!data || !data.content) {
    return <main>No homepage data found</main>;
  }

  return (
    <>
      <Header />
      <main>
        <BlockRenderer blocks={data.content} pageId={data._id} />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
