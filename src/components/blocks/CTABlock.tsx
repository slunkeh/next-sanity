import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const CTA_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "ctaBlock" && _key == $key][0] {
    heading,
    buttonText,
    linkType,
    "internalLink": internalLink-> {
      _id,
      _type,
      title,
      "slug": slug.current
    },
    externalLink
  }
`);

type CTABlockProps = {
  _key: string;
  pageId: string;
};

export async function CTABlock({ _key, pageId }: CTABlockProps) {
  const block = await sanityFetch({
    query: CTA_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const { heading, buttonText, linkType, internalLink, externalLink } = block;

  let href = "#";
  if (linkType === "internal" && internalLink?.slug) {
    href = `/${internalLink.slug}`;
  } else if (linkType === "external" && externalLink) {
    href = externalLink;
  }

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{heading}</h2>
        {buttonText && (
          <Link
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            href={href}
            {...(linkType === "external"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
