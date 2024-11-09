"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

const userSchema = z.object({
  phone: z.string().max(15).nonempty("Phone number is required"),
  email: z.string().email("Invalid email format").optional(),
  first_name: z.string().max(250).optional(),
  last_name: z.string().max(250).optional(),
  user_type: z.enum(["real", "legal"]),
  avatar: z.instanceof(File).optional(),
  national_id_image: z.instanceof(File).optional(),
  country: z.string().max(250).optional(),
  province: z.string().max(250).optional(),
  city: z.string().max(250).optional(),
  address: z.string().optional(),
  postal_code: z.string().max(250).optional(),
  age: z.number().int().min(0).max(120).optional(),
  gender: z.enum(["male", "female", "non_binary"]).optional(),
  status: z.enum(["not_verified", "verified", "banned"]).optional(),
  score: z.number().int().nonnegative().optional(),
  is_admin: z.boolean().optional(),
  is_manager: z.boolean().optional(),
  is_active: z.boolean().optional(),
});

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fileAvatar, setFileAvatar] = useState(null);
  const [fileNationalIdImage, setFileNationalIdImage] = useState(null);

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 overflow-y-auto">
      <h1 className="text-2xl mb-4">Create User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Information Section */}
        <h2 className="text-xl mt-6 mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-neutral mb-2">
              Phone Number *
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-neutral mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="text-neutral mb-2">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="last_name" className="text-neutral mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              {...register("last_name")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="user_type" className="text-neutral mb-2">
            User Type
          </label>
          <select
            id="user_type"
            {...register("user_type")}
            className="bg-background border border-neutral-light rounded-lg p-3"
          >
            <option value="real">Real</option>
            <option value="legal">Legal</option>
          </select>
        </div>

        {/* Address Information Section */}
        <h2 className="text-xl mt-6 mb-4">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="country" className="text-neutral mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="province" className="text-neutral mb-2">
              Province
            </label>
            <input
              type="text"
              id="province"
              {...register("province")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="text-neutral mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="text-neutral mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address")}
            className="bg-background border border-neutral-light rounded-lg p-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="postal_code" className="text-neutral mb-2">
              Postal Code
            </label>
            <input
              type="text"
              id="postal_code"
              {...register("postal_code")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="text-neutral mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age")}
              className="bg-background border border-neutral-light rounded-lg p-3"
              min="0"
            />
          </div>
        </div>

        {/* Gender and Status Section */}
        <h2 className="text-xl mt-6 mb-4">Gender and Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-neutral mb-2">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="text-neutral mb-2">
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="bg-background border border-neutral-light rounded-lg p-3"
            >
              <option value="not_verified">Not Verified</option>
              <option value="verified">Verified</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        {/* Admin and Manager Section */}
        <h2 className="text-xl mt-6 mb-4">User Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_admin"
              {...register("is_admin")}
              className="mr-2"
            />
            <label htmlFor="is_admin" className="text-neutral">
              Is Admin
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_manager"
              {...register("is_manager")}
              className="mr-2"
            />
            <label htmlFor="is_manager" className="text-neutral">
              Is Manager
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              {...register("is_active")}
              className="mr-2"
              defaultChecked
            />
            <label htmlFor="is_active" className="text-neutral">
              Is Active
            </label>
          </div>
        </div>

        {/* File Upload Section */}
        <h2 className="text-xl mt-6 mb-4">File Uploads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="avatar" className="text-neutral mb-2">
              Avatar Image
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(e) => setFileAvatar(e.target.files[0])}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="national_id_image" className="text-neutral mb-2">
              National ID Image
            </label>
            <input
              type="file"
              id="national_id_image"
              accept="image/*"
              onChange={(e) => setFileNationalIdImage(e.target.files[0])}
              className="bg-background border border-neutral-light rounded-lg p-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
