import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Byteboost Academy - Master Programming Skills",
  description: "Join our comprehensive programming education platform and accelerate your coding journey with expert guidance, AI tools, and a supportive community.",
  keywords: "programming, coding, education, AI tools, web development, software engineering",
  authors: [{ name: "Byteboost Academy" }],
  creator: "Byteboost Academy",
  openGraph: {
    title: "Byteboost Academy - Master Programming Skills",
    description: "Comprehensive programming education platform with AI tools training and community support",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Byteboost Academy - Master Programming Skills",
    description: "Comprehensive programming education platform with AI tools training and community support",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
