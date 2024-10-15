import { sanityFetch } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { CTABlock } from "@/components/blocks/CTABlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";

export default async function Home() {
  const data = await sanityFetch({ query: HOME_PAGE_QUERY });
  console.log("Homepage data:", JSON.stringify(data, null, 2));

  return (
    <main>
      {data.content.map((block) => {
        switch (block._type) {
          case "heroBlock":
            return (
              <HeroBlock
                key={block._key}
                heading={block.heading}
                subheading={block.subheading}
                backgroundImage={block.backgroundImage}
              />
            );
          case "ctaBlock":
            return (
              <CTABlock
                key={block._key}
                heading={block.heading}
                buttonText={block.buttonText}
                linkType={block.linkType}
                internalLink={block.internalLink}
                externalLink={block.externalLink}
              />
            );
          default:
            console.warn(`Unsupported block type: ${block._type}`);
            return null;
        }
      })}
    </main>
  );
}
