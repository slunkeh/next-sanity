import { defineField, defineType } from "sanity";

export const websiteFooter = defineType({
  name: "websiteFooter",
  title: "Website Footer",
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
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "companyInfo",
      title: "Company Information",
      type: "text",
    }),
    defineField({
      name: "links",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", type: "string", title: "Link Text" },
            { name: "url", type: "string", title: "Link URL" },
          ],
        },
      ],
    }),
  ],
});
