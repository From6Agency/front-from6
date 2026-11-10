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
    <div className="cookie-sheet fixed inset-x-0 bottom-0 z-[60] p-4 transition-[bottom] duration-300 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[28px] bg-background/90 p-5 text-center shadow-[var(--shadow-lift)] backdrop-blur-md sm:pl-7 sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted-foreground">
          {isEn
            ? "We use cookies to improve your experience and measure site traffic. "
            : "Nous utilisons des cookies pour améliorer votre expérience et mesurer l'audience du site. "}
          <Link href="/privacy-policy" className="text-signal underline underline-offset-2 transition-colors hover:text-foreground">
            {isEn ? "Learn more" : "En savoir plus"}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-full bg-foreground/[0.06] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-foreground/[0.12]"
          >
            {isEn ? "Decline" : "Refuser"}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-signal"
          >
            {isEn ? "Accept" : "Accepter"}
          </button>
        </div>
      </div>
    </div>
  );
}
