import { useQuery } from "@tanstack/react-query";
import { fetchCategoryDetails } from "../api/categoryApi";

export const useCategory = (categorySlug: string) => {
  return useQuery(
    ["category", categorySlug],
    () => fetchCategoryDetails(categorySlug),
    {
      enabled: !!categorySlug,
    }
  );
};
