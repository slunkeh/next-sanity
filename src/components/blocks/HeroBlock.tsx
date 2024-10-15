import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const HERO_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "heroBlock" && _key == $key][0] {
    heroType,
    tagline,
    heading,
    highlightedText,
    subheading,
    backgroundImage {
      asset-> {
        url
      }
    },
    ctaPrimary,
    ctaSecondary,
    heroImage {
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

  const {
    heroType,
    tagline,
    heading,
    highlightedText,
    subheading,
    backgroundImage,
    ctaPrimary,
    ctaSecondary,
    heroImage,
  } = block;
  const imageUrl = backgroundImage?.asset?.url;
  const heroImageUrl = heroImage?.asset?.url;

  // Provide default values for ctaPrimary and ctaSecondary
  const defaultCTA = { text: "Learn More", href: "/" };
  const primaryCTA = ctaPrimary || defaultCTA;
  const secondaryCTA = ctaSecondary || defaultCTA;

  return (
    <section className="w-full relative">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Swirl Background"
          fill
          className="z-0 absolute inset-0 w-full object-cover"
        />
      )}
      <div className="global-padding container-main z-[1]">
        <div className="section-padding-large relative">
          {heroType === "type1" ? (
            <div className="flex flex-col gap-8 max-w-[50rem] justify-start items-start">
              <h1 className="px-3 py-1 text-ad-dark border border-ad-dark rounded-full mt-16 md:mt-24">
                {tagline}
              </h1>
              <h2 className="text-5xl leading-[1.1em] md:text-7xl font-bold tracking-tighter text-ad-dark md:leading-[1.1em]">
                {heading}
                <span className="bg-ad-yellow px-3 md:px-4 ml-1.5 md:ml-2 rounded-full">
                  {highlightedText}
                </span>
              </h2>
              <p className="text-xl md:text-2xl font-medium max-w-[35rem]">
                {subheading}
              </p>
              <div className="flex gap-4 items-center">
                <Link href={primaryCTA.href} className="btn btn--primary">
                  {primaryCTA.text}
                </Link>
                <Link
                  href={secondaryCTA.href}
                  className="font-semibold tracking-tighter flex items-center gap-1"
                >
                  {secondaryCTA.text}
                  <Image
                    src="/icons/arrow-right-short.svg"
                    alt="Arrow down right"
                    width={22}
                    height={22}
                    className="rotate-90"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex flex-col gap-8 max-w-[50rem] justify-start items-start">
                <h1 className="px-3 py-1 text-ad-dark border border-ad-dark rounded-full mt-16 md:mt-24">
                  {tagline}
                </h1>
                <h2 className="text-5xl leading-[1.1em] md:text-7xl font-bold tracking-tighter text-ad-dark md:leading-[1.1em]">
                  {heading}
                </h2>
                <p className="text-xl md:text-2xl font-medium max-w-[35rem]">
                  {subheading}
                </p>
                <div className="flex gap-4 items-center">
                  <Link href={primaryCTA.href} className="btn btn--primary">
                    {primaryCTA.text}
                  </Link>
                  <Link
                    href={secondaryCTA.href}
                    className="font-semibold tracking-tighter flex items-center gap-1"
                  >
                    {secondaryCTA.text}
                    <Image
                      src="/icons/arrow-right-short.svg"
                      alt="Arrow down right"
                      width={22}
                      height={22}
                      className="rotate-90"
                    />
                  </Link>
                </div>
              </div>
              {heroImageUrl && (
                <Image
                  src={heroImageUrl}
                  width={600}
                  height={600}
                  alt="Hero Image"
                  className="rounded-xl shadow-xl"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
