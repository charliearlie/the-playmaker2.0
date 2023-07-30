type MappedLink = {
  name: string;
  href: string;
};

export const slugMap = (slug: string) => {
  const map: { [key: string]: MappedLink } = {
    "search-results": {
      name: "Search Results",
      href: "/search",
    },
  };

  return map[slug] || "Error (for now)";
};
