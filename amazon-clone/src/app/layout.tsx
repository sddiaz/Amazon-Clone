import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import ProviderWrapper from "./provider";
import Navbar from "./components/Isolated/Navbar/Navbar";
import FirebaseInitializer from "@/lib/firebase/initializer";
import Footer from "./components/Isolated/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "Santiago's Amazon Clone using JAMstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/apple-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <ProviderWrapper>
            <FirebaseInitializer />
            <Navbar />
            {children}
            <Footer />
          </ProviderWrapper>
        </div>
      </body>
    </html>
  );
}
