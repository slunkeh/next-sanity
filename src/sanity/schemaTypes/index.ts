import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { pageType } from "./pageType";
import { homepageType } from "./homepageType";
import { websiteHeader } from "./websiteHeader";
import { websiteFooter } from "./websiteFooter";
import { settingsType } from "./settingsType";
import { heroBlockType } from "./blocks/heroBlockType";
import { ctaBlockType } from "./blocks/ctaBlockType";
import { servicesBlockType } from "./blocks/servicesBlockType";
import { featuresBlockType } from "./blocks/featuresBlockType";
import { portfolioBlockType } from "./blocks/portfolioBlockType";
import { pricingBlockType } from "./blocks/pricingBlockType";
import { faqBlockType } from "./blocks/faqBlockType";
import { contactBlockType } from "./blocks/contactBlockType";
import { articleBlockType } from "./blocks/articleBlockType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    homepageType,
    websiteHeader,
    websiteFooter,
    heroBlockType,
    ctaBlockType,
    servicesBlockType,
    featuresBlockType,
    portfolioBlockType,
    pricingBlockType,
    faqBlockType,
    contactBlockType,
    articleBlockType,
    settingsType,
  ],
};
