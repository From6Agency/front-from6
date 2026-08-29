import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalEmbed } from "@/components/CalEmbed";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Domaine cible réel (from6agency.com), pas le sous-domaine Vercel de preview :
// canonical/OG doivent pointer vers l'URL de production finale, pas un
// throwaway *.vercel.app, sans quoi Google/les crawlers IA indexeraient la
// mauvaise adresse. À ajuster si le nom de domaine final diffère.
const SITE_URL = "https://from6agency.com";
const TITLE = "FROM 6 AGENCY | Advisory, Investments & Intelligence for B2B SaaS";
const DESCRIPTION =
  "FROM 6 partners with B2B SaaS teams on revenue, business architecture, and AI-powered workflows, from advisory to investment.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · FROM 6 AGENCY" },
  description: DESCRIPTION,
  applicationName: "FROM 6 AGENCY",
  keywords: [
    "RevOps advisory",
    "Lead-to-Cash architecture",
    "Salesforce CPQ consultant",
    "B2B SaaS revenue operations",
    "revenue platform audit",
    "B2B SaaS investor",
  ],
  authors: [{ name: "Franck Berthelot" }],
  creator: "FROM 6 AGENCY",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "FROM 6 AGENCY",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    images: [{ url: "/og-from6.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-from6.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "hiBCDMZGyFh4d5LfU_Z7MjfFGhmBQ1lCPrz-O7sKlRo",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "FROM 6 AGENCY",
      legalName: "FROM 6 AGENCY",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-f6a.png`,
      description: DESCRIPTION,
      founder: { "@type": "Person", name: "Franck Berthelot", jobTitle: "Lead-to-Cash Architect" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "25 rue du Clos",
        postalCode: "75020",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      sameAs: ["https://www.linkedin.com/company/from-6-agency/", "https://www.linkedin.com/in/franckberthelot"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "FROM 6 AGENCY",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "FROM 6 AGENCY",
      description: "Strategic advisory for B2B SaaS revenue operations, business architecture, and AI-powered workflows.",
      areaServed: "Worldwide",
      provider: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <Analytics />
        <CalEmbed />
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
