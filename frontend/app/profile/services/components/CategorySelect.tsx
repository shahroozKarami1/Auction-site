import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/axios";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategorySelectProps {
  onSelectCategory: (selectedCategoryId: number) => void;
}

// Fetch main categories
const fetchMainCategories = async () => {
  const { data } = await api.get("categories/?is_main=true");
  return data;
};

const useMainCategories = () => {
  return useQuery({
    queryKey: ["main_categories"],
    queryFn: fetchMainCategories,
  });
};

// Fetch subcategories based on the parent category slug
const fetchSubCategories = async (parent_slug: string) => {
  const { data } = await api.get(`categories/?parent__slug=${parent_slug}`);
  return data;
};

const useSubCategories = (parentSlug: string) => {
  return useQuery({
    queryKey: ["sub_categories", parentSlug],
    queryFn: () => fetchSubCategories(parentSlug),
    enabled: !!parentSlug, // Only run this query if a parentSlug is provided
  });
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  onSelectCategory,
}) => {
  const [mainCategory, setMainCategory] = useState<Category | null>(null);
  const { data: mainCategories, isLoading: isLoadingMain } =
    useMainCategories();
  const { data: subCategories, isLoading: isLoadingSub } = useSubCategories(
    mainCategory?.slug || ""
  );

  const handleMainCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMainCategory = mainCategories?.results.find(
      (cat: Category) => cat.id === parseInt(e.target.value)
    );
    setMainCategory(selectedMainCategory || null);
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCategoryId = parseInt(e.target.value);
    onSelectCategory(selectedSubCategoryId);
  };

  return (
    <div>
      {/* Main category selection */}
      <label>دسته‌بندی اصلی:</label>
      <select onChange={handleMainCategoryChange} disabled={isLoadingMain}>
        <option value="">انتخاب دسته‌بندی اصلی</option>
        {mainCategories?.results.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Subcategory selection */}
      {mainCategory && (
        <>
          <label>زیر دسته‌بندی:</label>
          <select onChange={handleSubCategoryChange} disabled={isLoadingSub}>
            <option value="">انتخاب زیر دسته‌بندی</option>
            {subCategories?.results.map((subcategory: Category) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default CategorySelect;
