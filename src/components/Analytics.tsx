"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "cookie-consent";

// Ne charge Google Analytics qu'une fois le consentement donné (RGPD :
// pas de cookie de mesure d'audience avant accord explicite), et réagit
// en direct si l'utilisateur clique "Accepter" sans recharger la page.
export function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => setEnabled(localStorage.getItem(KEY) === "accepted");
    check();
    window.addEventListener("cookie-consent-changed", check);
    return () => window.removeEventListener("cookie-consent-changed", check);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WCGGK530BM" strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-WCGGK530BM');`}
      </Script>
    </>
  );
}
