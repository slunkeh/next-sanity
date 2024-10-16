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
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Button Text",
    }),
    defineField({
      name: "buttonLinkType",
      type: "string",
      title: "Button Link Type",
      options: {
        list: [
          { title: "Internal Link", value: "internal" },
          { title: "URL or Anchor", value: "url" },
        ],
      },
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Internal Link",
      to: [{ type: "homepage" }, { type: "page" }, { type: "post" }],
      hidden: ({ parent }) => parent?.buttonLinkType !== "internal",
    }),
    defineField({
      name: "url",
      type: "string",
      title: "URL or Anchor Link",
      description: "Enter a full URL or an anchor link (e.g., '#section')",
      hidden: ({ parent }) => parent?.buttonLinkType !== "url",
    }),
    defineField({
      name: "openInNewTab",
      type: "boolean",
      title: "Open in New Tab",
      description: "If checked, the link will open in a new tab",
      initialValue: false,
    }),
  ],
});
