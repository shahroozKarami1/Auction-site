import { useQuery } from "@tanstack/react-query";
import { fetchProductsBySubCategory } from "../api/categoryApi";

export const useSubCategory = (
  categorySlug: string,
  subCategorySlug: string
) => {
  return useQuery(
    ["subcategory-products", categorySlug, subCategorySlug],
    () => fetchProductsBySubCategory(categorySlug, subCategorySlug),
    {
      enabled: !!categorySlug && !!subCategorySlug,
    }
  );
};
