import type { Metadata } from "next";
import "./globals.css";
import { Anton } from "next/font/google";

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
      <body
        className={`${anton.variable} antialiased dark:bg-neutral-900 dark:text-neutral-300`}
      >
        {children}
      </body>
    </html>
  );
}
