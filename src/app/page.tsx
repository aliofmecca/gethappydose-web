"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { strings } from "@/constants/strings";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    // TODO: Connect to Supabase once the waitlist table is provisioned.
    // Mirror the binate-web pattern:
    //
    //   const { error } = await supabase
    //     .from("waitlist")
    //     .insert({ email: email.toLowerCase().trim(), name: name.trim() || null });
    //
    //   if (error) {
    //     if (error.code === "23505") { setStatus("success"); setErrorMsg(strings.waitlist.alreadyOnList); }
    //     else { setStatus("error"); setErrorMsg(strings.waitlist.errorMessage); }
    //   } else {
    //     setStatus("success");
    //   }
    //
    // For now we fake the success state so the form is fully usable in dev.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50">
        <nav className="flex items-center justify-between px-6 sm:px-8 py-4 max-w-6xl mx-auto w-full">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt={strings.brand.name} width={36} height={36} />
            <span className="text-xl font-bold text-foreground">
              {strings.brand.name}
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#how-it-works"
              className="hidden sm:block text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {strings.nav.features}
            </a>
            <ThemeToggle />
            <a
              href="#waitlist"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              {strings.nav.waitlist}
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative px-6 sm:px-8 pt-20 pb-24 bg-background">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/30 border border-brand-yellow px-4 py-1.5 rounded-full mb-8">
            <span className="text-xs font-semibold text-foreground">
              ✨ {strings.hero.badge}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
            {strings.hero.titleBefore}{" "}
            <span className="text-brand-orange">
              {strings.hero.titleHighlight}
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-muted max-w-2xl leading-relaxed">
            {strings.hero.subtitle}
          </p>

          {/* Inline email capture */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-md flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder={strings.hero.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "success"}
              className="flex-1 px-5 py-3.5 rounded-full bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-semibold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-brand-orange/30 disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading"
                ? strings.waitlist.submitting
                : status === "success"
                  ? "✓ You're in"
                  : strings.hero.cta}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-3 text-sm text-muted">
              {strings.waitlist.successMessage}
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-500">
              {errorMsg || strings.waitlist.errorMessage}
            </p>
          )}
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-24 px-6 sm:px-8 border-t border-border-strong bg-surface-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {strings.problem.title}
            </h2>
            <p className="text-muted leading-relaxed">
              {strings.problem.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strings.problem.items.map((item) => (
              <div
                key={item.pain}
                className="p-7 rounded-2xl border border-border bg-surface hover:border-brand-orange/40 transition-colors"
              >
                <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mb-3">
                  The problem
                </p>
                <p className="text-lg font-semibold text-foreground mb-5 leading-snug">
                  {item.pain}
                </p>
                <p className="text-muted text-xs font-semibold uppercase tracking-wider mb-3">
                  How HappyDose fixes it
                </p>
                <p className="text-foreground/85 text-sm leading-relaxed">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reframe — "you're already paying" */}
      <section className="py-24 px-6 sm:px-8 border-t border-border-strong bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-5">
            {strings.reframe.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mb-6">
            {strings.reframe.title}
            <br />
            <span className="text-brand-orange">
              {strings.reframe.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-foreground/85 leading-relaxed max-w-2xl mx-auto">
            {strings.reframe.body}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="py-24 px-6 sm:px-8 border-t border-border-strong bg-surface-elevated"
      >
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {strings.howItWorks.title}
            </h2>
            <p className="text-muted leading-relaxed">
              {strings.howItWorks.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {strings.howItWorks.steps.map((step) => (
              <div key={step.number}>
                <span className="text-brand-orange text-5xl font-bold tracking-tight">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-foreground mt-4 mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
        FEATURES SECTION — DEFERRED.
        Once the MVP is built and we have screenshots, populate
        strings.features in src/constants/strings.ts and render
        a feature grid here (icon, title, description per card).
      */}

      {/* Manifesto */}
      <section className="py-28 px-6 sm:px-8 border-t border-border-strong bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-6">
            {strings.manifesto.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.15] mb-8">
            {strings.manifesto.titleLines.map((line, i) => (
              <span key={i} className="block">
                {i === 1 || i === 3 ? (
                  <span className="text-brand-orange">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            {strings.manifesto.body}
          </p>
        </div>
      </section>

      {/* Waitlist (final CTA) */}
      <section
        id="waitlist"
        className="py-24 px-6 sm:px-8 border-t border-border-strong bg-surface-elevated"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {strings.waitlist.title}
          </h2>
          <p className="text-muted mb-10 leading-relaxed">
            {strings.waitlist.subtitle}
          </p>

          {status === "success" ? (
            <div className="p-6 rounded-2xl border border-brand-orange/30 bg-brand-orange/5">
              <p className="text-foreground text-lg font-medium">
                {errorMsg || strings.waitlist.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder={strings.waitlist.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-brand-orange transition-colors"
              />
              <input
                type="email"
                placeholder={strings.waitlist.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-5 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold transition-colors disabled:opacity-50"
              >
                {status === "loading"
                  ? strings.waitlist.submitting
                  : strings.waitlist.submitButton}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-sm">{errorMsg}</p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt={strings.brand.name} width={24} height={24} />
              <span className="text-sm font-semibold text-foreground">
                {strings.brand.name}
              </span>
            </div>
            <p className="text-xs text-muted max-w-sm">
              {strings.footer.tagline}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-muted md:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                {strings.footer.privacyPolicy}
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                {strings.footer.termsOfService}
              </Link>
              <Link
                href="/delete-account"
                className="hover:text-foreground transition-colors"
              >
                {strings.footer.deleteAccount}
              </Link>
            </div>
            <span className="text-xs">
              {strings.footer.copyright(new Date().getFullYear())}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
