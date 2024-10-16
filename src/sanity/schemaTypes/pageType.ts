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
      name: "seo",
      title: "SEO",
      type: "seoMetaFields",
      options: {
        collapsible: true,
        collapsed: true,
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
        { type: "articleBlock" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "seo.metaTitle",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Untitled Page",
        subtitle: subtitle ? `SEO Title: ${subtitle}` : "No SEO title set",
      };
    },
  },
});
