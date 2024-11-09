import {
  PersonRounded,
  CardGiftcardTwoTone,
  Gavel,
  HowToVote,
  StarBorder,
  Numbers,
  Notifications,
  Email,
  Report,
  RateReview,
  Payment,
  Logout,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");
  console.log(activeMenu);

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  const menuItems = [
    { path: "/users", label: "Users", icon: <PersonRounded /> },
    { path: "/products", label: "Products", icon: <CardGiftcardTwoTone /> },
    { path: "/payments", label: "Payments", icon: <Payment /> },
    { path: "/bids", label: "Bids", icon: <Gavel /> },
    { path: "/bid_steps", label: "Bid Step", icon: <Numbers /> },
    { path: "/score_levels", label: "Score Levels", icon: <StarBorder /> },
    { path: "/notifications", label: "Notifications", icon: <Notifications /> },
    { path: "/tickets", label: "Tickets", icon: <Email /> },
    { path: "/reports", label: "Reports", icon: <Report /> },
    { path: "/ratings", label: "Rates Review", icon: <RateReview /> },
  ];

  return (
    <div className="flex flex-col justify-between h-full w-full items-center space-y-6 py-4">
      <div className="h-10 text-center items-center justify-center flex text-3xl pt-5">
        Primus
      </div>
      <div className="flex flex-col justify-start space-y-2 p-4 h-full w-full overflow-x-hidden overflow-y-auto scrollbar-hide text-md">
        {menuItems.map((menu) => (
          <div
            key={menu.path}
            className={`flex flex-row p-2 px-4 rounded-3xl cursor-pointer space-x-6 duration-200 ease-linear ${
              activeMenu === menu.path + "/"
                ? "bg-foreground text-neutral"
                : "hover:bg-foreground hover:text-neutral"
            }`}
            onClick={() => router.push(menu.path)}
          >
            {menu.icon}
            <p>{menu.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-start w-full p-4">
        <div
          className="flex flex-row hover:bg-rose-400 hover:text-neutral duration-200 ease-linear p-2 px-4 rounded-3xl cursor-pointer space-x-6"
          onClick={() => router.push("/authentication/logout")}
        >
          <Logout />
          <p className="">Log out</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
