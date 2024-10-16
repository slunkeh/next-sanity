import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const contactBlockType = defineType({
  name: "contactBlock",
  title: "Contact Block",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Contact Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "name",
      type: "string",
      title: "Contact Name",
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Description",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ctaText",
      type: "string",
      title: "CTA Text",
    }),
    defineField({
      name: "ctaLinkType",
      type: "string",
      title: "CTA Link Type",
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
      hidden: ({ parent }) => parent?.ctaLinkType !== "internal",
    }),
    defineField({
      name: "url",
      type: "string",
      title: "URL or Anchor Link",
      description: "Enter a full URL or an anchor link (e.g., '#section')",
      hidden: ({ parent }) => parent?.ctaLinkType !== "url",
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
