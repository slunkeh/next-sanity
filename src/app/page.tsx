import { sanityFetch } from "@/sanity/lib/client";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Header } from "@/components/Header";
import { defineQuery } from "next-sanity";
import { Footer } from "@/components/Footer";

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]  { 
    _id,
    title,
    content[] {
      _type,
      _key
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
};

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
    </>
  );
}
