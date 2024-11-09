import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/navbar/navbar';
import {SessionProvider} from 'next-auth/react';
import { auth } from "@/auth";
import Header from "@/components/header/Header";
import Script from "next/script";

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
  title: "Oxcel Community",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Navbar />      
        {session && <Header />  }
        {children}
        {/* <Script src="https://cdn.tiny.cloud/1/vkrts1fistxm6f1g7yq0ie63jxnchvrgxlv961doyktk5f4l/tinymce/7/tinymce.min.js" referrerPolicy="origin"></Script>         */}
      </body>
    </html>
    </SessionProvider>
  );
}
