import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const PRICING_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "pricingBlock" && _key == $key][0] {
    headingPart1,
    headingPart2,
    subheading,
    pricingItems[] {
      title,
      price,
      frequency,
      features,
      ctaText,
      ctaLinkType,
      internalLink->{_type, slug},
      url,
      openInNewTab
    },
    backgroundImage {
      asset-> {
        url
      }
    }
  }
`);

type PricingItem = {
  title: string;
  price: string;
  frequency: string;
  features: string[];
  ctaText: string;
  ctaLinkType: string;
  internalLink?: { _type: string; slug: { current: string } };
  url?: string;
  openInNewTab: boolean;
};

type PricingBlockProps = {
  _key: string;
  pageId: string;
};

export async function PricingBlock({ _key, pageId }: PricingBlockProps) {
  const block = await sanityFetch({
    query: PRICING_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const {
    headingPart1,
    headingPart2,
    subheading,
    pricingItems,
    backgroundImage,
  } = block;

  return (
    <section id="pricing" className="section-between-large relative">
      {backgroundImage && (
        <Image
          src={backgroundImage.asset.url}
          fill
          alt="background"
          className="w-full absolute left-0 right-0 top-[50%] object-cover"
        />
      )}
      <div className="container-main global-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold max-w-[45rem] tracking-tighter">
            {headingPart1} <br />
            <span className="text-gradient">{headingPart2}</span>
          </h2>
          <p className="text-xl">{subheading}</p>
        </div>
        <div>
          <ul className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingItems.map((pricingItem: PricingItem, index: number) => {
              let ctaHref = "/";
              if (
                pricingItem.ctaLinkType === "internal" &&
                pricingItem.internalLink
              ) {
                ctaHref =
                  pricingItem.internalLink._type === "homepage"
                    ? "/"
                    : `/${pricingItem.internalLink.slug.current}`;
              } else if (pricingItem.ctaLinkType === "url") {
                ctaHref = pricingItem.url || "/";
              }

              const linkProps = pricingItem.openInNewTab
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <li
                  key={index}
                  className="p-12 rounded-lg border shadow-md relative overflow-hidden bg-white"
                >
                  <div className="flex flex-col gap-4">
                    <div className="text-center flex flex-col gap-4">
                      <h3 className="text-3xl tracking-tighter">
                        {pricingItem.title}
                      </h3>
                      <h4 className="text-6xl font-bold">
                        {pricingItem.price}
                      </h4>
                      <p className="text-xl">{pricingItem.frequency}</p>
                    </div>
                    <Link
                      href={ctaHref}
                      className="btn btn--primary"
                      {...linkProps}
                    >
                      {pricingItem.ctaText}
                    </Link>
                    <ul className="ml-4 flex flex-col gap-2 text-xl mt-8">
                      {pricingItem.features.map((feature, index) => (
                        <li className="flex gap-2 items-center" key={index}>
                          <span>
                            <Image
                              height={20}
                              width={20}
                              src="/icons/mui-check.svg"
                              alt="check icon"
                            />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
