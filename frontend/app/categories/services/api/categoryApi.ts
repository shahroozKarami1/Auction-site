import api from "@/app/utils/axios";

// Fetch category details with subcategories and products
export const fetchCategoryDetails = async (categorySlug: string) => {
  const { data } = await api.get(`/categories/${categorySlug}`);
  return data;
};

// Fetch subcategory's products
export const fetchProductsBySubCategory = async (
  categorySlug: string,
  subCategorySlug: string
) => {
  const { data } = await api.get(
    `/products/?category__slug=${subCategorySlug ? subCategorySlug : ""}`
  );
  return data;
};

export const fetchWallBanners = async (categorySlug: string) => {
  const { data } = await api.get(
    `/wall-banners/?category__slug=${categorySlug}`
  );
  return data;
};
