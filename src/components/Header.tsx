"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BookCallButton } from "@/components/BookCallButton";
import { LogoHorizontal } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "advisory", href: "/advisory" },
  { key: "investments", href: "/investments" },
  { key: "portfolio", href: "/portfolio" },
  { key: "resources", href: "/ressources" },
  { key: "about", href: "/about" },
] as const;

/* En-tête en capsule flottante, détachée du bord : le logo, cinq entrées, la
   langue et la prise de rendez-vous. Toujours sur fond Paper, quelle que soit
   la page ; le menu mobile s'ouvre en panneau carré sous la capsule. */
export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Le menu ouvert est signalé sur <html> pour que la barre mobile des portes
  // (home) se range pendant qu'il est affiché.
  useEffect(() => {
    document.documentElement.dataset.menuOpen = open ? "true" : "false";
    return () => {
      delete document.documentElement.dataset.menuOpen;
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-background/90 py-2 pl-4 pr-2 backdrop-blur-md md:pl-6 md:pr-3">
        <Link href="/" aria-label="From 6 Agency, accueil" className="flex shrink-0 items-center text-foreground">
          <LogoHorizontal width={120} className="md:hidden" />
          <LogoHorizontal width={136} className="hidden md:block" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex" aria-label="Main">
          {ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn("transition-colors duration-200 hover:text-signal", isActive(item.href) && "text-signal")}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="tnum flex h-9 items-center gap-1 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label={language === "en" ? "Passer en français" : "Switch to English"}
          >
            <span className={cn(language === "en" && "text-foreground")}>EN</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span className={cn(language === "fr" && "text-foreground")}>FR</span>
          </button>

          <BookCallButton className="!hidden !h-9 !px-4 !text-sm md:!inline-flex">{language === "en" ? "Book a call" : "Réserver un appel"}</BookCallButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl border border-border bg-background lg:hidden">
          <nav className="flex flex-col px-5 py-2" aria-label="Main">
            {ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn("border-b border-border py-3.5 text-base font-medium transition-colors last:border-b-0", isActive(item.href) ? "text-signal" : "text-foreground hover:text-signal")}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <span className="text-xs text-muted-foreground">{language === "en" ? "30-minute call" : "Appel de 30 minutes"}</span>
            <BookCallButton className="!h-9 !px-4 !text-sm">{language === "en" ? "Book a call" : "Réserver un appel"}</BookCallButton>
          </div>
        </div>
      )}
    </header>
  );
}
