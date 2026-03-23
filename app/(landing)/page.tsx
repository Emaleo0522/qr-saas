import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { SocialProof } from "@/components/landing/social-proof";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "QR Code Generator — Create Custom QR Codes Free",
  description:
    "Generate beautiful, customizable QR codes with colors, logos, and social media templates. Track scans with built-in analytics. Free forever for personal use.",
  keywords: [
    "QR code generator",
    "custom QR code",
    "QR code with logo",
    "free QR maker",
    "social media QR code",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <Footer />
    </>
  );
}
