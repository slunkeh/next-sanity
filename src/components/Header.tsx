import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { Navigation } from "./Navigation";

const HEADER_QUERY = defineQuery(`
  *[_type == "websiteHeader"][0] {
    logo {
      asset-> {
        url
      }
    },
    navigationItems[] {
      _key,
      title,
      linkType,
      internalLink->{_type, slug},
      url,
      openInNewTab
    },
    ctaButton {
      text,
      linkType,
      internalLink->{_type, slug},
      url,
      openInNewTab
    }
  }
`);

type NavigationItem = {
  _key: string;
  title: string;
  linkType: "internal" | "url";
  internalLink?: {
    _type: string;
    slug: { current: string };
  };
  url?: string;
  openInNewTab: boolean;
};

type HeaderData = {
  logo: {
    asset: {
      url: string;
    };
  };
  navigationItems: NavigationItem[];
  ctaButton: {
    text: string;
    linkType: "internal" | "url";
    internalLink?: {
      _type: string;
      slug: { current: string };
    };
    url?: string;
    openInNewTab: boolean;
  };
};

export async function Header() {
  const headerData = await sanityFetch<HeaderData>({ query: HEADER_QUERY });

  if (!headerData) return null;

  const getLinkProps = (item: NavigationItem | HeaderData["ctaButton"]) => {
    let href = "/";
    if (item.linkType === "internal" && item.internalLink) {
      href =
        item.internalLink._type === "homepage"
          ? "/"
          : `/${item.internalLink.slug.current}`;
    } else if (item.linkType === "url") {
      href = item.url || "/";
    }
    const linkProps = item.openInNewTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return { href, linkProps };
  };

  const navigationItems = headerData.navigationItems.map((item) => ({
    _key: item._key,
    title: item.title,
    ...getLinkProps(item),
  }));

  const ctaButton = {
    text: headerData.ctaButton.text,
    ...getLinkProps(headerData.ctaButton),
  };

  return (
    <Navigation
      logo={headerData.logo.asset.url}
      navigationItems={navigationItems}
      ctaButton={ctaButton}
    />
  );
}
