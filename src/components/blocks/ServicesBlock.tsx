import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import Image from "next/image";

const SERVICES_BLOCK_QUERY = defineQuery(`
  *[(_type == "homepage" || _type == "page") && _id == $pageId][0].content[_type == "servicesBlock" && _key == $key][0] {
    headingPart1,
    headingPart2,
    subheading,
    services[] {
      title,
      description,
      icon {
        asset-> {
          url
        }
      }
    }
  }
`);

type ServiceItem = {
  title: string;
  description: string;
  icon: {
    asset: {
      url: string;
    };
  };
};

type ServicesBlockProps = {
  _key: string;
  pageId: string;
};

export async function ServicesBlock({ _key, pageId }: ServicesBlockProps) {
  const block = await sanityFetch({
    query: SERVICES_BLOCK_QUERY,
    params: { key: _key, pageId },
  });

  if (!block) return null;

  const { headingPart1, headingPart2, subheading, services } = block;

  return (
    <section id="services">
      <div className="global-padding container-main section-between-large">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
          <h2 className="text-4xl md:text-5xl font-bold max-w-[45rem] tracking-tighter">
            {headingPart1} <br />
            <span className="text-gradient">{headingPart2}</span>
          </h2>
          <p className="text-xl">{subheading}</p>
        </div>
        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 md:gap-20 justify-start">
          {services.map((service: ServiceItem, index: number) => (
            <div key={index} className="relative">
              {index < services.length - 1 && (
                <div
                  className={`hidden absolute top-0 bottom-0 -right-10 
                    ${index !== services.length - 1 ? "xl:block" : "xl:hidden"} 
                    ${index % 2 === 0 ? "hidden md:block" : "lg:hidden"} `}
                >
                  <div className="gradient-line h-full w-[1px]"></div>
                </div>
              )}
              <div
                className={`p-4 bg-ad-dark inline-flex items-center justify-center rounded-full`}
              >
                {service.icon && service.icon.asset && (
                  <Image
                    src={service.icon.asset.url}
                    alt={service.title}
                    width={24}
                    height={24}
                  />
                )}
              </div>
              <h3 className="mt-6 md:mt-12 mb-4 text-2xl md:text-3xl font-bold tracking-tighter">
                {service.title}
              </h3>
              <p className="text-lg text-ad-dark-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
