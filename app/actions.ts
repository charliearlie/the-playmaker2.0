"use server";

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const searchTerm = await formData.get("searchTerm");
  redirect("/search-results?searchTerm=" + searchTerm);
}
