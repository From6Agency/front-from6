"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
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

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seule la home a un hero noir sous le header : tant qu'on n'a pas
  // scrollé sur cette page, le logo et la navigation passent en blanc.
  const onDarkHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/95 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          aria-label="From 6 Agency, accueil"
          className={cn("flex shrink-0 items-center transition-colors duration-300", onDarkHero ? "text-hero-fg" : "text-foreground")}
        >
          <LogoHorizontal width={150} />
        </Link>

        <nav
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-sm lg:flex",
            onDarkHero ? "text-hero-fg" : "text-foreground",
          )}
          aria-label="Main"
        >
          {ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors duration-200",
                  onDarkHero ? "hover:text-signal-soft" : "hover:text-signal",
                  active && (onDarkHero ? "text-signal-soft" : "text-signal"),
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className={cn(
              "hidden items-center gap-1.5 px-2.5 py-2 text-xs font-medium transition-colors duration-300 sm:flex",
              onDarkHero ? "text-hero-fg/80 hover:text-hero-fg" : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            {language.toUpperCase()}
          </button>

          <BookCallButton variant={onDarkHero ? "inverted" : "default"} className="!h-9 !px-4 !text-xs sm:!text-sm">
            {language === "en" ? "Book a call" : "Réserver un appel"}
          </BookCallButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn("flex items-center justify-center p-2 transition-colors duration-300 lg:hidden", onDarkHero ? "text-hero-fg" : "text-foreground")}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-2" aria-label="Main">
            {ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("border-b border-border py-3.5 text-base transition-colors last:border-b-0", active ? "text-signal" : "text-foreground hover:text-signal")}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>
          <div className="mx-auto flex max-w-7xl items-center border-t border-border px-6 py-3">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              className="flex items-center gap-1.5 px-2 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
