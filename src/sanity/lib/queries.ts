// ./src/sanity/lib/queries.ts

import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`);

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  title, content
}`);

export const NAV_QUERY = defineQuery(
  `*[_type == "navigation" && title == "Main Navigation"][0].items`
);

// Add the HOME_PAGE_QUERY
export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  title,
  content[] {
    _type,
    _key,
    heading,
    subheading,
    buttonText,
    linkType,
    "internalLink": internalLink-> {
      _id,
      _type,
      title,
      "slug": slug.current
    },
    externalLink,
    backgroundImage {
      asset-> {
        _id,
        _type,
        url
      }
    }
  }
}`);
