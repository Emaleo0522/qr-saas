import { Star } from "lucide-react";

const stats = [
  { value: "50K+", label: "QR codes created" },
  { value: "10M+", label: "Total scans" },
  { value: "4.9/5", label: "User rating" },
  { value: "99.9%", label: "Uptime" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Manager",
    text: "QR-SaaS made our print campaigns trackable. We can now see exactly which flyers drive the most traffic.",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Restaurant Owner",
    text: "Digital menus were a breeze to set up. Our QR codes match our branding perfectly.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Social Media Creator",
    text: "The social templates are a game-changer. One QR code for all my profiles and it looks amazing.",
    rating: 5,
  },
];

export function SocialProof() {
  return (
    <section className="border-t border-[var(--border-color)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Trusted by thousands of users</h2>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-[var(--text-emphasis)]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-6"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[var(--color-warning)] text-[var(--color-warning)]"
                  />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {t.name}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
