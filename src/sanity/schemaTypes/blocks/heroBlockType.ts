import { defineField, defineType } from "sanity";

export const heroBlockType = defineType({
  name: "heroBlock",
  title: "Hero Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      type: "text",
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
