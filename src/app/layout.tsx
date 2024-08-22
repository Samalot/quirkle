import type { Metadata } from "next";
import Image from "next/image";
import StoreProvider from '../lib/StoreProvider';
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quirkle",
  description: "Which person is the odd one out?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col items-center`}>
        <StoreProvider>
          <header className=" p-10 flex flex-row justify-center" data-testid="layout">
            <h1 className="font-bold text-5xl inline-block">Quirkle</h1>
          </header>

          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
