"use client";

import SubCategoryList from "./SubCategoryList";
import { useCategory } from "../hooks/useCategory";
import { useParams, useRouter } from "next/navigation";
import { useWallBaneers } from "../hooks/useWallBanners";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ProductList from "./ProductList";
import { useSubCategory } from "../hooks/useSubCategory";

const CategoryComponent = () => {
  const { categorySlug, subCategorySlug } = useParams();
  const {
    data: products,
    isLoading: isis,
    error: ee,
  } = useSubCategory(categorySlug as string, subCategorySlug as string);

  const router = useRouter();

  const { data: category, isLoading, error } = useCategory(categorySlug);
  const {
    data: wallBanner,
    isLoading: BI,
    error: BE,
  } = useWallBaneers(categorySlug);

  if (isLoading) return <div>Loading category...</div>;
  if (error) return <div>Error loading category.</div>;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]} // Ensure these modules are correctly added
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000, // Change slide every 5 seconds
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true} // Enable navigation controls for manual slide change
        loop={true} // Enable looping for a smooth experience
        className="mySwiper w-full md:h-[700px] h-[600px]"
      >
        {wallBanner?.results.map((wall: any, index: number) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${wall.banner})`,
              }}
              className="bg-center bg-cover bg-no-repeat w-full h-[700px] md:pt-[350px] pt-[150px] relative"
            >
              {/* <div className=" w-full flex justify-center p-7 z-20">
                <h1 className="text-white text-5xl z-20">{category.name}</h1>
              </div> */}
              <div
                className={`w-full flex flex-col text-right justify-end  z-20 md:pt-10 md:px-40 px-8 space-y-6 ${
                  wall.background_is_light
                    ? `text-black`
                    : `text-white shadow-text shadow-black`
                }`}
              >
                <div
                  className="space-x-4 flex flex-row-reverse md:pl-40 justify-end"
                  dir="rtl"
                >
                  <p>{subCategorySlug}</p>
                  <p>/</p>
                  <p>{category?.name}</p>
                  <p>/</p>
                  <p>دسته بندی</p>
                </div>
                <p className="lg:text-5xl text-4xl">{wall.title}</p>
                <p className="lg:text-2xl text-lg">{wall.description}</p>
                <div className="flex md:flex-row flex-col-reverse text-right justify-end md:space-x-4 ">
                  <p
                    onClick={() => router.push(wall.second_url)}
                    className={`p-3 px-6 ${
                      wall.background_is_light
                        ? ` border-black border-2 cursor-pointer hover:bg-black hover:text-white`
                        : ` border-white border-2 text-white cursor-pointer hover:bg-white hover:text-black`
                    } duration-500`}
                  >
                    {wall.second_url_title}
                  </p>
                  <p
                    onClick={() => router.push(wall.first_url)}
                    className={`p-3 px-6 mb-4 md:mb-0 ${
                      wall.background_is_light
                        ? ` text-white bg-black border-black border-2 cursor-pointer hover:bg-transparent hover:text-black`
                        : ` text-black bg-white border-white border-2 cursor-pointer hover:bg-transparent hover:text-white`
                    } duration-500`}
                  >
                    {wall.first_url_title}
                  </p>
                </div>
              </div>
              <div className="absolute h-32 inset-0 bg-gradient-to-b from-neutral to-transparent z-10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className=" bg-primary w-full p-4 md:px-10 px-6">
        <div className="flex flex-row justify-end  text-foreground mb-4">
          <div className="flex flex-row space-x-6 bg-white w-full p-4 justify-end">
            <div>فیلتر بر اساس</div>
            <div>مرتب سازی</div>
          </div>
        </div>
        <div className="flex flex-row justify-end mb-4 px-4 space-x-2">
          <p> {products?.count} </p>
          <p>:</p>
          <p> تعداد محصولات</p>
        </div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default CategoryComponent;
