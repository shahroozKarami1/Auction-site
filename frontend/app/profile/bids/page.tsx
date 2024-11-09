import React from "react";

const BidsHistoryPage = () => {
  // داده‌های استاتیک تاریخچه پیشنهادات
  const bidsHistory = [
    {
      id: 1,
      item: "دستبند طلا",
      bidAmount: "5,000,000 تومان",
      date: "1402/01/10",
      status: "برنده",
    },
    {
      id: 2,
      item: "گوشواره الماس",
      bidAmount: "8,500,000 تومان",
      date: "1402/01/15",
      status: "بازنده",
    },
    {
      id: 3,
      item: "ساعت مچی لوکس",
      bidAmount: "10,000,000 تومان",
      date: "1402/01/20",
      status: "برنده",
    },
    {
      id: 4,
      item: "سکه طلا",
      bidAmount: "4,500,000 تومان",
      date: "1402/01/25",
      status: "بازنده",
    },
    {
      id: 5,
      item: "جواهرات عتیقه",
      bidAmount: "12,000,000 تومان",
      date: "1402/02/01",
      status: "برنده",
    },
  ];

  return (
    <div className="h-dvh pt-80">
      <h1 className="text-3xl font-bold text-center mb-4">تاریخچه پیشنهادات</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">شناسه</th>
            <th className="border px-4 py-2">محصول</th>
            <th className="border px-4 py-2">مبلغ پیشنهاد</th>
            <th className="border px-4 py-2">تاریخ</th>
            <th className="border px-4 py-2">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {bidsHistory.map((bid) => (
            <tr key={bid.id}>
              <td className="border px-4 py-2 text-center">{bid.id}</td>
              <td className="border px-4 py-2 text-center">{bid.item}</td>
              <td className="border px-4 py-2 text-center">{bid.bidAmount}</td>
              <td className="border px-4 py-2 text-center">{bid.date}</td>
              <td className="border px-4 py-2 text-center">{bid.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidsHistoryPage;
