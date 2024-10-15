import { CTABlock } from "@/components/blocks/CTABlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { ServicesBlock } from "@/components/blocks/ServicesBlock";

type Block = {
  _type: string;
  _key: string;
};

type BlockRendererProps = {
  blocks: Block[];
  pageId: string;
};

export function BlockRenderer({ blocks, pageId }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "ctaBlock":
            return (
              <CTABlock key={block._key} _key={block._key} pageId={pageId} />
            );
          case "heroBlock":
            return (
              <HeroBlock key={block._key} _key={block._key} pageId={pageId} />
            );
          case "servicesBlock":
            return (
              <ServicesBlock
                key={block._key}
                _key={block._key}
                pageId={pageId}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
