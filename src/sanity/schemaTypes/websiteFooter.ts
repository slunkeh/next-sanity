import { defineField, defineType } from "sanity";

export const websiteFooter = defineType({
  name: "websiteFooter",
  title: "Website Footer",
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
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "companyInfo",
      title: "Company Information",
      type: "text",
    }),
    defineField({
      name: "links",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", type: "string", title: "Link Text" },
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
  ],
});
