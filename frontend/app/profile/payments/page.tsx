import React from "react";

const PaymentsListPage = () => {
  // داده‌های استاتیک پرداخت‌ها
  const payments = [
    { id: 1, amount: 150000, date: "1402/01/15", status: "موفق" },
    { id: 2, amount: 200000, date: "1402/02/20", status: "ناموفق" },
    { id: 3, amount: 75000, date: "1402/03/10", status: "موفق" },
    { id: 4, amount: 300000, date: "1402/03/25", status: "موفق" },
    { id: 5, amount: 50000, date: "1402/04/05", status: "ناموفق" },
  ];

  return (
    <div className="h-dvh pt-80">
      <h1 className="text-3xl font-bold text-center mb-4">لیست پرداخت‌ها</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">شناسه</th>
            <th className="border px-4 py-2">مقدار</th>
            <th className="border px-4 py-2">تاریخ</th>
            <th className="border px-4 py-2">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border px-4 py-2 text-center">{payment.id}</td>
              <td className="border px-4 py-2 text-center">
                {payment.amount.toLocaleString()} تومان
              </td>
              <td className="border px-4 py-2 text-center">{payment.date}</td>
              <td className="border px-4 py-2 text-center">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsListPage;
