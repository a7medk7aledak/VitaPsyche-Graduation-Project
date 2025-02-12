import localFont from "next/font/local";
import "./globals.css";
import AlertBox from "@components/AlertBox";
import { Providers } from "./providers";
// import { useEffect } from "react";
// import { fetchCategories } from "@store/categories/act/actCategories";
// import { useSelector } from "react-redux";
// import { RootState, useAppDispatch } from "@store/store";

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

export const metadata = {
  title: "Vitapsyche",
  description: "Your description here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log("reduring from layout of home page");
  // const { status, categories } = useSelector(
  //   (state: RootState) => state.categories
  // );
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   // Dispatch the fetchCategories action only if categories are not already loaded
  //   if (status === "idle" && !categories.length) {
  //     dispatch(fetchCategories());
  //   }
  // }, [dispatch, status, categories]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./images/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen`}
      >
        <Providers>
          <AlertBox />
          {children}
        </Providers>
      </body>
    </html>
  );
}
