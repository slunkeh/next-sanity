import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const pricingBlockType = defineType({
  name: "pricingBlock",
  title: "Pricing Block",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "headingPart1",
      type: "string",
      title: "Heading Part 1",
    }),
    defineField({
      name: "headingPart2",
      type: "string",
      title: "Heading Part 2 (Gradient)",
    }),
    defineField({
      name: "subheading",
      type: "text",
      title: "Subheading",
    }),
    defineField({
      name: "pricingItems",
      type: "array",
      title: "Pricing Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "price", type: "string", title: "Price" },
            { name: "frequency", type: "string", title: "Frequency" },
            {
              name: "features",
              type: "array",
              title: "Features",
              of: [{ type: "string" }],
            },
            {
              name: "ctaText",
              type: "string",
              title: "CTA Button Text",
            },
            {
              name: "ctaLinkType",
              type: "string",
              title: "CTA Link Type",
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
              to: [{ type: "homepage" }, { type: "page" }, { type: "post" }],
              hidden: ({ parent }) => parent?.ctaLinkType !== "internal",
            },
            {
              name: "url",
              type: "string",
              title: "URL or Anchor Link",
              description:
                "Enter a full URL or an anchor link (e.g., '#section')",
              hidden: ({ parent }) => parent?.ctaLinkType !== "url",
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
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
