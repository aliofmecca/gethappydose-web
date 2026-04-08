import Link from "next/link";
import { strings } from "@/constants/strings";

export const metadata = {
  title: `${strings.deleteAccount.title} - ${strings.brand.name}`,
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-muted hover:text-foreground text-sm transition-colors"
        >
          {strings.deleteAccount.backToHome}
        </Link>

        <h1 className="text-4xl font-bold text-foreground mt-8 mb-2">
          {strings.deleteAccount.title}
        </h1>
        <p className="text-muted mb-12">{strings.deleteAccount.subtitle}</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {strings.deleteAccount.inAppHeading}
            </h2>
            <p>{strings.deleteAccount.inAppIntro}</p>
            <ol className="list-decimal pl-6 mt-3 space-y-1">
              {strings.deleteAccount.inAppSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3">{strings.deleteAccount.inAppFooter}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {strings.deleteAccount.emailHeading}
            </h2>
            <p>{strings.deleteAccount.emailIntro}</p>
            <p className="mt-3">
              <a
                href={`mailto:${strings.deleteAccount.emailPrimary}?subject=Account%20Deletion%20Request`}
                className="text-brand-orange hover:underline"
              >
                {strings.deleteAccount.emailPrimary}
              </a>{" "}
              or{" "}
              <a
                href={`mailto:${strings.deleteAccount.emailAlt}?subject=Account%20Deletion%20Request`}
                className="text-brand-orange hover:underline"
              >
                {strings.deleteAccount.emailAlt}
              </a>
            </p>
            <p className="mt-3">{strings.deleteAccount.emailFooter}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {strings.deleteAccount.whatGetsDeletedHeading}
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              {strings.deleteAccount.whatGetsDeleted.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {strings.deleteAccount.retentionHeading}
            </h2>
            <p>{strings.deleteAccount.retentionBody}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
