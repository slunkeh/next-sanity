import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const WHATSAPP_QUERY = defineQuery(`
  *[_type == "settings"][0].whatsApp {
    show,
    size,
    position,
    phoneNumber
  }
`);

export async function WhatsApp() {
  const whatsAppSettings = await sanityFetch({ query: WHATSAPP_QUERY });

  if (!whatsAppSettings || !whatsAppSettings.show) {
    return null;
  }

  const { size, position, phoneNumber } = whatsAppSettings;

  const positionClasses = {
    "bottom-right": "bottom-3 md:bottom-6 right-3 md:right-6",
    "bottom-left": "bottom-3 md:bottom-6 left-3 md:left-6",
    "top-right": "top-3 md:top-6 right-3 md:right-6",
    "top-left": "top-3 md:top-6 left-3 md:left-6",
  };

  return (
    <a
      className={`p-4 fixed ${positionClasses[position]} z-50 rounded-full shadow-xl overflow-hidden`}
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="absolute inset-0 blur-lg bg-white opacity-10"></div>
      <Image
        className="relative z-10"
        src="/logos/whatsapp-ad.svg"
        alt="WhatsApp logo"
        width={size}
        height={size}
      />
    </a>
  );
}
