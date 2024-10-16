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
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
        title: title || "Homepage",
        subtitle: subtitle ? `SEO Title: ${subtitle}` : "No SEO title set",
      };
    },
  },
});
