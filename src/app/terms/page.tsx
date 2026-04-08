import Link from "next/link";
import { strings } from "@/constants/strings";

export const metadata = {
  title: `${strings.terms.title} - ${strings.brand.name}`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-muted hover:text-foreground text-sm transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mt-8 mb-2">
          {strings.terms.title}
        </h1>
        <p className="text-muted mb-12">
          Last updated: {strings.terms.lastUpdated}
        </p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          {strings.terms.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
              {"body" in section && section.body && <p>{section.body}</p>}
              {"intro" in section && section.intro && <p>{section.intro}</p>}
              {"list" in section && section.list && (
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {"contactEmail" in section && section.contactEmail && (
                <p>
                  {"contactIntro" in section && section.contactIntro}{" "}
                  <a
                    href={`mailto:${section.contactEmail}`}
                    className="text-brand-orange hover:underline"
                  >
                    {section.contactEmail}
                  </a>
                  {"contactEmailAlt" in section && section.contactEmailAlt && (
                    <>
                      {" "}or{" "}
                      <a
                        href={`mailto:${section.contactEmailAlt}`}
                        className="text-brand-orange hover:underline"
                      >
                        {section.contactEmailAlt}
                      </a>
                    </>
                  )}
                  .
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
