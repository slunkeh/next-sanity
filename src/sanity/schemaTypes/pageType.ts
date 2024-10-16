import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
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
      ],
    }),
  ],
});
