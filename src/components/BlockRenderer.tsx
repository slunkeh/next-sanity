import { CTABlock } from "@/components/blocks/CTABlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { ServicesBlock } from "@/components/blocks/ServicesBlock";
import { FeaturesBlock } from "@/components/blocks/FeaturesBlock";
import { PortfolioBlock } from "@/components/blocks/PortfolioBlock";
import { PricingBlock } from "@/components/blocks/PricingBlock";

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
          case "featuresBlock":
            return (
              <FeaturesBlock
                key={block._key}
                _key={block._key}
                pageId={pageId}
              />
            );
          case "portfolioBlock":
            return (
              <PortfolioBlock
                key={block._key}
                _key={block._key}
                pageId={pageId}
              />
            );
          case "pricingBlock":
            return (
              <PricingBlock
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
