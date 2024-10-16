import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import Link from "next/link";

const ARTICLE_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "articleBlock" && _key == $key][0] {
    content[] {
      ...,
      markDefs[] {
        ...,
        _type == "link" => {
          ...,
          internalLink->{_type, slug}
        }
      }
    }
  }
`);

type ArticleBlockProps = {
  _key: string;
  pageId: string;
};

const components = {
  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps<any>) => {
      const { linkType, internalLink, url, openInNewTab } = value || {};
      let href = "/";

      if (linkType === "internal" && internalLink) {
        href =
          internalLink._type === "homepage"
            ? "/"
            : `/${internalLink.slug.current}`;
      } else if (linkType === "url") {
        href = url || "/";
      }

      const linkProps = openInNewTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

      return (
        <Link
          href={href}
          {...linkProps}
          className="hover:underline text-ad-dark"
        >
          {children}
        </Link>
      );
    },
  },
};

export async function ArticleBlock({ _key, pageId }: ArticleBlockProps) {
  const block = await sanityFetch({
    query: ARTICLE_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  return (
    <article className="py-16 lg:py-28 mx-auto">
      <div className="global-padding section-padding-large container-main">
        <div className="prose md:prose-lg lg:prose-xl mx-auto max-w-none font-normal prose-headings:font-normal prose-headings:tracking-tight">
          <PortableText value={block.content} components={components} />
        </div>
      </div>
    </article>
  );
}
