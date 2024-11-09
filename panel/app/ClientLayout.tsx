"use client";
import { AccessTime, AccountCircle, Notifications } from "@mui/icons-material";

import { usePathname } from "next/navigation";
import ThemeSwitcher from "./basic_components/ThemeSwitcher";
import SideMenu from "./basic_components/SideMenu";
import CurrentDateTime from "./basic_components/CurrentDateTime";
import AccountAdminName from "./basic_components/AccountAdminName";
import NotificationsNav from "./basic_components/NotificationsNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noLayoutPages = ["/authentication/login/"];
  const isNoLayoutPage = noLayoutPages.includes(pathname);

  return (
    <>
      {!isNoLayoutPage ? (
        <div className="flex flex-row h-screen p-5 space-x-5 bg-[url('/img/mm.jpg')] bg-no-repeat bg-cover bg-fixed w-full bg-background ">
          <div className="basis-1/6  rounded-3xl backdrop-blur-md bg-background ">
            <SideMenu />
          </div>
          <main className="basis-5/6 flex flex-col justify-between space-y-5 overflow-auto ">
            <div className="flex flex-row space-x-2 ">
              <ThemeSwitcher />
              <AccountAdminName />
              <CurrentDateTime />
              <NotificationsNav />
            </div>
            <div className="bg-background h-full rounded-3xl backdrop-blur-md overflow-hidden">
              {children}
            </div>
          </main>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
