import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const ctaBlockType = defineType({
  name: "ctaBlock",
  title: "CTA Block",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "theme",
      type: "string",
      title: "Theme",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Tertiary", value: "tertiary" },
          { title: "Dark", value: "dark" },
          { title: "White", value: "white" },
          { title: "Gradient", value: "gradient" },
        ],
      },
    }),
    defineField({
      name: "headingLight",
      type: "string",
      title: "Heading (Light)",
    }),
    defineField({
      name: "headingBold",
      type: "string",
      title: "Heading (Bold)",
    }),
    defineField({
      name: "paragraphs",
      type: "array",
      title: "Paragraphs",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Button Text",
    }),
    defineField({
      name: "buttonLink",
      type: "string",
      title: "Button Link",
    }),
  ],
});
