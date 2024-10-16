import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { PortableText } from "@portabletext/react";

const CTA_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "ctaBlock" && _key == $key][0] {
    theme,
    headingLight,
    headingBold,
    content,
    buttonText,
    buttonLinkType,
    internalLink->{_type, slug},
    url,
    openInNewTab
  }
`);

type CTABlockProps = {
  _key: string;
  pageId: string;
};

export async function CTABlock({ _key, pageId }: CTABlockProps) {
  const block = await sanityFetch<CTABlockData | null>({
    query: CTA_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const {
    theme,
    headingLight,
    headingBold,
    content,
    buttonText,
    buttonLinkType,
    internalLink,
    url,
    openInNewTab,
  } = block;

  let background;
  let button;
  switch (theme) {
    case "primary":
      background = "bg-ad-blue text-white";
      button = "btn btn--light";
      break;
    case "secondary":
      background = "bg-ad-mint";
      button = "btn btn--primary";
      break;
    case "tertiary":
      background = "bg-ad-yellow";
      button = "btn btn--dark";
      break;
    case "dark":
      background = "bg-ad-dark text-white";
      button = "btn btn--white";
      break;
    case "white":
      background = "bg-white text-ad-dark";
      button = "btn btn--dark";
      break;
    case "gradient":
      background = "bg-gradient-to-r from-ad-yellow-200 to-ad-mint-400";
      button = "btn btn--dark";
      break;
    default:
      background = "bg-ad-blue";
      button = "btn btn--light";
  }

  let buttonHref = "/";
  if (buttonLinkType === "internal" && internalLink) {
    buttonHref =
      internalLink._type === "homepage" ? "/" : `/${internalLink.slug.current}`;
  } else if (buttonLinkType === "url") {
    buttonHref = url || "/";
  }

  const linkProps = openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <section className="padding-global container-main">
      <div
        className={`mx-4 md:mx-0 ${background} rounded-[3rem] md:rounded-[5rem] py-10 px-8 md:py-12 md:px-16 relative overflow-hidden`}
      >
        <div className="flex flex-col items-start gap-8 max-w-[55rem] relative z-[2]">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-[45rem]">
            <span className="font-light">
              {headingLight}
              <br />
            </span>
            <span className="font-bold">{headingBold}</span>
          </h2>
          <div className="text-xl">
            <PortableText value={content} />
          </div>
          <Link href={buttonHref} className={button} {...linkProps}>
            {buttonText}
          </Link>
        </div>
        <Image
          className="absolute z-[1] -bottom-2 right-0 opacity-5"
          src="/decorative/ad-triangle.svg"
          height={600}
          width={600}
          alt="decorative triangle"
        />
        <div className="noise-overlay absolute inset-0 h-full w-full pointer-events-none opacity-5"></div>
      </div>
    </section>
  );
}
