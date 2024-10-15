import Link from "next/link";

type CTABlockProps = {
  heading: string;
  buttonText: string;
  linkType: "internal" | "external" | null;
  internalLink?: {
    _id: string;
    _type: string;
    title: string;
    slug: string;
  } | null;
  externalLink?: string | null;
};

export function CTABlock({
  heading,
  buttonText,
  linkType,
  internalLink,
  externalLink,
}: CTABlockProps) {
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
        <Link
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          href={href}
          {...(linkType === "external"
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
