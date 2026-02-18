import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "QR 코드 생성기",
  description: "로그인 후 QR 코드를 생성하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={openSans.variable}>
      <body className="min-h-screen bg-background font-sans">
        {children}
      </body>
    </html>
  );
}
