'use client';

/**
 * Email verification + password reset intermediary page.
 *
 * Why this exists:
 * Supabase's email links redirect the browser from
 *   https://<project>.supabase.co/auth/v1/verify?token=...&redirect_to=<here>
 * to this page with tokens in the URL hash fragment:
 *   https://gethappydose.app/auth/confirm#access_token=xxx&refresh_token=xxx&type=signup
 *
 * The app's custom scheme (gethappydose://) can't be used as a direct redirect_to
 * because:
 *   1. Gmail strips/ignores non-HTTPS links in emails
 *   2. Modern browsers block 302 redirects from HTTPS → custom schemes
 *
 * This page reads the hash fragment and redirects to the app via JS.
 * It also shows a fallback "Open HappyDose" button if the auto-redirect
 * doesn't fire (rare).
 *
 * Supported `type` values from Supabase:
 *   - signup → email verification after registration
 *   - email_change → confirming a new email address from inside the app
 *   - recovery → password reset (deep-link target: gethappydose://reset-password)
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { strings } from "@/constants/strings";

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

function buildDeepLink(hash: string): string | null {
  if (!hash) return null;
  const params = new URLSearchParams(hash.slice(1));
  const type = params.get("type");
  // Recovery links point to a different app path so the app shows the
  // reset-password screen instead of dropping into the tabs.
  const path = type === "recovery" ? "reset-password" : "confirm";
  return `gethappydose://${path}${hash}`;
}

export default function AuthConfirmPage() {
  const hash = useMemo(() => readHash(), []);
  const deepLink = useMemo(() => buildDeepLink(hash), [hash]);
  const [showButton, setShowButton] = useState(!deepLink);

  const handleRedirect = useCallback(() => {
    if (deepLink) {
      window.location.href = deepLink;
    }
  }, [deepLink]);

  useEffect(() => {
    if (!deepLink) return;

    // Try to open the app automatically right after hydration.
    const redirectTimer = setTimeout(handleRedirect, 100);

    // If still here after 2s, surface the manual button as a fallback.
    const fallbackTimer = setTimeout(() => setShowButton(true), 2000);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(fallbackTimer);
    };
  }, [deepLink, handleRedirect]);

  const isRecovery = deepLink?.startsWith("gethappydose://reset-password");
  const heading = showButton
    ? isRecovery
      ? strings.authConfirm.headingRecovery
      : strings.authConfirm.headingVerified
    : strings.authConfirm.headingOpening;
  const body = showButton
    ? deepLink
      ? strings.authConfirm.bodyTapToOpen
      : strings.authConfirm.bodyError
    : strings.authConfirm.bodyAutoRedirect;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#FFF9F5",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "16px", color: "#1A1A1A", fontWeight: 700 }}>
        {heading}
      </h1>
      <p style={{ fontSize: "16px", color: "#6B6B6B", marginBottom: "24px", maxWidth: 360 }}>
        {body}
      </p>
      {showButton && deepLink && (
        <a
          href={deepLink}
          style={{
            display: "inline-block",
            backgroundColor: "#FF6915",
            color: "#FFFFFF",
            padding: "16px 32px",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(255, 105, 21, 0.3)",
          }}
        >
          {strings.authConfirm.openButton}
        </a>
      )}
    </div>
  );
}
