import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import React from "react";

const FOOTER_QUERY = defineQuery(`
  *[_type == "websiteFooter"][0] {
    logo {
      asset-> {
        url,
        metadata {
          dimensions
        }
      }
    },
    email,
    companyInfo,
    links[] {
      text,
      linkType,
      internalLink->{_type, slug},
      url,
      openInNewTab
    },
  }
`);

type FooterLink = {
  text: string;
  linkType: "internal" | "url";
  internalLink?: {
    _type: string;
    slug: { current: string };
  };
  url?: string;
  openInNewTab: boolean;
};

export async function Footer() {
  const footer = await sanityFetch({ query: FOOTER_QUERY });
  const currentYear = new Date().getFullYear();

  if (!footer) return null;

  const getLinkProps = (link: FooterLink) => {
    let href = "/";
    if (link.linkType === "internal" && link.internalLink) {
      href =
        link.internalLink._type === "homepage"
          ? "/"
          : `/${link.internalLink.slug.current}`;
    } else if (link.linkType === "url") {
      href = link.url || "/";
    }
    const linkProps = link.openInNewTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return { href, linkProps };
  };

  return (
    <footer className="py-16 bg-ad-dark text-gray-400">
      <div className="container-main global-padding flex flex-col gap-6">
        <Link href="/">
          {footer.logo && (
            <Image
              src={footer.logo.asset.url}
              alt="Company Logo"
              width={footer.logo.asset.metadata.dimensions.width}
              height={footer.logo.asset.metadata.dimensions.height}
              className="h-12 w-auto"
            />
          )}
        </Link>
        <div className="flex flex-col gap-2">
          <a
            className="text-lg flex gap-2 items-center"
            href={`mailto:${footer.email}`}
          >
            <Image
              src="/icons/mui-mail.svg"
              height={18}
              width={18}
              alt="letter icon"
            />{" "}
            {footer.email}
          </a>
        </div>
      </div>
      <div className="container-main global-padding">
        <hr className="my-8 bg-ad-gray-900" />
        <div className="flex justify-between flex-wrap gap-4">
          <p className="text-gray-400 max-w-2xl">
            © {currentYear} {footer.companyInfo}
          </p>
          <div className="flex gap-2">
            {footer.links.map((link, index) => {
              const { href, linkProps } = getLinkProps(link);
              return (
                <React.Fragment key={href}>
                  {index > 0 && <span className="text-gray-600">/</span>}
                  <Link href={href} {...linkProps}>
                    {link.text}
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
