import api from "@/app/utils/axios";

// Fetch product details by productSlug
export const fetchProductDetails = async (productSlug: string) => {
  const { data } = await api.get(`/products/${productSlug}`);
  return data;
};
