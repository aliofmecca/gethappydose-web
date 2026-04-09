"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { strings } from "@/constants/strings";
import { renderEmphasis } from "@/lib/text";
import { supabase } from "@/lib/supabase";

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

    const { error } = await supabase
      .from("waitlist")
      .insert({
        email: email.toLowerCase().trim(),
        name: name.trim() || null,
      });

    if (error) {
      // 23505 = Postgres unique constraint violation. The user is already on
      // the list — treat as success and tell them so.
      if (error.code === "23505") {
        setStatus("success");
        setErrorMsg(strings.waitlist.alreadyOnList);
      } else {
        setStatus("error");
        setErrorMsg(strings.waitlist.errorMessage);
      }
    } else {
      setStatus("success");
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50">
        <nav className="flex items-center justify-between px-6 sm:px-8 py-4 max-w-7xl mx-auto w-full">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt={strings.brand.name} width={32} height={32} className="sm:w-9 sm:h-9" />
            <span className="text-lg sm:text-xl font-bold text-foreground">
              {strings.brand.name}
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#how-it-works"
              className="hidden sm:block text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {strings.nav.features}
            </a>
            <ThemeToggle />
            <a
              href="#waitlist"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors whitespace-nowrap"
            >
              {strings.nav.waitlist}
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative px-6 sm:px-8 pt-20 pb-24 bg-background">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
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

          <p className="mt-8 text-lg sm:text-xl text-muted max-w-3xl leading-relaxed">
            {strings.hero.subtitle}
          </p>

          {/* Goal chips — built around what you're actually chasing */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {strings.hero.goalsLabel}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {strings.hero.goals.map((goal) => (
                <span
                  key={goal.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-foreground text-sm font-medium hover:border-brand-orange/50 transition-colors"
                >
                  <span className="text-base">{goal.emoji}</span>
                  {goal.label}
                </span>
              ))}
            </div>
          </div>

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
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {strings.problem.title}
            </h2>
            <p className="text-muted leading-relaxed text-lg">
              {strings.problem.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strings.problem.items.map((item) => (
              <div
                key={item.pain}
                className="p-8 rounded-2xl border border-border bg-surface hover:border-brand-orange/40 transition-colors"
              >
                <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mb-3">
                  The problem
                </p>
                <p className="text-xl font-semibold text-foreground mb-6 leading-snug">
                  {item.pain}
                </p>
                <p className="text-muted text-xs font-semibold uppercase tracking-wider mb-3">
                  How HappyDose fixes it
                </p>
                <p className="text-foreground/85 text-base leading-relaxed">
                  {renderEmphasis(item.solution)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Absorption — "took it ≠ absorbed" pharmacokinetics spotlight.
          Text uses text-inherit so it picks up spotlight-section's color token
          (dark in light mode, cream in dark mode). */}
      <section className="spotlight-section py-32 px-6 sm:px-8 border-y-2 border-brand-orange/30">
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/30 border border-brand-yellow px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-xs font-semibold text-inherit uppercase tracking-wider">
              Pharmacokinetics 101
            </span>
          </div>
          <p className="text-inherit opacity-60 text-xs font-semibold uppercase tracking-widest mb-6">
            {strings.absorption.eyebrow}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-inherit leading-[1.05] mb-8 tracking-tight">
            {strings.absorption.title}
            <br />
            <span className="text-brand-orange italic">
              {strings.absorption.titleHighlight}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-inherit opacity-85 leading-relaxed max-w-4xl mx-auto">
            {renderEmphasis(strings.absorption.body)}
          </p>
        </div>
      </section>

      {/* Reframe — "you're already paying" */}
      <section className="py-24 px-6 sm:px-8 bg-background">
        <div className="max-w-5xl mx-auto text-center">
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
          <p className="text-lg text-foreground/85 leading-relaxed max-w-3xl mx-auto">
            {strings.reframe.body}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="py-24 px-6 sm:px-8 border-t border-border-strong bg-surface-elevated scroll-mt-[74px]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-5">
              {strings.howItWorks.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {strings.howItWorks.title}
            </h2>
            <p className="text-muted leading-relaxed text-lg">
              {strings.howItWorks.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {strings.howItWorks.steps.map((step) => (
              <div key={step.number}>
                <span className="text-brand-orange text-6xl font-bold tracking-tight">
                  {step.number}
                </span>
                <h3 className="text-2xl font-semibold text-foreground mt-5 mb-4 leading-snug">
                  {step.title}
                </h3>
                <p className="text-muted text-base leading-relaxed">
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

{/* Waitlist (final CTA) */}
      <section
        id="waitlist"
        className="py-24 px-6 sm:px-8 border-t border-border-strong bg-background"
      >
        <div className="max-w-2xl mx-auto text-center">
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
      <footer className="border-t border-border py-10 px-6 sm:px-8 bg-surface-elevated">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt={strings.brand.name} width={24} height={24} />
              <span className="text-sm font-semibold text-foreground">
                {strings.brand.name}
              </span>
            </div>
            <p className="text-xs text-muted max-w-sm leading-relaxed">
              {strings.footer.tagline.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-brand-orange">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
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
