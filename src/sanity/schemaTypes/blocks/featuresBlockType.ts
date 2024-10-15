import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const featuresBlockType = defineType({
  name: "featuresBlock",
  title: "Features Block",
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
      name: "features",
      type: "array",
      title: "Features",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    }),
  ],
});
