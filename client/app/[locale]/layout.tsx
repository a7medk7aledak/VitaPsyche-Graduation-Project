import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import "./globals.css";
import AlertBox from "@components/AlertBox";
import { Providers } from "./providers/providers";

import { metaData } from "./metadata";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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

export const metadata = metaData;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Load messages for the current locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="./images/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased  min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {" "}
          <Providers>
            <AlertBox />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
