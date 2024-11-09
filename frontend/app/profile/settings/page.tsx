import React from "react";

const SettingsPage = () => {
  // داده‌های استاتیک برای تنظیمات
  const settingsData = [
    { id: 1, name: "اطلاع‌رسانی ایمیلی", value: "فعال" },
    { id: 2, name: "اطلاع‌رسانی پیامکی", value: "غیرفعال" },
    { id: 3, name: "حریم خصوصی حساب", value: "عمومی" },
    { id: 4, name: "حالت تاریک", value: "فعال" },
    { id: 5, name: "احراز هویت دو مرحله‌ای", value: "فعال" },
  ];

  return (
    <div className="h-dvh pt-80 justify-center">
      <p className="text-center mt-5 text-3xl">تنظیمات</p>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">نام تنظیمات</th>
              <th className="py-3 px-6 text-left">مقدار</th>
              <th className="py-3 px-6 text-left">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {settingsData.map((setting) => (
              <tr
                key={setting.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{setting.name}</td>
                <td className="py-3 px-6">{setting.value}</td>
                <td className="py-3 px-6">
                  <button className="text-blue-500 hover:underline">
                    ویرایش
                  </button>
                  <button className="text-red-500 hover:underline ml-2">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingsPage;
