"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  const AuthenticatinsPage = !pathname.startsWith("/authentication/");

  return (
    <>
      {AuthenticatinsPage ? (
        <div className="w-ful  text-center border-t-[1px] border-black">
          <div className="bg-primary p-2" dir="rtl">
            کلیه حقوق مادی و معنوی این وب‌سایت متعلق به pri22.com می‌باشد.
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
