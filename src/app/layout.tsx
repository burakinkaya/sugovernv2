import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuGovern DAO",
  description: "A blockchain dao app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[auto_1fr_auto] relative min-h-screen bg-[#16141D] overflow-x-hidden">
        <Header />
        <main className="w-full flex min-h-screen max-w-full flex-col mt-[86.5px] items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
