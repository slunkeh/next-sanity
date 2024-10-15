import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const FEATURES_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "featuresBlock" && _key == $key][0] {
    headingPart1,
    headingPart2,
    subheading,
    features[] {
      title,
      description
    }
  }
`);

type FeatureItem = {
  title: string;
  description: string;
};

type FeaturesBlockProps = {
  _key: string;
  pageId: string;
};

export async function FeaturesBlock({ _key, pageId }: FeaturesBlockProps) {
  const block = await sanityFetch({
    query: FEATURES_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const { headingPart1, headingPart2, subheading, features } = block;

  return (
    <section id="features" className="section-between-large">
      <div className="global-padding container-main flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
          <h2 className="text-4xl md:text-5xl font-bold max-w-[45rem] tracking-tighter">
            {headingPart1} <br />
            <span className="text-gradient">{headingPart2}</span>
          </h2>
          <p className="text-xl">{subheading}</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: FeatureItem, index: number) => (
            <li
              key={index}
              className="p-6 rounded-xl border border-ad-dark-100 relative oveflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold tracking-tighter">
                  {feature.title}
                </h3>
                <p className="text-lg">{feature.description}</p>
              </div>
              <div className="noise-overlay absolute inset-0 h-full w-full pointer-events-none opacity-5"></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
