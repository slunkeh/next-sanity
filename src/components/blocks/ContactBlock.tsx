import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { PortableText } from "@portabletext/react";
import ContactForm from "@/components/ContactForm";

const CONTACT_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "contactBlock" && _key == $key][0] {
    heading,
    image {
      asset-> {
        url
      }
    },
    name,
    description,
    ctaText,
    ctaLink
  }
`);

type ContactBlockProps = {
  _key: string;
  pageId: string;
};

export async function ContactBlock({ _key, pageId }: ContactBlockProps) {
  const block = await sanityFetch({
    query: CONTACT_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const { heading, image, name, description, ctaText, ctaLink } = block;

  return (
    <section id="contact">
      <div className="container-main global-padding section-padding-large">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="col-auto lg:col-span-4 flex flex-col items-center md:items-start">
            <h2 className="text-5xl font-semibold text-center md:text-left">
              {heading}
            </h2>
            <div className="relative h-64 w-64 rounded-full overflow-hidden my-8 border border-ad-dark-50 shadow-xl">
              {image && (
                <Image
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  src={image.asset.url}
                  width={300}
                  height={300}
                  alt={name}
                />
              )}
            </div>
            <div className="text-lg">
              <PortableText value={description} />
              <Link
                href={ctaLink}
                className="font-semibold tracking-tighter flex items-center gap-1 mt-8 hover:text-ad-blue"
              >
                {ctaText}
                <Image
                  src="/icons/arrow-right-short.svg"
                  alt="Arrow down right"
                  width={28}
                  height={28}
                  className="-rotate-45"
                />
              </Link>
            </div>
          </div>
          <div className="col-auto lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
