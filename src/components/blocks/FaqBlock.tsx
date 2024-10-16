import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { FaqAccordion } from "@/components/FaqAccordion";

const FAQ_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "faqBlock" && _key == $key][0] {
    heading,
    subheading,
    ctaText,
    ctaLink,
    faqs[] {
      question,
      answer
    }
  }
`);

type FaqBlockProps = {
  _key: string;
  pageId: string;
};

export async function FaqBlock({ _key, pageId }: FaqBlockProps) {
  const blockData = await sanityFetch({
    query: FAQ_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!blockData) return null;

  const { heading, subheading, ctaText, ctaLink, faqs } = blockData;

  return (
    <section id="faqs" className="section-padding-medium text-dark">
      <div className="container-main global-padding grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 xl:gap-24">
        <div className="flex flex-col items-start gap-4 col-span-1 lg:col-span-4">
          <h2 className="text-5xl tracking-tighter font-bold">{heading}</h2>
          <p className="text-xl">{subheading}</p>
          <Link className="btn btn--primary" href={ctaLink}>
            {ctaText}
          </Link>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
