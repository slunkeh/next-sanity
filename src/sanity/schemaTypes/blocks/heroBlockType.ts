import { defineField, defineType } from "sanity";

export const heroBlockType = defineType({
  name: "heroBlock",
  title: "Hero Block",
  type: "object",
  fields: [
    defineField({
      name: "heroType",
      type: "string",
      title: "Hero Type",
      options: {
        list: [
          { title: "Type 1", value: "type1" },
          { title: "Type 2", value: "type2" },
        ],
      },
    }),
    defineField({
      name: "tagline",
      type: "string",
      title: "Tagline",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "highlightedText",
      type: "string",
      title: "Highlighted Text",
      hidden: ({ parent }) => parent?.heroType !== "type1",
    }),
    defineField({
      name: "subheading",
      type: "text",
      title: "Subheading",
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.heroType !== "type2",
    }),
    defineField({
      name: "ctaPrimary",
      type: "object",
      title: "Primary CTA",
      fields: [
        { name: "text", type: "string", title: "Button Text" },
        { name: "href", type: "string", title: "Button Link" },
      ],
    }),
    defineField({
      name: "ctaSecondary",
      type: "object",
      title: "Secondary CTA",
      fields: [
        { name: "text", type: "string", title: "Link Text" },
        { name: "href", type: "string", title: "Link URL" },
      ],
    }),
  ],
});
