import { defineField, defineType } from "sanity";

export const websiteHeader = defineType({
  name: "websiteHeader",
  title: "Website Header",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "navigationItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "linkType",
              title: "Link Type",
              type: "string",
              options: {
                list: [
                  { title: "Page Reference", value: "reference" },
                  { title: "Anchor Link", value: "anchor" },
                ],
              },
            },
            {
              name: "reference",
              title: "Page Reference",
              type: "reference",
              to: [{ type: "homepage" }, { type: "post" }, { type: "page" }],
              hidden: ({ parent }) => parent?.linkType !== "reference",
            },
            {
              name: "anchor",
              title: "Anchor Link",
              type: "string",
              hidden: ({ parent }) => parent?.linkType !== "anchor",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      fields: [
        { name: "text", type: "string", title: "Button Text" },
        { name: "link", type: "string", title: "Button Link" },
      ],
    }),
  ],
});
