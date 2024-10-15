import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { pageType } from "./pageType";
import { homepageType } from "./homepageType";
import { heroBlockType } from "./blocks/heroBlockType";
import { ctaBlockType } from "./blocks/ctaBlockType";
import { servicesBlockType } from "./blocks/servicesBlockType";
import { websiteHeader } from "./websiteHeader";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    homepageType,
    heroBlockType,
    ctaBlockType,
    servicesBlockType,
    websiteHeader,
  ],
};
