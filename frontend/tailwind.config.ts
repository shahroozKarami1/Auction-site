import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        light: "url('/img/light.jpg')",
        dark: "url('/img/dark.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        box: "var(--box)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        neutral: "var(--neutral)",
        text: "var(--text)",
        tbox: "var(--text-box)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
export default config;
