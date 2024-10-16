import { defineField, defineType } from "sanity";

export const seoMetaFields = defineType({
  name: "seoMetaFields",
  title: "SEO Meta Fields",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("Should be under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("Should be under 160 characters"),
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for sharing on social media",
      options: {
        hotspot: true,
      },
    }),
  ],
});
