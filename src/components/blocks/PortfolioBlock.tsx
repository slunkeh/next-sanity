import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const PORTFOLIO_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "portfolioBlock" && _key == $key][0] {
    heading,
    projects[] {
      title,
      image {
        asset-> {
          url
        }
      }
    }
  }
`);

type ProjectItem = {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
};

type PortfolioBlockProps = {
  _key: string;
  pageId: string;
};

export async function PortfolioBlock({ _key, pageId }: PortfolioBlockProps) {
  const block = await sanityFetch({
    query: PORTFOLIO_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const { heading, projects } = block;

  return (
    <section id="portfolio" className="relative">
      <div className="absolute inset-0 w-96 h-96 rounded-full bg-ad-yellow-200 blur-2xl opacity-50"></div>
      <div className="container-main global-padding section-between-large relative z-[1]">
        <h2 className="text-5xl font-bold tracking-tighter mb-16">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project: ProjectItem, index: number) => (
            <div className="flex flex-col gap-2" key={index}>
              <Image
                className="rounded"
                width={500}
                height={500}
                src={project.image.asset.url}
                alt={project.title}
              />
              <div className="flex gap-2 items-center">
                <div className="rounded-full h-4 w-4 bg-ad-mint"></div>
                <h3 className="text-xl">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
