import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "./utils/ReactQueryProvider";
import { AuthProvider } from "./utils/AuthProvider";
import ProtectedRoute from "./utils/ProtectedRoute";
import ClientLayout from "./ClientLayout";

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
  title: "Primus Admin Panel",
  description: "Created by heart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <ProtectedRoute>
              <ClientLayout>{children}</ClientLayout>
            </ProtectedRoute>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
