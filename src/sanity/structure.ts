import type { StructureResolver } from "sanity/structure";
import {
  singletonDocumentListItem,
  filteredDocumentListItems,
} from "sanity-plugin-singleton-tools";
import { HomeIcon } from "@sanity/icons";
import { StackIcon } from "@sanity/icons";

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
      S.divider(),
      // Existing document types
      // S.documentTypeListItem("post").title("Posts"),
      // S.documentTypeListItem("category").title("Categories"),
      // S.documentTypeListItem("author").title("Authors"),
      // S.divider(),
      // Filter out singleton documents from the rest of the document types
      ...filteredDocumentListItems({ S, context }),
    ]);
