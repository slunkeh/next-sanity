import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const articleBlockType = defineType({
  name: "articleBlock",
  title: "Article Block",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "linkType",
                    type: "string",
                    title: "Link Type",
                    options: {
                      list: [
                        { title: "Internal Link", value: "internal" },
                        { title: "URL or Anchor", value: "url" },
                      ],
                    },
                  },
                  {
                    name: "internalLink",
                    type: "reference",
                    title: "Internal Link",
                    to: [
                      { type: "homepage" },
                      { type: "post" },
                      { type: "page" },
                    ],
                    hidden: ({ parent }) => parent?.linkType !== "internal",
                  },
                  {
                    name: "url",
                    type: "string",
                    title: "URL or Anchor Link",
                    description:
                      "Enter a full URL or an anchor link (e.g., '#section')",
                    hidden: ({ parent }) => parent?.linkType !== "url",
                  },
                  {
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Open in New Tab",
                    description: "If checked, the link will open in a new tab",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
});
