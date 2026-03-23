import {
  Palette,
  QrCode,
  BarChart3,
  Smartphone,
  Download,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Fully customizable",
    description:
      "Choose colors, dot styles, corner shapes, and add your logo. Make every QR code uniquely yours.",
  },
  {
    icon: QrCode,
    title: "Social templates",
    description:
      "12+ ready-made templates for Instagram, TikTok, YouTube, LinkedIn, WhatsApp and more.",
  },
  {
    icon: BarChart3,
    title: "Scan analytics",
    description:
      "Track how many times your QR codes are scanned. See real-time stats on your dashboard.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first preview",
    description:
      "Real-time preview as you design. See exactly what your QR code looks like on any device.",
  },
  {
    icon: Download,
    title: "Multi-format export",
    description:
      "Download as PNG, SVG, or JPEG in any resolution. Perfect for print and digital.",
  },
  {
    icon: Zap,
    title: "Instant generation",
    description:
      "Generate QR codes in milliseconds. No waiting, no loading. Just instant results.",
  },
  {
    icon: Shield,
    title: "Secure & reliable",
    description:
      "Your data is encrypted and your QR codes never expire. Built with security-first design.",
  },
  {
    icon: Globe,
    title: "Short URLs",
    description:
      "Every QR code gets a trackable short URL. Share it anywhere, monitor everything.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-bold text-[var(--text-emphasis)]">
            Everything you need to create perfect QR codes
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            From design to analytics, we&apos;ve got you covered.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="mb-4 inline-flex rounded-lg bg-[var(--primary-bg-subtle)] p-2.5 text-[var(--color-primary)]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
