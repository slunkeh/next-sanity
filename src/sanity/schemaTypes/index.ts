import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { pageType } from "./pageType";
import { homepageType } from "./homepageType";
import { websiteHeader } from "./websiteHeader";
import { heroBlockType } from "./blocks/heroBlockType";
import { ctaBlockType } from "./blocks/ctaBlockType";
import { servicesBlockType } from "./blocks/servicesBlockType";
import { featuresBlockType } from "./blocks/featuresBlockType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    homepageType,
    websiteHeader,
    heroBlockType,
    ctaBlockType,
    servicesBlockType,
    featuresBlockType,
  ],
};
