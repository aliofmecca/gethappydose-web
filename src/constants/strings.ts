/**
 * Centralized string constants for the HappyDose landing page
 * Mirrors binate-app pattern: all user-facing text lives here
 */

export const strings = {
  // Brand
  brand: {
    name: "HappyDose",
    tagline: "The supplement compliance app",
    supportEmail: "elhussali@gmail.com",
    privacyEmail: "privacy@gethappydose.app",
    legalEmail: "legal@gethappydose.app",
    url: "https://gethappydose.app",
  },

  // Navigation
  nav: {
    features: "How it works",
    waitlist: "Get Early Access",
  },

  // Hero
  hero: {
    badge: "Coming soon — be the first inside",
    titleBefore: "Finally feel what your supplements",
    titleHighlight: "were supposed to do.",
    subtitle:
      "Most people throw a handful of pills down their throat and hope for the best. HappyDose turns your daily ritual into an absorption-aware, results-aware routine — built around how your body actually works, what your supplements do to each other, and what your blood tests are trying to tell you.",
    cta: "Get Early Access",
    emailPlaceholder: "Your email",
  },

  // Problem section
  problem: {
    title: "You're not lazy. You were just never told the truth.",
    subtitle:
      "Nobody handed you a manual when you walked out of the supplement aisle. So you did what everyone does: bought five bottles, took them for two weeks, lost the rhythm, and quietly added \"figure it out later\" to a list that never gets shorter. Here's what's actually going wrong.",
    items: [
      {
        pain: "You're shoving handfuls of pills down your throat and calling it \"taking supplements.\"",
        solution:
          "Newsflash: half the things in your morning stack are at war with each other. Zinc and calcium cancel each other out at the gut wall. Iron and coffee? You just paid for an expensive placebo. Magnesium thrown in with the wrong crowd? Same deal. HappyDose catches the fight the moment you add a new supplement and tells you exactly when (and what) to take it with — so the money you spent actually shows up in your bloodstream, not your urine.",
      },
      {
        pain: "You started vitamin D in November. It's now April. Are you better? You have no idea.",
        solution:
          "How long until it works? What does \"working\" even feel like? Should you take a break in summer? Should it show up on a blood test, or just in your mood at 4pm on a Tuesday? You can't answer any of this — because you've been guessing the whole time. HappyDose builds you a real timeline of every dose, every skip, every blood marker, and every week you felt off — until \"is it working?\" becomes a question with an actual answer.",
      },
      {
        pain: "Those half-empty bottles in your cabinet are doing more damage than you think.",
        solution:
          "It's not just wasted money and shelf space. Every abandoned bottle is a tiny, daily reminder that you started something and quit. Every cycle you stopped cold-turkey may have actually made things worse. Every time you walked past that drawer and looked away, the shadow got a little longer — and shadows in one part of your life have a way of crawling into the others. We're not here to add another guilt trip to your morning. We're here to make consistency the easiest thing you do all day, so the bottles run out the way they're supposed to: empty, on schedule, and replaced with another one.",
      },
    ],
  },

  // Mid-page reframe section (Option 3 — loss aversion / "you already paid")
  reframe: {
    eyebrow: "The math nobody does",
    title: "You're already paying for results.",
    titleHighlight: "It's time to actually get them.",
    body:
      "The average serious supplement buyer spends between $80 and $300 a month on bottles that never reach their bloodstream. Yes — inside the body doesn't mean absorbed. Pills can pass through you completely undigested, blocked by the wrong food, the wrong timing, or the wrong neighbor in the same dose. You wouldn't buy a gym membership and never go. You wouldn't order food and throw half of it in the bin. Stop doing it with the supplements you already swiped your card for.",
  },

  // How it works
  howItWorks: {
    title: "Three things we do that nobody else does properly.",
    subtitle:
      "We didn't build another reminder app. We built the thing your bottles wish came in the box — a real method, designed around your body, your blood tests, and your doctor. Not a replacement for any of them. The missing layer between all three.",
    steps: [
      {
        number: "01",
        title: "We turn your shelf into a stack that actually makes sense.",
        description:
          "Scan each bottle once or add it by hand. We pull the manufacturer's dosage and timing instantly, then ask the things you'd never think to ask yourself: Did your doctor say something different? Should this be on an empty stomach? Away from your coffee? Away from the calcium in your yogurt? In thirty seconds it stops being a pile of bottles and starts being a protocol.",
      },
      {
        number: "02",
        title: "Our BETA-AI watches every dose and tells you the truth.",
        description:
          "This isn't a calendar app with a robot voice. Our in-app AI (in active beta with early users) flags interactions in real time, suggests better timings as your stack grows, and notices the patterns you'd miss — like \"you've felt foggy on every day you took X within two hours of bed.\" It learns from how you actually live, and it never lies to make you feel good. If something isn't working, it'll say so.",
      },
      {
        number: "03",
        title: "We complete your doctor's plan. We don't replace it.",
        description:
          "Your physician has the final word, and your blood tests are the source of truth. Always. HappyDose logs your doctor's recommendations as a named profile, respects every override they give you, and turns your daily intake into a doctor-readable timeline you can hand them at your next appointment. We are the layer between the prescription pad and the kitchen counter — not a competitor to either.",
      },
    ],
  },

  // Features section — DEFERRED until we have app screenshots and real visuals.
  // When the MVP is built, populate this with feature cards (icon, title, description)
  // and render them on the page. For now this section is intentionally omitted.
  features: null,

  // Closing pitch (replaces the "quote" section — this is HappyDose's manifesto)
  manifesto: {
    eyebrow: "What this app actually believes",
    titleLines: [
      "Taking your supplements",
      "is the part you already paid for.",
      "Getting results from them",
      "is the part everyone skips.",
    ],
    body:
      "You wouldn't take a course and never finish it. You wouldn't sign up for the gym and never go. But every year, billions of dollars in supplements rot in medicine cabinets — bought with intention, abandoned without a system. HappyDose is for people who are done buying hope and ready to buy a method. One that respects the doctor who prescribed it, the blood tests that prove it, and the body that has to live with it.",
  },

  // Waitlist
  waitlist: {
    title: "Founding members get in first. And stay in cheaper. Forever.",
    subtitle:
      "We're letting in a small batch of early users before public launch. If you're on the list, you get: first access the moment we open the doors, a permanent founding-member discount that nobody after you will ever see again, direct line to us while we shape the BETA-AI around real users, and the chance to help build the supplement app that should have existed years ago. No spam. No fluff. Just the email that says \"you're in.\"",
    namePlaceholder: "Your name (optional)",
    emailPlaceholder: "Your email",
    submitButton: "Claim My Spot",
    submitting: "Joining...",
    successMessage: "You're in. Welcome to the inside. We'll be in touch soon.",
    alreadyOnList: "You're already on the list — and your spot is safe.",
    errorMessage: "Something went wrong. Please try again.",
  },

  // Footer
  footer: {
    tagline: "For the ones who are done pretending the bottle on the shelf is doing the work.",
    copyright: (year: number) =>
      `\u00A9 ${year} HappyDose. All rights reserved.`,
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    deleteAccount: "Delete Account",
  },

  // Meta / SEO
  meta: {
    title: "HappyDose — Actually take your supplements correctly",
    description:
      "Stop forgetting. Stop mixing the wrong things. Stop buying bottles you never finish. HappyDose is the supplement system that turns intention into measurable results.",
    ogDescription:
      "The supplement compliance app for people who are done buying hope.",
  },

  // Privacy Policy
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "April 8, 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: null,
        intro: "We collect the following information when you use HappyDose:",
        list: [
          "Account information: email address, name, and profile details when you sign in (via Apple, Google, or email)",
          "Supplement stack data: the supplements you add, dosages, timing, meal context, and notes",
          "Intake logs: when you took each dose, whether you took it on time, deferred it, or missed it",
          "Doctor profile data: any doctor names, recommendation dates, and overrides you choose to log",
          "Health context (optional): goal, experience level, and biometrics (age, weight, height, sex) if you provide them",
          "Blood test uploads (optional, V2 feature): any test results you choose to upload for AI-assisted observations",
          "Waitlist information: email address and name if you join our waitlist before launch",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: null,
        intro: "We use the information we collect to:",
        list: [
          "Provide and personalize the HappyDose app experience",
          "Send reminders and notifications for your scheduled supplement doses",
          "Calculate consistency scores, streaks, and pattern insights from your intake history",
          "Detect supplement interaction conflicts and warn you in real time",
          "Process payments and manage your subscription",
          "Improve the product based on aggregated, anonymized usage data",
          "Communicate with you about product updates and account-related notices",
        ],
      },
      {
        heading: "3. Health Data & Sensitivity",
        body: "HappyDose collects information that could be considered health data — including supplements you take, when you take them, and any optional biometrics or blood test results you upload. We treat this information with elevated care: it is encrypted in transit and at rest, never sold, and never shared with advertisers. HappyDose is not a medical device and does not provide medical advice.",
      },
      {
        heading: "4. Data Storage",
        body: "Your data is stored securely using Supabase, which provides enterprise-grade security with row-level security (RLS) policies and encrypted connections. Reminder schedules and intake logs may also be stored locally on your device using encrypted storage so the app works offline. Your data is hosted in data centers that comply with industry security standards.",
      },
      {
        heading: "5. Third-Party Services",
        body: null,
        intro: "We use the following third-party services to operate HappyDose:",
        list: [
          "Supabase: database, authentication, and file storage",
          "Apple & Google: optional one-tap sign-in providers",
          "Stripe / RevenueCat: payment processing and subscription management (we never store your card details)",
          "Sentry: error tracking and performance monitoring",
          "PostHog: product analytics (opt-out available; no personally identifying info is shared)",
          "Resend: transactional email delivery",
          "Expo: app build, push notification delivery, and over-the-air updates",
          "Open Food Facts: open-source supplement product database (used to enrich barcode scans)",
        ],
      },
      {
        heading: "6. Data Sharing",
        body: "We do not sell, trade, or rent your personal information to third parties. We share data only with the service providers listed above, solely to operate the app, and only to the minimum extent necessary. These providers are contractually obligated to keep your information confidential.",
      },
      {
        heading: "7. Your Rights",
        body: null,
        intro: "You have the right to:",
        list: [
          "Request access to the personal data we hold about you",
          "Request correction or deletion of your personal data",
          "Export your data in a portable format",
          "Delete your account and all associated data",
          "Withdraw your consent for optional features at any time",
          "Lodge a complaint with your local data protection authority",
        ],
      },
      {
        heading: "8. Data Retention",
        body: "We retain your data for as long as your account is active. If you delete your account, all personal data is permanently removed within 30 days. Anonymized, aggregated data may be retained for product improvement purposes.",
      },
      {
        heading: "9. GDPR & International Users",
        body: "HappyDose is operated from Spain and complies with the EU General Data Protection Regulation (GDPR). If you are located in the European Economic Area, you have additional rights under GDPR including the right to data portability and the right to object to processing.",
      },
      {
        heading: "10. Cookies & Local Storage",
        body: "Our website uses local storage only to remember your theme preference. The mobile app uses on-device encrypted storage for offline functionality and preferences. We do not use tracking cookies or third-party advertising cookies.",
      },
      {
        heading: "11. Children's Privacy",
        body: "HappyDose is not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe a child has provided us with personal information, please contact us and we will delete it.",
      },
      {
        heading: "12. Changes to This Policy",
        body: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the app or website after changes constitutes acceptance.",
      },
      {
        heading: "13. Contact",
        body: null,
        contactEmail: "privacy@gethappydose.app",
        contactEmailAlt: "elhussali@gmail.com",
        contactIntro:
          "If you have any questions about this privacy policy or wish to exercise your rights, please contact us at",
      },
    ],
  },

  // Terms of Service
  terms: {
    title: "Terms of Service",
    lastUpdated: "April 8, 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By creating an account or using the HappyDose application or website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      },
      {
        heading: "2. Description of Service",
        body: "HappyDose is a supplement tracking and compliance application that helps users build, manage, and stay consistent with their supplement routines. The service includes a mobile application (iOS and Android), a companion website, and supporting backend services.",
      },
      {
        heading: "3. Not Medical Advice",
        body: "HappyDose is not a medical device, healthcare provider, or substitute for professional medical advice. Supplement information, interaction warnings, and recommendations are provided for informational purposes only and are based on publicly available data and curated rules. You should always consult a qualified healthcare professional before starting, stopping, or changing any supplement regimen — especially if you have a medical condition, are pregnant, or are taking prescription medication.",
      },
      {
        heading: "4. Account Registration",
        body: "You may sign in to HappyDose using Apple, Google, or email. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information.",
      },
      {
        heading: "5. Subscription & Payments",
        body: "HappyDose offers a free trial followed by paid subscription tiers. Subscriptions are processed through Apple App Store, Google Play, or Stripe and auto-renew unless cancelled. Refunds are handled in accordance with the applicable platform's policies. We reserve the right to change pricing with reasonable notice to existing subscribers.",
      },
      {
        heading: "6. User Content",
        body: "You retain ownership of all content you create in HappyDose, including your supplement stack, intake logs, doctor profiles, notes, and any uploaded blood test results. By submitting feedback through the app, you grant us permission to use it for product improvement purposes. You may delete your content at any time.",
      },
      {
        heading: "7. User Conduct",
        body: null,
        intro: "You agree not to:",
        list: [
          "Use the service for any unlawful purpose",
          "Submit false, misleading, or harmful information",
          "Attempt to interfere with the proper operation of the service",
          "Reverse-engineer, decompile, or disassemble the application",
          "Use automated systems to access the service without permission",
          "Share your account credentials with others",
          "Use the app to make medical decisions without consulting a qualified healthcare professional",
        ],
      },
      {
        heading: "8. Health & Safety Disclaimer",
        body: "Supplement interactions, dosage information, and timing recommendations in HappyDose are sourced from manufacturer labels, public databases, and curated rules. They are not exhaustive and may not apply to your specific situation. HappyDose is not liable for any adverse effects, missed doses, or health outcomes related to your use of the app. Always read supplement labels, follow your doctor's instructions, and seek immediate medical attention if you experience an adverse reaction.",
      },
      {
        heading: "9. Intellectual Property",
        body: "All content, branding, design, and code in the HappyDose application and website are the property of HappyDose and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.",
      },
      {
        heading: "10. Limitation of Liability",
        body: 'HappyDose is provided "as is" without warranties of any kind, either express or implied. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, including but not limited to missed reminders, lost data, inaccurate interaction warnings, or health outcomes.',
      },
      {
        heading: "11. Termination",
        body: "We may suspend or terminate your account if you violate these terms. You may delete your account at any time from within the app or by contacting us. Upon termination, your data will be handled in accordance with our Privacy Policy.",
      },
      {
        heading: "12. Changes to Terms",
        body: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification. Continued use of the service after changes constitutes acceptance of the updated terms.",
      },
      {
        heading: "13. Governing Law",
        body: "These terms are governed by the laws of Spain, where HappyDose is operated. Any disputes shall be resolved in the courts of Spain, except where local consumer protection laws grant you additional rights.",
      },
      {
        heading: "14. Contact",
        body: null,
        contactEmail: "legal@gethappydose.app",
        contactEmailAlt: "elhussali@gmail.com",
        contactIntro: "For questions about these terms, please contact us at",
      },
    ],
  },

  // Delete Account
  deleteAccount: {
    title: "Delete Your Account",
    subtitle:
      "Request permanent deletion of your HappyDose account and all associated data.",
    backToHome: "← Back to home",
    inAppHeading: "In-App Deletion",
    inAppIntro:
      "The fastest way to delete your account is directly from the HappyDose app:",
    inAppSteps: [
      "Open the HappyDose app",
      "Go to the Profile tab",
      "Tap Account Settings",
      "Tap Delete Account and confirm",
    ],
    inAppFooter:
      "Your account and all associated data will be permanently deleted within 30 days.",
    emailHeading: "Request via Email",
    emailIntro: "If you cannot access the app, send a deletion request to:",
    emailPrimary: "privacy@gethappydose.app",
    emailAlt: "elhussali@gmail.com",
    emailFooter:
      "Include the email address associated with your HappyDose account in your request. We will process your deletion within 30 days and confirm via email when complete.",
    whatGetsDeletedHeading: "What Gets Deleted",
    whatGetsDeleted: [
      "Account information (email, name, profile)",
      "Your full supplement stack (supplements, dosages, schedules)",
      "All intake logs and consistency history",
      "Doctor profiles and recommendation overrides",
      "Any biometric data or blood test uploads",
      "Streaks, scores, and analytics history",
      "Notification preferences and settings",
      "All feedback and submitted content",
    ],
    retentionHeading: "Data Retention",
    retentionBody:
      "Anonymized, aggregated data may be retained for product improvement purposes. Active subscriptions should be cancelled before account deletion to avoid further charges.",
  },
} as const;
