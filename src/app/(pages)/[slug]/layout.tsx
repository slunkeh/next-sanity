// ./src/app/(blog)/layout.tsx

import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Header } from "@/components/Header";
import { client } from "@/sanity/lib/client";

type NavItem = {
  text: string;
  link: string;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Fetching navigation items...");

  try {
    const navItems = await client.fetch<NavItem[]>(
      `*[_type == "navigation" && title == "Main Navigation"][0].items`
    );
    console.log("Fetched Navigation Items:", JSON.stringify(navItems, null, 2));

    return (
      <html lang="en">
        <body>
          <Header navItems={navItems || []} />
          {draftMode().isEnabled && (
            <a
              className="fixed right-0 bottom-0 bg-blue-500 text-white p-4 m-4"
              href="/api/draft-mode/disable"
            >
              Disable preview mode
            </a>
          )}
          {children}
          {draftMode().isEnabled && <VisualEditing />}
        </body>
      </html>
    );
  } catch (error) {
    console.error("Error fetching navigation items:", error);
    return (
      <html lang="en">
        <body>
          <Header navItems={[]} />
          {children}
        </body>
      </html>
    );
  }
}
