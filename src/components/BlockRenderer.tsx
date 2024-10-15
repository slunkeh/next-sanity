import { HeroBlock } from "./blocks//HeroBlock";
import { CTABlock } from "./blocks/CTABlock";

type BlockRendererProps = {
  blocks: Array<{
    _type: string;
    [key: string]: any;
  }>;
};

const blockComponents = {
  heroBlock: HeroBlock,
  ctaBlock: CTABlock,
};

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const BlockComponent =
          blockComponents[block._type as keyof typeof blockComponents];
        if (BlockComponent) {
          return <BlockComponent key={block._key} {...block} />;
        }
        return null;
      })}
    </>
  );
}
