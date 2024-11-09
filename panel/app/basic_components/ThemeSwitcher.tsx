"use client";
import { useEffect, useState } from "react";
import { Brightness7, Brightness4 } from "@mui/icons-material";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light"; // Default to light
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2  rounded-3xl h-10 bg-background flex items-center justify-center hover:bg-foreground hover:text-neutral duration-200"
    >
      {/* Show sun icon (Brightness7) for light theme and moon icon (Brightness4) for dark theme */}
      {theme === "light" ? <Brightness7 /> : <Brightness4 />}
    </button>
  );
};

export default ThemeSwitcher;
