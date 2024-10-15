import { defineField, defineType } from "sanity";

export const ctaBlockType = defineType({
  name: "ctaBlock",
  title: "CTA Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "buttonText",
      type: "string",
    }),
    defineField({
      name: "linkType",
      type: "string",
      options: {
        list: [
          { title: "Internal Page", value: "internal" },
          { title: "External URL", value: "external" },
        ],
      },
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      to: [{ type: "page" }], // Assuming you have a "page" document type
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalLink",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],
});
