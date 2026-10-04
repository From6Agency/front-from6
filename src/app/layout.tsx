import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalEmbed } from "@/components/CalEmbed";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";

// Redesign d'octobre 2026 : une seule famille, Archivo en variable (graisse et
// largeur), serrée pour les titres, droite pour le texte. Le logo reste le SVG
// officiel du kit, il ne dépend pas de la police.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Domaine cible réel (from6agency.com), pas le sous-domaine Vercel de preview :
// canonical/OG doivent pointer vers l'URL de production finale, pas un
// throwaway *.vercel.app, sans quoi Google/les crawlers IA indexeraient la
// mauvaise adresse. À ajuster si le nom de domaine final diffère.
const SITE_URL = "https://from6agency.com";
const TITLE = "FROM 6 AGENCY | Franck Berthelot, entrepreneur and investor";
const DESCRIPTION =
  "From 6 connects companies to Darix's revenue expertise and supports founders through advisory and investment.";

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
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "32x32" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "FROM 6 AGENCY",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    images: [{ url: "/og/f6-og.png", width: 1200, height: 630, alt: "From 6 Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og/f6-og.png"],
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
      logo: `${SITE_URL}/brand/png/f6-logo-horizontal-black-800.png`,
      description: DESCRIPTION,
      founder: { "@type": "Person", name: "Franck Berthelot", jobTitle: "Entrepreneur & Investor" },
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
      description: "Advisory and investment for B2B SaaS founders, connecting revenue systems needs to Darix's operational team.",
      areaServed: "Worldwide",
      provider: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
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
