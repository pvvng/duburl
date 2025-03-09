import type { Metadata } from "next";
import "./globals.css";
import { Anton } from "next/font/google";
import Script from "next/script";
import Analytics from "@/components/google-analytics";
import Footer from "@/components/footer";

const anton = Anton({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--anton-text",
});

export const metadata: Metadata = {
  title: {
    template: "%s | duburl",
    default: "duburl",
  },
  description: "URL 단축 서비스를 무료로 사용해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7034464923554278" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7034464923554278"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YBC8SJE8NR"
        ></script>
      </head>
      <body
        className={`${anton.variable} antialiased dark:bg-neutral-900 dark:text-neutral-300`}
      >
        <Analytics />
        {children}
        <Footer />
      </body>
    </html>
  );
}
