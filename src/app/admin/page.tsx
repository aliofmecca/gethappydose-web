"use client";

import { useState } from "react";
import { strings } from "@/constants/strings";

interface WaitlistEntry {
  id: string;
  email: string;
  name: string | null;
  source?: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.status === 401) {
        setError(strings.admin.wrongPassword);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || strings.admin.genericError);
        setLoading(false);
        return;
      }

      const json = await res.json();
      setEntries(json.data || []);
      setAuthed(true);
    } catch {
      setError(strings.admin.networkError);
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-background">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 rounded-2xl border border-border bg-surface"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {strings.admin.title}
          </h1>
          <p className="text-sm text-muted mb-6">
            {strings.admin.subtitle}
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={strings.admin.passwordPlaceholder}
            required
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-brand-orange transition-colors"
          />
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full px-4 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? strings.admin.checking : strings.admin.signIn}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <h1 className="text-3xl font-bold text-foreground">
            {strings.admin.waitlistTitle}
          </h1>
          <span className="text-sm text-foreground">
            {entries.length}{" "}
            {entries.length === 1
              ? strings.admin.signup
              : strings.admin.signups}
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="p-10 rounded-2xl border border-border bg-surface text-center">
            <p className="text-muted">{strings.admin.noSignups}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-brand-orange border-b border-brand-orange">
                <tr className="text-left text-xs uppercase tracking-wider text-white">
                  <th className="px-5 py-3 font-semibold">{strings.admin.columnEmail}</th>
                  <th className="px-5 py-3 font-semibold">{strings.admin.columnName}</th>
                  <th className="px-5 py-3 font-semibold">{strings.admin.columnJoined}</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-border last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-5 py-3 text-foreground">{entry.email}</td>
                    <td className="px-5 py-3 text-muted">
                      {entry.name || strings.admin.noName}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
