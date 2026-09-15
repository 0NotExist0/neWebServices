import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NotExistShoppingPlace | Negozio Vestiti & Moda by 0Not_Exist0",
  description: "E-commerce ufficiale NotExistShoppingPlace by 0Not_Exist0, sincronizzato in tempo reale con Google Drive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900 selection:bg-amber-200 selection:text-neutral-900">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
