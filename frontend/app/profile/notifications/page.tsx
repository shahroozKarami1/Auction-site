import React from "react";

const NotificationsPage = () => {
  // داده‌های استاتیک نوتیفیکیشن‌ها
  const notifications = [
    { id: 1, message: "شما یک پیام جدید دارید.", date: "1402/01/10" },
    { id: 2, message: "حساب شما به روز رسانی شد.", date: "1402/01/15" },
    {
      id: 3,
      message: "یک دعوت‌نامه برای شما ارسال شده است.",
      date: "1402/01/20",
    },
    { id: 4, message: "رمز عبور شما تغییر کرد.", date: "1402/01/25" },
    { id: 5, message: "یک پرداخت جدید انجام شد.", date: "1402/02/01" },
  ];

  return (
    <div className="h-dvh pt-80">
      <h1 className="text-3xl font-bold text-center mb-4">
        لیست نوتیفیکیشن‌ها
      </h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">شناسه</th>
            <th className="border px-4 py-2">پیام</th>
            <th className="border px-4 py-2">تاریخ</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td className="border px-4 py-2 text-center">
                {notification.id}
              </td>
              <td className="border px-4 py-2 text-center">
                {notification.message}
              </td>
              <td className="border px-4 py-2 text-center">
                {notification.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsPage;
