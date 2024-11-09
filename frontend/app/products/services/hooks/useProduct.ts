import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails } from "../api/productApi";

export const useProduct = (productSlug: string) => {
  return useQuery(
    ["product", productSlug],
    () => fetchProductDetails(productSlug),
    {
      enabled: !!productSlug,
    }
  );
};
