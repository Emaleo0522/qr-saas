import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--primary-bg-subtle)] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary-border-subtle)] bg-[var(--primary-bg-subtle)] px-4 py-1.5 text-sm font-medium text-[var(--primary-text-emphasis)]">
            <Sparkles className="h-4 w-4" />
            Free forever for personal use
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2rem,1.5rem+2vw,3.5rem)] font-extrabold leading-tight tracking-tight text-[var(--text-emphasis)]">
            Create stunning QR codes{" "}
            <span className="text-[var(--color-primary)]">in seconds</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-[clamp(1rem,0.9rem+0.35vw,1.25rem)] leading-relaxed text-[var(--text-secondary)]">
            Design custom QR codes with colors, logos, and templates for every
            social platform. Track scans and manage everything from your
            dashboard.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2 px-8">
                Start creating — free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="secondary" size="lg">
                See features
              </Button>
            </Link>
          </div>

          {/* Social proof micro */}
          <p className="mt-8 text-sm text-[var(--text-tertiary)]">
            No credit card required &middot; 10 QR codes free &middot; Unlimited
            scans
          </p>
        </div>
      </div>
    </section>
  );
}
