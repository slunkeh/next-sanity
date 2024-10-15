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
              name: "ctaLink",
              type: "string",
              title: "CTA Button Link",
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
