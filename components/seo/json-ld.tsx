const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://qr-saas.app";

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QR-SaaS",
    url: baseUrl,
    description:
      "Create, customize, and track QR codes with templates for social media, business, and more. Free QR code generator with analytics.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free plan — 10 QR codes, unlimited scans",
      },
      {
        "@type": "Offer",
        price: "9",
        priceCurrency: "USD",
        description:
          "Pro plan — Unlimited QR codes, full customization, advanced analytics",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "9",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        price: "29",
        priceCurrency: "USD",
        description:
          "Business plan — Team collaboration, API access, custom domains",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "29",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      },
    ],
    featureList: [
      "Custom QR code colors and styles",
      "Logo upload on QR codes",
      "12+ social media templates",
      "Scan analytics and tracking",
      "PNG, SVG, JPEG export",
      "Short URL generation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
