import Image from "next/image";

type HeroBlockProps = {
  heading: string;
  subheading: string;
  backgroundImage?: {
    asset: {
      url: string;
    };
  };
};

export function HeroBlock({
  heading,
  subheading,
  backgroundImage,
}: HeroBlockProps) {
  console.log("HeroBlock props:", { heading, subheading, backgroundImage });

  const imageUrl = backgroundImage?.asset?.url;
  console.log("Image URL:", imageUrl);

  return (
    <div className="relative h-screen">
      {imageUrl && (
        <Image src={imageUrl} alt={heading} layout="fill" objectFit="cover" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">{heading}</h1>
          <p className="text-xl">{subheading}</p>
        </div>
      </div>
    </div>
  );
}
