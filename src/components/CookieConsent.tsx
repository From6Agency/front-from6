"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const KEY = "cookie-consent";

export function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const isEn = language === "en";

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    localStorage.setItem(KEY, value);
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border bg-background/95 p-5 text-center shadow-xl backdrop-blur-md sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted-foreground">
          {isEn
            ? "We use cookies to improve your experience and measure site traffic. "
            : "Nous utilisons des cookies pour améliorer votre expérience et mesurer l'audience du site. "}
          <Link href="/privacy-policy" className="underline hover:text-foreground">
            {isEn ? "Learn more" : "En savoir plus"}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            {isEn ? "Decline" : "Refuser"}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {isEn ? "Accept" : "Accepter"}
          </button>
        </div>
      </div>
    </div>
  );
}
