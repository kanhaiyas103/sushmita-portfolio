import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./theme-reference.css";
import "./portfolio.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sushmitananda.com"),
  title: "Sushmita Nanda — Brand Storyteller",
  description:
    "The selected work and storytelling practice of brand storyteller and copywriter Sushmita Nanda.",
  alternates: {
    canonical: "https://sushmitananda.com",
  },
  openGraph: {
    title: "Sushmita Nanda — Brand Storyteller",
    description:
      "Words, ideas and stories that make brands understood, remembered, and felt.",
    type: "website",
    url: "https://sushmitananda.com",
    siteName: "Sushmita Nanda",
    images: [
      {
        url: "https://sushmitananda.com/og.png",
        alt: "Sushmita Nanda — Brand Storyteller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sushmita Nanda — Brand Storyteller",
    description:
      "Words, ideas and stories that make brands understood, remembered, and felt.",
    images: ["https://sushmitananda.com/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
