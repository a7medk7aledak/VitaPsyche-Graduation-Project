// استيراد جميع العناصر المطلوبة
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AlertBox from "@components/AlertBox";

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
  title: "Vitapsyche",
  description:
    "The project aims to develop a comprehensive platform for assessing and analyzing psychological disorders and mental health issues using artificial intelligence technologies, such as a Chatbot, alongside specialized psychological tests. The platform will feature the ability to communicate with psychiatric specialists online, book consultation sessions, and sell mental health-related products and medications. Additionally, the platform will include various services such as doctor searches, personalized doctor recommendations, an integrated chat system for doctor consultations, a section for selling products and medications, and scientific articles that support mental health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./images/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen`}
      >
        {/* إضافة AlertBox هنا */}
        <AlertBox />
        {children}
      </body>
    </html>
  );
}
