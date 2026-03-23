import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for personal use",
    features: [
      "10 QR codes",
      "Unlimited scans",
      "Basic customization",
      "PNG download",
      "Scan tracking",
    ],
    cta: "Get started",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For creators and small businesses",
    features: [
      "Unlimited QR codes",
      "Unlimited scans",
      "Full customization",
      "PNG, SVG, JPEG export",
      "Advanced analytics",
      "Logo upload",
      "Social templates",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    description: "For teams and enterprises",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "API access",
      "Custom domains",
      "Bulk generation",
      "White-label QR codes",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    href: "/register",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-bold text-[var(--text-emphasis)]">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Start free, upgrade when you need more.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-[var(--color-primary)] bg-[var(--bg-primary)] shadow-lg ring-1 ring-[var(--color-primary)]"
                  : "border-[var(--border-color)] bg-[var(--bg-primary)]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {plan.description}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--text-emphasis)]">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[var(--text-tertiary)]">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="mb-8 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-[var(--color-success)]" />
                    <span className="text-[var(--text-secondary)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button
                  variant={plan.highlighted ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
