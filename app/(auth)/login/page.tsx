"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("[LOGIN] Attempting sign-in...", { email });
      const result = await signIn.email({ email, password });
      console.log("[LOGIN] Result:", JSON.stringify(result));
      if (result.error) {
        setError(result.error.message || "Invalid credentials");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("[LOGIN] Catch error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          minLength={8}
        />

        {error && (
          <div role="alert" className="rounded-lg bg-[var(--error-bg-subtle)] p-3 text-sm text-[var(--color-error)]">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" isLoading={isLoading} className="mt-2 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-[var(--color-primary)] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
