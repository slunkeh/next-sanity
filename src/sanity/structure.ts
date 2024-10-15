import type { StructureResolver } from "sanity/structure";
import {
  singletonDocumentListItem,
  filteredDocumentListItems,
} from "sanity-plugin-singleton-tools";
import { HomeIcon } from "@sanity/icons";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Blog")
    .items([
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
