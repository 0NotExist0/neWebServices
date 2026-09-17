import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5E272",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://newebservices.vercel.app"
  ),
  title: {
    default: "NotExistShoppingPlace | by 0Not_Exist0",
    template: "%s | NotExistShoppingPlace",
  },
  description:
    "Archivio streetwear, capi sartoriali unici e soluzioni web su misura firmate 0Not_Exist0. Sincronizzato con Google Drive ed eBay official merchant newebservices.",
  keywords: [
    "NotExistShoppingPlace",
    "0Not_Exist0",
    "newebservices",
    "streetwear vintage",
    "capi unici",
    "ebay boutique",
    "sviluppo siti web",
    "e-commerce drive",
  ],
  authors: [{ name: "0Not_Exist0" }],
  creator: "0Not_Exist0",
  publisher: "NotExistShoppingPlace",
  icons: {
    icon: '/logo-official.jpg',
    apple: '/logo-official.jpg',
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://newebservices.vercel.app",
    siteName: "NotExistShoppingPlace",
    title: "NotExistShoppingPlace | by 0Not_Exist0",
    description:
      "One Archive, Two Universes: Capi d'archivio esclusivi e sviluppo digitale professionale.",
    images: [
      {
        url: "/logo-official.jpg",
        width: 1200,
        height: 630,
        alt: "Not Exist Online - Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NotExistShoppingPlace | by 0Not_Exist0",
    description: "Capi streetwear unici e servizi web professionali.",
    images: ["/logo-official.jpg"],
  },
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
      <body className="min-h-full flex flex-col bg-[#F5E272] text-[#141414] selection:bg-[#141414] selection:text-[#F5E272]">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
