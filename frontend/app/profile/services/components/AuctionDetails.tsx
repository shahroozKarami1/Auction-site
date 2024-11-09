import React, { useState } from "react";

interface AuctionDetailsProps {
  onDetailsSubmit: (details: {
    name: string;
    description: string;
    startPrice: number;
    country: string;
    province: string;
    city: string;
  }) => void;
}

const AuctionDetails: React.FC<AuctionDetailsProps> = ({ onDetailsSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startPrice, setStartPrice] = useState<number>(0);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="mb-4">
      <label className="block text-right mb-2">نام محصول:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />

      <label className="block text-right mt-4 mb-2">توضیحات:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <label className="block text-right mt-4 mb-2">قیمت شروع:</label>
      <input
        type="number"
        value={startPrice}
        onChange={(e) => setStartPrice(Number(e.target.value))}
        className="border p-2 w-full"
      />

      <label className="block text-right mt-4 mb-2">کشور:</label>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border p-2 w-full"
      />

      <label className="block text-right mt-4 mb-2">استان:</label>
      <input
        type="text"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className="border p-2 w-full"
      />

      <label className="block text-right mt-4 mb-2">شهر:</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 w-full"
      />
    </div>
  );
};

export default AuctionDetails;
