import type { StructureResolver } from "sanity/structure";
import { singletonDocumentListItem } from "sanity-plugin-singleton-tools";
import { HomeIcon, StackIcon, CogIcon } from "@sanity/icons";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Website")
    .items([
      // Create a list item for each singleton document in your schema that links directly to a document view
      // Website header as a singleton
      singletonDocumentListItem({
        S,
        context,
        type: "websiteHeader",
        title: "Website Header",
        id: "websiteHeader",
        icon: StackIcon,
      }),
      // Homepage as a singleton
      singletonDocumentListItem({
        S,
        context,
        type: "homepage",
        title: "Homepage",
        id: "homepage",
        icon: HomeIcon,
      }),
      // Website footer as a singleton
      singletonDocumentListItem({
        S,
        context,
        type: "websiteFooter",
        title: "Website Footer",
        id: "websiteFooter",
        icon: StackIcon,
      }),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      // Existing document types
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      singletonDocumentListItem({
        S,
        context,
        type: "settings",
        title: "Settings",
        id: "settings",
        icon: CogIcon,
      }),
    ]);
