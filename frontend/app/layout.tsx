import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "./utils/ReactQueryProvider";
import { AuthProvider } from "./utils/AuthProvider";
import Navbar from "./basic_components/Navbar";
import Footer from "./basic_components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Primus",
  description: "Created By heart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased bg-background `}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <header>
              <Navbar />
            </header>

            <main className="fade-in transition-opacity duration-500 ease-in-out">
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
