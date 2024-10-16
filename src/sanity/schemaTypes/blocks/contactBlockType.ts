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
      name: "ctaLink",
      type: "string",
      title: "CTA Link",
    }),
  ],
});
