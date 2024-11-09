"use client";

import { useState } from "react";
import Link from "next/link";
import { useUsers } from "../hooks/useUsers";
import {
  Add,
  CalendarMonth,
  Cancel,
  CheckCircle,
  Pending,
  Remove,
} from "@mui/icons-material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";

const UserList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useUsers(page);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users.</p>;

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto p-12 px-14 space-y-8">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div
            onClick={() => router.push("/users/create")}
            className="bg-foreground text-neutral  p-2 px-4 pr-5  rounded-3xl cursor-pointer text-center items-center flex space-x-1"
          >
            <Add className="ml-0" />
            <p>Create New User</p>
          </div>

          <div className="flex items-center space-x-2 ml-4 w-96 ">
            <input
              type="text"
              placeholder="search..."
              className="bg-background border border-neutral-light rounded-3xl p-2 px-6 w-full focus:outline-none  focus:ring-primary focus:ring-2 focus:border-transparent duration-100"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="flex items-center space-x-2 w-40 bg-background border border-neutral-light rounded-3xl p-2 px-4 duration-100">
            <CalendarMonth />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="  w-full bg-inherit"
              placeholderText="Select Date"
            />
          </div>

          <div className="flex items-center space-x-2 ">
            <select className="bg-background border border-neutral-light rounded-3xl p-2 px-4 w-full duration-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">Select Filter</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </div>
      <table className="min-w-full table-auto ">
        <thead className="">
          <tr className="text-left">
            <th className="py-2 px-4 border-b border-border">Id</th>
            <th className="py-2 px-4 border-b border-border">Name</th>
            <th className="py-2 px-4 border-b border-border">Last name</th>
            <th className="py-2 px-4 border-b border-border">Phone</th>
            <th className="py-2 px-4 border-b border-border">status</th>
            <th className="py-2 px-4 border-b border-border">score</th>
            <th className="py-2 px-4 border-b border-border">Type</th>
            <th className="py-2 px-4 border-b border-border"></th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((user: any) => (
            <tr key={user.id} className="text-left">
              <td className="py-2 px-4 border-b ">{user.id}</td>
              <td className="py-2 px-4 border-b ">{user.first_name}</td>
              <td className="py-2 px-4 border-b ">{user.last_name}</td>
              <td className="py-2 px-4 border-b ">{user.phone}</td>
              <td className="py-2 px-4 border-b space-x-2 flex flex-row">
                {user.status == "not_verified" ? (
                  <Pending />
                ) : user.status == "verified" ? (
                  <CheckCircle />
                ) : user.status == "banned" ? (
                  <Cancel />
                ) : (
                  <></>
                )}
                <p>{user.status}</p>
              </td>
              <td className="py-2 px-4 border-b">{user.score}</td>
              {user.is_manager ? (
                <td className="py-2 px-4 border-b text-yellow-300"> Manager</td>
              ) : user.is_admin ? (
                <td className="py-2 px-4 border-b text-sky-400">Admin</td>
              ) : (
                <td className="py-2 px-4 border-b">User</td>
              )}

              <td className="py-2 px-4 border-b">
                <Link
                  href={`/users/${user.id}`}
                  className=" border-2 hover:border-border border-white/40 rounded-full py-0 px-2 duration-200"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
