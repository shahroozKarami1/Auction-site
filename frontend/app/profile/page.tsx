"use client";

import React, { useState } from "react";
import { useAuth } from "../utils/AuthProvider"; // Adjust path as per your setup
import api from "../utils/axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    avatar: user?.avatar || "",
    country: user?.country || "",
    city: user?.city || "",
  });
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center">You need to log in to view this page.</div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("city", formData.city);

      if (file) {
        formDataToSend.append("avatar", file);
      }

      const response = await api.put("/profile/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      {/* Profile Section */}
      <section className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg md:mt-80 mt-28">
        <div className="flex flex-col items-center">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : user.avatar || "/images/default-avatar.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 border border-gray-200 shadow-md"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.first_name || "First Name"} {user?.last_name || "Last Name"}
          </h1>
          <p className="text-md text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-400">
            {user?.country}, {user?.city}
          </p>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Edit Profile Section */}
        {editMode && (
          <div className="mt-6">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              placeholder="Country"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              placeholder="City"
            />
            <input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={handleFileChange}
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Toggle Edit Mode */}
        <button
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </section>

      {/* User Score Section */}
      <section className="mt-8 p-4 text-center w-full max-w-lg">
        <h2 className="text-sm text-gray-500">Your Score:</h2>
        <p className="text-2xl font-bold text-gray-800">{user?.score || 0}</p>
      </section>

      {/* Menu Section with 3 Buttons */}
      <nav className="w-full max-w-lg p-6 mt-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => router.push("/profile/bids")}
            className="p-2 text-center rounded bg-blue-100 hover:bg-blue-200 transition"
          >
            Bids History
          </button>
          <button
            onClick={() => router.push("/profile/payments")}
            className="p-2 text-center rounded bg-blue-100 hover:bg-blue-200 transition"
          >
            Payments History
          </button>
          <button
            onClick={() => router.push("/profile/auctions")}
            className="p-2 text-center rounded bg-blue-100 hover:bg-blue-200 transition"
          >
            My Auctions
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProfilePage;
