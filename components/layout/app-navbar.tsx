"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { QrCode, LayoutDashboard, PenTool, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function AppNavbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/generator", label: "Generator", icon: PenTool },
  ];

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <nav aria-label="App navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]"
          >
            <QrCode className="h-6 w-6 text-[var(--color-primary)]" />
            QR-SaaS
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[var(--primary-bg-subtle)] text-[var(--primary-text-emphasis)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => signOut().then(() => window.location.href = "/login")}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
