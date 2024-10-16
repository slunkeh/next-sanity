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
                  { title: "Internal Link", value: "internal" },
                  { title: "URL or Anchor", value: "url" },
                ],
              },
            },
            {
              name: "internalLink",
              title: "Internal Link",
              type: "reference",
              to: [{ type: "homepage" }, { type: "post" }, { type: "page" }],
              hidden: ({ parent }) => parent?.linkType !== "internal",
            },
            {
              name: "url",
              title: "URL or Anchor Link",
              type: "string",
              description:
                "Enter a full URL or an anchor link (e.g., '#section')",
              hidden: ({ parent }) => parent?.linkType !== "url",
            },
            {
              name: "openInNewTab",
              type: "boolean",
              title: "Open in New Tab",
              description: "If checked, the link will open in a new tab",
              initialValue: false,
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
        {
          name: "linkType",
          type: "string",
          title: "Link Type",
          options: {
            list: [
              { title: "Internal Link", value: "internal" },
              { title: "URL or Anchor", value: "url" },
            ],
          },
        },
        {
          name: "internalLink",
          type: "reference",
          title: "Internal Link",
          to: [{ type: "homepage" }, { type: "post" }, { type: "page" }],
          hidden: ({ parent }) => parent?.linkType !== "internal",
        },
        {
          name: "url",
          type: "string",
          title: "URL or Anchor Link",
          description: "Enter a full URL or an anchor link (e.g., '#section')",
          hidden: ({ parent }) => parent?.linkType !== "url",
        },
        {
          name: "openInNewTab",
          type: "boolean",
          title: "Open in New Tab",
          description: "If checked, the link will open in a new tab",
          initialValue: false,
        },
      ],
    }),
  ],
});
