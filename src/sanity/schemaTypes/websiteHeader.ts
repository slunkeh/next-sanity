import { defineField, defineType } from "sanity";

export const websiteHeader = defineType({
  name: "websiteHeader",
  title: "Website Header",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "navigationItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "link",
              title: "Link",
              type: "reference",
              to: [{ type: "homepage" }, { type: "post" }, { type: "page" }],
            },
          ],
        },
      ],
    }),
  ],
});
