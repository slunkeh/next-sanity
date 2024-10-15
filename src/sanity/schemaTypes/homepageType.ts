import { defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "content",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "ctaBlock" },
        { type: "servicesBlock" },
      ],
    }),
  ],
});
