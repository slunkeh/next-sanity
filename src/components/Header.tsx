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
      "reference": reference-> {
        _id,
        _type,
        title,
        "slug": slug.current,
        "fullSlug": select(
          _type == "homepage" => "/",
          _type == "page" => "/" + slug.current,
          _type == "post" => "/posts/" + slug.current
        )
      },
      anchor
    },
    ctaButton
  }
`);

type NavigationItem = {
  _key: string;
  title: string;
  linkType: "reference" | "anchor";
  reference?: {
    _id: string;
    _type: string;
    title: string | null;
    slug: string | null;
    fullSlug: string;
  };
  anchor?: string;
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
    link: string;
  };
};

export async function Header() {
  const headerData = await sanityFetch<HeaderData>({ query: HEADER_QUERY });

  if (!headerData) return null;

  const navigationItems = headerData.navigationItems.map((item) => ({
    _key: item._key,
    title: item.title,
    href:
      item.linkType === "reference"
        ? item.reference?.fullSlug || "/"
        : item.anchor || "/",
  }));

  return (
    <Navigation
      logo={headerData.logo.asset.url}
      navigationItems={navigationItems}
      ctaButton={headerData.ctaButton}
    />
  );
}
