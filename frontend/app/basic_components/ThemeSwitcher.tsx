"use client";
import { useEffect, useState } from "react";
import { Brightness7, Brightness4 } from "@mui/icons-material";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
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
      className=" rounded-full h-10 w-10 bg-box text-tbox flex items-center justify-center hover:bg-background hover:text-foreground duration-200"
    >
      {theme === "light" ? <Brightness7 /> : <Brightness4 />}
    </button>
  );
};

export default ThemeSwitcher;
