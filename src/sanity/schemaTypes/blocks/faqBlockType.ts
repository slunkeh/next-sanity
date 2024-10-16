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
      name: "ctaLink",
      type: "string",
      title: "CTA Button Link",
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
