"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo1 from "@/public/img/logo.png";
import api from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowBack,
  Call,
  Clear,
  Help,
  Menu,
  MenuBook,
  Person,
  Person2,
  Remove,
  Search,
} from "@mui/icons-material";
import { useAuth } from "../utils/AuthProvider";
import LoadingComponent from "../loading";

const Navbar = () => {
  const [isOpenSideNav, setIsOpenSideNav] = useState(false);

  // State to manage if navbar should be minimal
  const [isScroll, setIsScroll] = useState(false);

  // Detect scroll position to apply minimal style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch main categories
  const fetchMainCategries = async () => {
    const { data } = await api.get("categories/?is_main=true");
    return data;
  };

  const useMainCategories = () => {
    return useQuery({
      queryKey: ["main_categories"],
      queryFn: fetchMainCategries,
    });
  };

  // Fetch subcategories based on the parent category slug
  const fetchSubCategories = async (parent_slug: string) => {
    const { data } = await api.get(`categories/?parent__slug=${parent_slug}`);
    return data;
  };

  // State to track the hovered category and subcategories
  const [hoveredCategory, setHoveredCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [mainCategorydiplay, setMainCategoryDislay] = useState(false);

  // Fetch main categories with useQuery
  const { data: categories, isLoading, error } = useMainCategories();

  // Handle mouse enter to fetch subcategories
  const handleMouseEnter = async (parent_slug: string) => {
    const subcategories = await fetchSubCategories(parent_slug);
    setSelectedCategory(parent_slug);
    setHoveredCategory(subcategories.results);
  };

  // Handle mouse leave to clear subcategories
  const handleMouseLeave = () => {
    setHoveredCategory([]);
    setSelectedCategory(null);
  };

  const router = useRouter();

  // Handle navigation
  const clickHandle = (param: string) => {
    router.push(param);
  };

  // Render loading and error states
  if (isLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  if (error) {
    return <div>Error loading categories</div>;
  }

  const pathname = usePathname();

  // Check if the current path is the product detail page
  const isProductDetailPage =
    pathname.startsWith("/products/") || pathname.startsWith("/profile/");
  const AuthenticatinsPage = !pathname.startsWith("/authentication/");

  const { user, isAuthenticated } = useAuth();

  return (
    <>
      {AuthenticatinsPage ? (
        <div className="flex flex-col absolute w-full top-0 z-50 ">
          <div className=" hidden md:block w-full h-2 bg-primary z-50 border-b-[1px] border-b-black/10"></div>

          <div
            className={` transition-all duration-300 flex flex-row justify-center items-center w-full md:h-10 h-2 bg-black z-50 border-b-[1px] border-b-black/10 text-white`}
          >
            <p></p>
            <p className="text-sm md:block hidden" dir="rtl">
              تخفیفات جمعه سیاه 50%
            </p>
            <p></p>
          </div>

          {/* ------------sideNavbar----------- */}
          <div
            className={` overflow-y-scroll fixed text-xl bg-white w-full h-full top-0 right-0 transition-transform ease-in-out duration-200 z-50 p-8 ${
              isOpenSideNav ? `translate-x-0` : `translate-x-full`
            }`}
            dir="rtl"
          >
            <div
              className="border-b-2 py-6 flex flex-row space-x-2 text-gray-400"
              onClick={() => setIsOpenSideNav(false)}
            >
              <Clear /> <p>برگشت</p>
            </div>
            <div>
              <div
                className="flex flex-row justify-between items-center border-b-2 py-6"
                onClick={() => setMainCategoryDislay(!mainCategorydiplay)}
              >
                <p className=" ">دسته بندی محصولات</p>
                <ArrowBack
                  className={`transform transition-all duration-500 ${
                    mainCategorydiplay ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>
              {mainCategorydiplay ? (
                <div className=" transition-transform duration-500 border-b-2 py-6 px-4">
                  {categories.results.map((item: any) => (
                    <>
                      <div
                        key={item.slug} // Always include key when mapping over elements
                        onClick={() => {
                          selectedCategory == item.slug
                            ? handleMouseLeave()
                            : handleMouseEnter(item.slug);
                        }}
                        className={`z-50  ${
                          selectedCategory == item.slug
                            ? " bg-black text-white"
                            : " active:bg-black active:text-white"
                        }  w-full p-2 py-4  cursor-pointer border-b-2`}
                      >
                        <p>{item.name}</p>
                      </div>
                      {selectedCategory == item.slug ? (
                        <div className="py-2 bg-gray-50 basis-3/6">
                          {hoveredCategory.length > 0 && (
                            <div className=" " dir="rtl">
                              {hoveredCategory.map((sub) => (
                                <p
                                  key={sub.slug} // Unique key for subcategory items
                                  onClick={() => {
                                    setMainCategoryDislay(false);
                                    setIsOpenSideNav(false);
                                    clickHandle(
                                      `/categories/${sub.parent.slug}/${sub.slug}/`
                                    );
                                  }}
                                  className="  cursor-pointer text-black duration-500  border-b-2 p-4 mx-2"
                                >
                                  {sub.name}
                                </p>
                              ))}
                            </div>
                          )}
                          {hoveredCategory.length == 0 && (
                            <p>هیچ موردی یافت نشد.</p>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </div>
              ) : (
                ""
              )}

              <p className="border-b-2 py-6 "> ساخت حراجی </p>
              <p
                className="border-b-2 py-6 cursor-pointer"
                onClick={() => {
                  setIsOpenSideNav(false);
                  router.push("/public_pages/tutorial");
                }}
              >
                راهنمای شرکت در حراجی
              </p>
              <p
                className="border-b-2 py-6 cursor-pointer"
                onClick={() => {
                  setIsOpenSideNav(false);
                  router.push("/public_pages/about_us");
                }}
              >
                {" "}
                درباره ما
              </p>
              <a href="tel:02128428534" className="border-b-2 py-6 block">
                تماس با ما
              </a>
            </div>
          </div>

          {/* ------------phone navbar---------- */}
          <div className="flex flex-row p-2 px-4 md:hidden  z-40 bg-white items-center justify-center">
            <div className="basis-1/3 space-x-2 flex flex-row">
              <div className=" cursor-pointer">
                <Search />
              </div>
              <div className=" cursor-pointer">
                <Person />
              </div>
            </div>

            <div className="basis-1/3 flex justify-center">
              <Image
                alt="Logo"
                src={logo1}
                className="invert h-10 w-auto"
                onClick={() => clickHandle("/")}
              />
            </div>
            <div className="basis-1/3 flex justify-end">
              <div
                onClick={() => setIsOpenSideNav(true)}
                className=" cursor-pointer"
              >
                <Menu />
              </div>
            </div>
          </div>
          {/* -------------------------------------- */}

          <div
            className={`group pt-2 pb-2  space-y-4  w-full top-0 flex-col justify-between z-50 items-center md:block hidden  ${
              isProductDetailPage
                ? `bg-none `
                : ` hover:bg-none bg-gradient-to-b from-black/50 from-80% via-black/50 to-transparent bg-no-repeat hover:bg-primary transition-all ease-in-out duration-500`
            } `}
          >
            <div className="px-10 flex flex-col justify-center items-center w-full">
              {/* Navbar text content */}
              <div
                className={`mb-4 flex flex-row justify-between w-full ${
                  isProductDetailPage
                    ? `text-black`
                    : `text-white group-hover:text-black transition-colors duration-300 ease-in-out`
                }  `}
              >
                <div className="flex flex-row space-x-2 cursor-pointer">
                  <p>تماس با ما</p> <Call />
                </div>
                <div>نگاهی نو به بازار محصولات با پرایموس</div>
                <div className="flex flex-row space-x-2">
                  {isAuthenticated ? (
                    <div
                      onClick={() => clickHandle("/profile")}
                      className=" cursor-pointer flex-row flex space-x-1 justify-center"
                    >
                      <p>پروفایل</p>
                      <Person />
                    </div>
                  ) : (
                    <>
                      <p
                        className=" cursor-pointer"
                        onClick={() => clickHandle("/authentication/login/")}
                      >
                        ورود / ثبت‌نام
                      </p>
                      <Person />
                    </>
                  )}
                </div>
              </div>

              {/* Logo with hover effect */}
              <Image
                alt="Logo"
                src={logo1}
                height={200}
                width={450}
                className={`filter ${
                  isProductDetailPage
                    ? ` invert`
                    : `invert-0  group-hover:invert transition duration-300 ease-in-out cursor-pointer`
                } `}
                onClick={() => clickHandle("/")}
              />

              {/* Navbar items */}
              <div className="flex flex-row justify-around space-x-8 ">
                <p
                  onClick={() => clickHandle(`/public_pages/about_us/`)}
                  className={`cursor-pointer ${
                    isProductDetailPage
                      ? ``
                      : `text-white group-hover:text-black transition-colors`
                  }  duration-500 ease-in-out hover:border-b-current border-b-4 border-b-transparent p-2`}
                >
                  درباره ما
                </p>
                <p
                  onClick={() => clickHandle(`/public_pages/tutorial/`)}
                  className={`cursor-pointer ${
                    isProductDetailPage
                      ? ``
                      : `text-white group-hover:text-black transition-colors`
                  }  duration-500 ease-in-out hover:border-b-current border-b-4 border-b-transparent p-2`}
                >
                  راهنمای شرکت در حراجی
                </p>
                <p
                  onClick={() => clickHandle(`/profile/create_auction/`)}
                  className={`cursor-pointer ${
                    isProductDetailPage
                      ? ``
                      : `text-white group-hover:text-black transition-colors`
                  }  duration-500 ease-in-out hover:border-b-current border-b-4 border-b-transparent p-2`}
                >
                  ساخت حراجی
                </p>
                <div
                  onClick={() => setMainCategoryDislay(!mainCategorydiplay)}
                  className={`cursor-pointer ${
                    isProductDetailPage
                      ? ``
                      : `text-white group-hover:text-black transition-colors`
                  }   flex flex-row justify-center space-x-2 duration-500 ease-in-out hover:border-b-current border-b-4 border-b-transparent p-2`}
                >
                  <p>دسته بندی محصولات</p>
                  <Menu />
                </div>
              </div>
            </div>

            {/* displayed when hovering  */}
            {mainCategorydiplay && (
              <div
                onMouseLeave={() => setMainCategoryDislay(false)}
                className="  top-0 bg-white w-full drop-shadow-2xl h-80 flex flex-row justify-center border-t-2 border-black"
              >
                {/* image */}
                {/* <div className="basis-3/6">
              <img
                alt={selectedCategory}
                src={}
                height={200}
                width={450}
                className="filter invert-0 group-hover:invert transition duration-300 ease-in-out cursor-pointer"
                onClick={() => clickHandle("/")}
              />
            </div> */}
                <div className="p-8 basis-3/6">
                  {hoveredCategory.length > 0 && (
                    <div
                      className=" left-0 p-4 z-50 grid grid-cols-4 gap-0 gap-y-6"
                      dir="rtl"
                    >
                      {hoveredCategory.map((sub) => (
                        <p
                          key={sub.slug} // Unique key for subcategory items
                          onClick={() => {
                            setMainCategoryDislay(false);
                            clickHandle(
                              `/categories/${sub.parent.slug}/${sub.slug}/`
                            );
                          }}
                          className="  cursor-pointer text-black duration-500 border-black hover:bg-black/10 border-b-2  text-center mx-6"
                        >
                          {sub.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className=" w-40 overflow-scroll overflow-x-hidden flex flex-col  basis-1/6">
                  {categories.results.map((item: any) => (
                    <div
                      key={item.slug} // Always include key when mapping over elements
                      onMouseEnter={() => handleMouseEnter(item.slug)}
                      onMouseDown={() => handleMouseEnter(item.slug)}
                      className={`z-50 border-b-2 border-black border-x-2 ${
                        selectedCategory == item.slug
                          ? " bg-black text-white"
                          : "hover:bg-black hover:text-white"
                      }  w-full p-2 py-4 text-center cursor-pointer`}
                    >
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
