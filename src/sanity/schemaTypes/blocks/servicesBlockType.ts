import { defineField, defineType } from "sanity";

export const servicesBlockType = defineType({
  name: "servicesBlock",
  title: "Services Block",
  type: "object",
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
      name: "services",
      type: "array",
      title: "Services",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            {
              name: "icon",
              type: "image",
              title: "Icon",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
  ],
});
