import { client } from "./client";

export async function createHomepageIfNotExists() {
  const existingHomepage = await client.fetch('*[_type == "homepage"][0]');

  if (!existingHomepage) {
    await client.create({
      _type: "homepage",
      title: "Homepage",
    });
    console.log("Homepage document created");
  } else {
    console.log("Homepage document already exists");
  }
}
