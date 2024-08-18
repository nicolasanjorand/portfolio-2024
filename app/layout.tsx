import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import SmoothScrolling from "@/components/smoothScroll";
import GrainBackground from "@/components/grain";



const myFont = localFont({ src: '../public/fonts/GeneralSans-Medium.woff2' })

export const metadata: Metadata = {
  title: "Nicolas Anjorand",
  description: "Nicolas ANJORAND's 2024 Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <GrainBackground/>

        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
