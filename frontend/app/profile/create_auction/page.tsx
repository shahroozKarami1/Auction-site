"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/axios";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface Category {
  id: number;
  name: string;
  slug: string;
  is_main: boolean;
}

const iranCities = ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز"];

const CreateProductPage: React.FC = () => {
  const [mainCategory, setMainCategory] = useState<Category | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    province: "",
    city: "",
    address: "",
    postal_code: "",
    start_price: "",
  });
  const [auctionStartDate, setAuctionStartDate] = useState<any>(null);
  const [auctionEndDate, setAuctionEndDate] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);

  // Fetch main categories
  const fetchMainCategories = async () => {
    const { data } = await api.get("categories/?is_main=true");
    return Array.isArray(data) ? data : [];
  };
  const { data: mainCategories = [] } = useQuery(
    ["main_categories"],
    fetchMainCategories
  );

  // Fetch subcategories based on main category
  const fetchSubCategories = async (parent_slug: string) => {
    const { data } = await api.get(`categories/?parent__slug=${parent_slug}`);
    return data;
  };
  const { data: subCategories } = useQuery(
    ["sub_categories", mainCategory?.slug],
    () => fetchSubCategories(mainCategory?.slug || ""),
    { enabled: !!mainCategory }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle main category selection
  const handleMainCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMainCategory = mainCategories?.results?.find(
      (cat: Category) => cat.id === parseInt(e.target.value)
    );

    setMainCategory(selectedMainCategory || null);
    setSubCategoryId(null);
  };
  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubCategoryId(parseInt(e.target.value));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: product } = await api.post("/products/", {
        ...productData,
        category: subCategoryId,
        auction_start_date: auctionStartDate.toDate(),
        auction_end_date: auctionEndDate.toDate(),
      });

      // Step 2: Upload images if any
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("image", image); // Append each image to FormData
        });

        // Post images to the product images endpoint
        await api.post(`/images/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          params: { product: product.id },
        });
      }

      alert("محصول با موفقیت ایجاد شد!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("خطا در ایجاد محصول.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-full max-w-lg mx-auto p-4 space-y-4 md:mt-80 mt-24"
      dir="rtl"
    >
      {/* Main Category Selection */}
      <label>
        دسته‌بندی اصلی:
        <select
          value={mainCategory?.id || ""}
          onChange={handleMainCategoryChange}
          className="w-full p-2 border rounded"
        >
          <option value="">انتخاب دسته‌بندی اصلی</option>
          {mainCategories?.results?.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      {/* Subcategory Selection */}
      {mainCategory && (
        <label>
          زیر دسته‌بندی:
          <select
            value={subCategoryId || ""}
            onChange={handleSubCategoryChange}
            className="w-full p-2 border rounded"
          >
            <option value="">انتخاب زیر دسته‌بندی</option>
            {subCategories?.results?.map((subcategory: any) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Product Details Inputs */}
      <input
        type="text"
        name="name"
        placeholder="نام محصول"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="توضیحات محصول"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Country and City Selection */}
      <input
        type="text"
        value="ایران"
        disabled
        className="w-full p-2 border rounded bg-gray-100"
      />
      <select
        name="city"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">انتخاب شهر</option>
        {iranCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="address"
        placeholder="آدرس"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="postal_code"
        placeholder="کد پستی"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Price Inputs */}
      <input
        type="number"
        name="start_price"
        placeholder="قیمت شروع"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      {/* Jalali Date Pickers for Auction Dates */}
      <label className="block">
        تاریخ شروع حراج:
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={auctionStartDate}
          onChange={setAuctionStartDate}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-10">
        تاریخ پایان حراج:
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={auctionEndDate}
          onChange={setAuctionEndDate}
          className="w-full p-2 border rounded"
        />
      </label>

      {/* Image Upload */}
      <label className="block">
        تصاویر محصول:
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        ایجاد محصول
      </button>
    </form>
  );
};

export default CreateProductPage;
