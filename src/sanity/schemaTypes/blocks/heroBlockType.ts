import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const heroBlockType = defineType({
  name: "heroBlock",
  title: "Hero Block",
  type: "object",
  icon: BlockElementIcon,
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
          to: [{ type: "homepage" }, { type: "page" }, { type: "post" }],
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
    defineField({
      name: "ctaSecondary",
      type: "object",
      title: "Secondary CTA",
      fields: [
        { name: "text", type: "string", title: "Link Text" },
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
          to: [{ type: "homepage" }, { type: "page" }, { type: "post" }],
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
