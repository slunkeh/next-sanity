import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

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
      "link": link-> {
        _id,
        _type,
        title,
        "slug": slug.current,
        "fullSlug": select(
          _type == "homepage" => "/",
          _type == "page" => "/" + slug.current,
          _type == "post" => "/posts/" + slug.current
        )
      }
    }
  }
`);

type NavigationItem = {
  _key: string;
  title: string;
  link: {
    _id: string;
    _type: string;
    title: string | null;
    slug: string | null;
    fullSlug: string;
  };
};

type HeaderData = {
  logo: {
    asset: {
      url: string;
    };
  };
  navigationItems: NavigationItem[];
};

export async function Header() {
  const headerData = await sanityFetch<HeaderData>({ query: HEADER_QUERY });

  if (!headerData) {
    return null;
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {headerData.logo && headerData.logo.asset && (
            <Link href="/">
              <Image
                src={headerData.logo.asset.url}
                alt="Logo"
                width={50}
                height={50}
                className="mr-4"
              />
            </Link>
          )}
        </div>
        <nav>
          <ul className="flex space-x-4">
            {headerData.navigationItems.map((item) => (
              <li key={item._key}>
                <Link
                  href={item.link.fullSlug}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
