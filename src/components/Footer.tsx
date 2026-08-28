"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo-f6a.png" alt="FROM 6 AGENCY" width={24} height={24} className="rounded dark:invert" />
          <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
        </div>

        <a
          href="https://www.linkedin.com/company/from-6-agency/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/legal-notice" className="hover:text-foreground">
            {t("footer.legal")}
          </Link>
          <span className="text-border">|</span>
          <Link href="/privacy-policy" className="hover:text-foreground">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
