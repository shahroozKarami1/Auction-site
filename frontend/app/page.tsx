"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CategoryCircle from "./basic_components/CategoryCircle";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BuildIcon from "@mui/icons-material/Build";
import ThemeSwitcher from "./basic_components/ThemeSwitcher";
import { Settings, SettingsAccessibility } from "@mui/icons-material";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import api from "./utils/axios";

const Page = () => {
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    router.push(`/categories/${slug}`);
  };

  const fetchMainWallBanner = async () => {
    const { data } = await api.get("/wall-banners/?is_main=true");
    return data;
  };

  const useWallBaneers = () => {
    return useQuery(["main-wall-banners"], () => fetchMainWallBanner());
  };

  const { data: wallBanner } = useWallBaneers();
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full">
        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]} // Ensure these modules are correctly added
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 10000, // Change slide every 5 seconds
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // loop={true}
          className="mySwiper w-full h-screen"
        >
          {wallBanner?.results.map((wall: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  backgroundImage: `url(${wall.banner})`,
                }}
                className="bg-center bg-cover bg-no-repeat w-full h-full md:pt-[400px] pt-[250px] relative"
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
      </div>
    </div>
  );
};

export default Page;
