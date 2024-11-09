import React from "react";

const ProductsPage = () => {
  // داده‌های استاتیک محصولات حراج
  const products = [
    {
      id: 1,
      name: "دستبند طلا",
      currentBid: "5,000,000 تومان",
      endDate: "1402/01/30",
    },
    {
      id: 2,
      name: "گوشواره الماس",
      currentBid: "8,500,000 تومان",
      endDate: "1402/02/05",
    },
    {
      id: 3,
      name: "ساعت مچی لوکس",
      currentBid: "10,000,000 تومان",
      endDate: "1402/02/10",
    },
    {
      id: 4,
      name: "سکه طلا",
      currentBid: "4,500,000 تومان",
      endDate: "1402/02/15",
    },
    {
      id: 5,
      name: "جواهرات عتیقه",
      currentBid: "12,000,000 تومان",
      endDate: "1402/02/20",
    },
  ];

  return (
    <div className="h-dvh pt-80">
      <h1 className="text-3xl font-bold text-center mb-4">محصولات حراجی</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">شناسه</th>
            <th className="border px-4 py-2">نام محصول</th>
            <th className="border px-4 py-2">مبلغ کنونی پیشنهاد</th>
            <th className="border px-4 py-2">تاریخ پایان</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2 text-center">{product.id}</td>
              <td className="border px-4 py-2 text-center">{product.name}</td>
              <td className="border px-4 py-2 text-center">
                {product.currentBid}
              </td>
              <td className="border px-4 py-2 text-center">
                {product.endDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
