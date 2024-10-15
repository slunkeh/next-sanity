import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const portfolioBlockType = defineType({
  name: "portfolioBlock",
  title: "Portfolio Block",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
    }),
    defineField({
      name: "projects",
      type: "array",
      title: "Projects",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Project Title" },
            {
              name: "image",
              type: "image",
              title: "Project Image",
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
