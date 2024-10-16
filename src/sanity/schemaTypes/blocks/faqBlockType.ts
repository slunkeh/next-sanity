import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const faqBlockType = defineType({
  name: "faqBlock",
  title: "FAQ Block",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "subheading",
      type: "text",
      title: "Subheading",
    }),
    defineField({
      name: "ctaText",
      type: "string",
      title: "CTA Button Text",
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
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQs",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question" },
            { name: "answer", type: "text", title: "Answer" },
          ],
        },
      ],
    }),
  ],
});
