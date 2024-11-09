import React, { useState, useEffect } from "react";
import { usePlaceBid } from "../hooks/useBids";
import { Gavel } from "@mui/icons-material";

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBid: number;
  minBidIncrement: number;
  rulesText: string;
  productId: number;
}
const formatPrice = (price: any) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const BidModal: React.FC<BidModalProps> = ({
  isOpen,
  onClose,
  currentBid,
  minBidIncrement,
  productId,
}) => {
  const [bidAmount, setBidAmount] = useState(currentBid + minBidIncrement);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationColor, setNotificationColor] = useState<string>("");

  const { mutate: placeBid, isLoading, isSuccess, error } = usePlaceBid();

  useEffect(() => {
    if (isSuccess) {
      showNotification("پیشنهاد شما با موفقیت ثبت شد!", "green");
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh the page after closing the modal
      }, 3000); // Close the modal after 3 seconds
    }
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (error) {
      showNotification(error.response.data, "red");
    }
  }, [error]);

  // Function to show notification and hide it after 3 seconds
  const showNotification = (message: string, color: string) => {
    setNotification(message);
    setNotificationColor(color);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide after 3 seconds
  };

  if (!isOpen) return null;

  const handlePlaceBid = () => {
    if (rulesAccepted) {
      placeBid({
        product: productId,
        amount: bidAmount,
      });
    }
  };

  const handleIncrement = () => {
    setBidAmount(bidAmount + minBidIncrement);
  };

  const handleDecrement = () => {
    if (bidAmount > currentBid + minBidIncrement) {
      setBidAmount(bidAmount - minBidIncrement);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary text-tbox w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-md shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">ثبت پیشنهاد</h2>
          <button
            onClick={() => {
              onClose();
              window.location.reload(); // Refresh the page when modal is manually closed
            }}
            className="text-tbox hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Bid Status */}
        <div className="mb-4">
          <p>قیمت فعلی: {formatPrice(currentBid)} تومان</p>
          <p>پله هر پیشنهاد: {formatPrice(minBidIncrement)} تومان</p>
          <p>قیمت پیشنهادی شما: {formatPrice(bidAmount)} تومان</p>
          <div className="flex justify-between mt-4 text-foreground">
            <button
              onClick={handleDecrement}
              className="bg-white px-4 py-2 rounded-md"
            >
              -
            </button>
            <span className="px-6 w-full mx-2 rounded-md bg-white py-2 text-tbox text-center">
              {formatPrice(bidAmount)} تومان
            </span>
            <button
              onClick={handleIncrement}
              className="bg-white px-4 py-2 rounded-md"
            >
              +
            </button>
          </div>
        </div>

        {/* Show Rules */}
        <div className="mb-4 text-xs md:text-sm">
          <div>
            <div className="flex items-center justify-start">
              <input
                type="checkbox"
                id="rulesAccepted"
                className="mr-1"
                checked={rulesAccepted}
                onChange={() => setRulesAccepted(!rulesAccepted)}
              />
              <label htmlFor="rulesAccepted" className="flex flex-row md:mx-1">
                تمامی
                <a
                  className="text-blue-500 mx-1"
                  href="http://localhost:3000/public_pages/rules/"
                >
                  <p> قوانین و مقررات</p>
                </a>
                را خوانده و آن ها را تایید می کنم.
              </label>
            </div>
          </div>
        </div>

        {/* Place Bid Button */}
        <div className="mt-4 text-right">
          <button
            onClick={handlePlaceBid}
            className={` w-full ${
              rulesAccepted && !isLoading
                ? "bg-black hover:bg-black/80 duration-500"
                : "bg-gray-400"
            } text-white px-4 py-2 rounded-md transition `}
            disabled={!rulesAccepted || isLoading}
          >
            <Gavel />
            {isLoading ? "...ثبت پبشنهاد" : "ثبت پیشنهاد"}
          </button>
        </div>

        {/* Notification (at the top of the modal) */}
        {notification && (
          <div
            className="fixed top-0 left-0 right-0 p-4 text-center z-50"
            style={{ backgroundColor: notificationColor, color: "white" }}
          >
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default BidModal;
