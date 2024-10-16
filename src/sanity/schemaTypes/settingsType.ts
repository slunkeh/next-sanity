import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "whatsApp",
      title: "WhatsApp",
      type: "object",
      fields: [
        {
          name: "show",
          title: "Show WhatsApp Icon",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "size",
          title: "Icon Size",
          type: "number",
          validation: (Rule) => Rule.min(20).max(100),
          initialValue: 40,
        },
        {
          name: "position",
          title: "Icon Position",
          type: "string",
          options: {
            list: [
              { title: "Bottom Right", value: "bottom-right" },
              { title: "Bottom Left", value: "bottom-left" },
              { title: "Top Right", value: "top-right" },
              { title: "Top Left", value: "top-left" },
            ],
          },
          initialValue: "bottom-right",
        },
        {
          name: "phoneNumber",
          title: "WhatsApp Phone Number",
          type: "string",
          description:
            "Enter the phone number with country code (e.g., 447590841878)",
        },
      ],
    }),
  ],
});
