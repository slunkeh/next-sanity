import { defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "content",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "ctaBlock" },
        { type: "servicesBlock" },
        { type: "featuresBlock" },
        { type: "portfolioBlock" },
        { type: "pricingBlock" },
        { type: "faqBlock" },
        { type: "contactBlock" },
        { type: "articleBlock" },
      ],
    }),
  ],
});
