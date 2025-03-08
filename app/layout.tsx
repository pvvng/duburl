import type { Metadata } from "next";
import "./globals.css";
import { Anton } from "next/font/google";
import Script from "next/script";
import Analytics from "@/components/google-analytics";

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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YBC8SJE8NR"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YBC8SJE8NR');
          `,
          }}
        />
      </head>
      <body
        className={`${anton.variable} antialiased dark:bg-neutral-900 dark:text-neutral-300`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
