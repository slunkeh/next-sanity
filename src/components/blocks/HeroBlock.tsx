import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const HERO_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "heroBlock" && _key == $key][0] {
    heading,
    subheading,
    backgroundImage {
      asset-> {
        url
      }
    }
  }
`);

type HeroBlockProps = {
  _key: string;
  pageId: string;
};

export async function HeroBlock({ _key, pageId }: HeroBlockProps) {
  const block = await sanityFetch({
    query: HERO_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const { heading, subheading, backgroundImage } = block;
  const imageUrl = backgroundImage?.asset?.url;

  return (
    <div className="relative h-screen">
      {imageUrl && (
        <Image src={imageUrl} alt={heading} layout="fill" objectFit="cover" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">{heading}</h1>
          <p className="text-xl">{subheading}</p>
        </div>
      </div>
    </div>
  );
}
