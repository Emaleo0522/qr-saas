import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/lib/providers";
import { WebsiteJsonLd } from "@/components/seo/json-ld";
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
  title: {
    default: "QR-SaaS — Generate Beautiful QR Codes",
    template: "%s | QR-SaaS",
  },
  description:
    "Create, customize, and track QR codes with templates for social media, business, and more. Free QR code generator with analytics.",
  keywords: [
    "QR code generator",
    "custom QR code",
    "QR code maker",
    "social media QR",
    "QR analytics",
    "free QR code",
  ],
  authors: [{ name: "QR-SaaS" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "QR-SaaS",
    title: "QR-SaaS — Generate Beautiful QR Codes",
    description:
      "Create, customize, and track QR codes with templates for social media, business, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR-SaaS — Generate Beautiful QR Codes",
    description:
      "Create, customize, and track QR codes with templates for social media, business, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-nav">
          Skip to content
        </a>
        <WebsiteJsonLd />
        <Providers>
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
