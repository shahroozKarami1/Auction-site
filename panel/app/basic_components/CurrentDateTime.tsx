"use client";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Import the Calendar icon

import React, { useEffect, useState } from "react";

const CurrentDateTime = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      // Get the current year, month, and date in Persian
      const persianDateFormatter = new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const formattedDate = persianDateFormatter.format(now);

      // Convert the formatted date from Persian to English numerals
      const englishDate = formattedDate.replace(/[۰-۹]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 1728);
      });

      setCurrentDate(englishDate);
    };

    updateDate(); // Get initial date
    const intervalId = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <div className="p-2 px-4 rounded-3xl h-10 border-2 border-background text-black  flex items-center space-x-2">
      <div className="flex flex-row items-start space-y-1 space-x-2 text-center justify-center ">
        <span
          className=""
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          {currentDate}
        </span>
      </div>
    </div>
  );
};

export default CurrentDateTime;
