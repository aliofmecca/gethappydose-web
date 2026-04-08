import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";
import { strings } from "@/constants/strings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(strings.brand.url),
  title: strings.meta.title,
  description: strings.meta.description,
  keywords: [
    "supplement tracker",
    "supplement app",
    "supplement protocol",
    "absorption",
    "supplement reminder",
    "vitamin tracker",
    "stack tracker",
    "biohacking",
    "health tracker",
    "supplement compliance",
  ],
  authors: [{ name: strings.brand.name }],
  creator: strings.brand.name,
  publisher: strings.brand.name,
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: strings.meta.title,
    description: strings.meta.ogDescription,
    url: strings.brand.url,
    siteName: strings.brand.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: strings.meta.title,
    description: strings.meta.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
