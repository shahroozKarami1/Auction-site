"use client";

import { useProduct } from "../hooks/useProduct";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "../types/types";
import LoadingComponent from "@/app/loading";
import { useAuth } from "@/app/utils/AuthProvider";
import BidModal from "./BidModal";
import { AccountBalance, Gavel, Login, MeetingRoom } from "@mui/icons-material";

const ProductDetailComponent = () => {
  const { user, isAuthenticated } = useAuth();
  const { productSlug } = useParams();
  const { data: product, isLoading, error } = useProduct<Product>(productSlug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const [bidAmount, setBidAmount] = useState();
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePlaceBid = (bidAmount: number) => {
    console.log(`Bid placed: ${bidAmount}`);
  };
  const formatPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (product) {
      const currentDate = new Date();
      const auctionStartDate = new Date(product.auction_start_date);
      const auctionEndDate = new Date(product.auction_end_date);
      const timeRemaining = auctionEndDate - currentDate;

      if (timeRemaining > 0) {
        setRemainingTime(timeRemaining);
      }
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [product]);

  if (isLoading) return <LoadingComponent />;
  if (error) return <div>خطا در بارگذاری محصول.</div>;
  if (!product) return <div>محصولی پیدا نشد.</div>;

  const currentDate = new Date();
  const auctionStartDate = new Date(product.auction_start_date);
  const auctionEndDate = new Date(product.auction_end_date);

  const isAuctionStarted = currentDate >= auctionStartDate;
  const isAuctionEnded = currentDate > auctionEndDate;

  const formatTimeRemaining = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return `${hours} ساعت, ${minutes} دقیقه, ${seconds} ثانیه`;
  };

  return (
    <div className="pt-24 md:pt-[350px] max-h-[1100px] min-h-dvh flex flex-col md:flex-row justify-between w-full p-4 md:p-8 gap-6 text-right bg-primary">
      {/* Left Side: Main Product Image and Thumbnails */}
      <div className="md:w-1/2 max-w-full flex flex-col">
        {/* Main Image */}
        <div className="mb-4 overflow-hidden">
          <img
            src={product.images[selectedImageIndex]?.image}
            alt={`Product Image ${selectedImageIndex + 1}`}
            className="w-full max-h-[300px] min-h-[200px]  md:max-h-[600px] md:min-h-[600px] object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto">
          {product.images?.map((image, index) => (
            <img
              key={index}
              src={image.image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-12 h-12 md:w-16 md:h-16 object-cover cursor-pointer ${
                selectedImageIndex === index
                  ? "border-2 border-blue-500"
                  : "border border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side: Product Details */}
      <div
        className="md:w-1/2 w-full flex flex-col justify-start p-6 bg-white"
        dir="rtl"
      >
        <div className="flex flex-row-reverse justify-between space-x-2 items-center mb-4">
          <p className="bg-black/90 text-white p-1 px-2 text-sm rounded-md">
            {product.status === "not_started"
              ? "شروع نشده است"
              : product.status === "on_going"
              ? "درحال برگزاری"
              : "تمام شده است"}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">{product.name}</h1>
        </div>

        <p>توضیحات :</p>
        <p className="text-gray-700 text-sm mb-4 w-full md:w-3/4">
          {product.description || "توضیحات موجود نیست."}
        </p>
        <p>مکان:</p>
        <p className="mb-4 text-gray-700 text-sm">
          {`${product.city || "شهر ناشناخته"}, ${
            product.province || "استان ناشناخته"
          }, ${product.country || "کشور ناشناخته"}`}
        </p>

        <div className="pt-4 border-t-2 border-black">
          <div className="mb-2 flex items-center justify-between">
            <strong>زمان شروع :</strong>
            <span className="ml-2 text-black font-medium">
              {auctionStartDate.toLocaleString("fa-IR")}
            </span>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <strong>زمان پایان :</strong>
            <span className="ml-2 text-black font-medium">
              {auctionEndDate.toLocaleString("fa-IR")}
            </span>
          </div>
        </div>

        <div className="text-black flex flex-col space-y-1 bg-primary border-2 border-black px-2 py-2 text-xs md:text-sm">
          <div className="mb-2 flex justify-between">
            <strong>شروع قیمت :</strong>
            <p>{formatPrice(product.start_price)} تومان</p>
          </div>
          <div className="mb-2 flex justify-between">
            <strong>قیمت فعلی :</strong>
            <p>{formatPrice(product.current_price)} تومان</p>
          </div>
          <div className="mb-2 flex justify-between">
            <strong>قیمت تمام شده :</strong>
            {product.max_price != null ? (
              <p>{formatPrice(product.current_price)} تومان</p>
            ) : (
              "حراجی هنوز تمام نشده است!"
            )}
          </div>
          <p className="mb-2 flex justify-between">
            <strong>تعداد پیشنهادهای ثبت شده:</strong> {product.bids_count}{" "}
            پیشنهاد
          </p>
        </div>

        <div className="mt-4 flex justify-end items-center w-full">
          {user?.score < product.for_level ? (
            <p>حداقل امتیاز مورد نیاز : {product.for_level}</p>
          ) : null}
          {isAuctionEnded ? (
            <button
              className="bg-black text-white p-2 cursor-not-allowed w-full"
              disabled
            >
              حراجی به پایان رسیده است
            </button>
          ) : user?.score < product.for_level ? (
            <button
              className="bg-black text-white p-2 cursor-not-allowed w-full"
              disabled
            >
              شما امکان شرکت در حراجی ندارید
            </button>
          ) : isAuctionStarted ? (
            <button
              onClick={() =>
                isAuthenticated
                  ? setIsModalOpen(true)
                  : router.push("/authentication/login/")
              }
              className="py-2 bg-black text-white p-2 hover:bg-primary hover:text-black transition w-full flex justify-center items-center space-x-4"
            >
              <p>ورود به حراجی</p> <Gavel />
            </button>
          ) : (
            <button
              className="bg-black text-white p-2 cursor-not-allowed w-full"
              disabled
            >
              حراجی هنوز شروع نشده است
            </button>
          )}
        </div>

        <BidModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentBid={product.current_price}
          minBidIncrement={product.current_step}
          rulesText={"قوانین"}
          productId={product.id}
          onPlaceBid={handlePlaceBid}
        />
      </div>
    </div>
  );
};

export default ProductDetailComponent;
