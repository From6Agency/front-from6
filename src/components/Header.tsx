"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BookCallButton } from "@/components/BookCallButton";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "advisory", href: "/advisory" },
  { key: "investments", href: "/investments" },
  { key: "media", href: "/media" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
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

  // Seule la home a un hero sombre en fond de header : tant qu'on n'a pas
  // scrollé sur cette page-là, le texte doit être clair pour rester lisible
  // sur ce fond, contrairement aux autres pages (fond clair dès le haut).
  const onDarkHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Trois zones type Aubier : logo à gauche, nav centrée, CTA à droite,
          plein largeur (pas de capsule flottante). */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="FROM 6 AGENCY" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/brand/logo-f6a.png"
            alt=""
            width={30}
            height={30}
            className={cn("rounded-md transition-[filter] duration-300", onDarkHero && "invert")}
            priority
          />
          <span className={cn("text-sm font-medium tracking-tight transition-colors duration-300", onDarkHero && "text-hero-fg")}>
            FROM 6 AGENCY
          </span>
        </Link>

        <nav
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 text-sm transition-colors duration-300 lg:flex",
            onDarkHero ? "text-hero-fg/75" : "text-muted-foreground",
          )}
        >
          {ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 transition-colors duration-200",
                  onDarkHero ? "hover:bg-hero-fg/10 hover:text-hero-fg" : "hover:bg-accent hover:text-foreground",
                  active && (onDarkHero ? "bg-hero-fg/10 text-hero-fg" : "bg-accent text-foreground"),
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className={cn(
              "hidden items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium transition-colors duration-300 sm:flex",
              onDarkHero ? "text-hero-fg/75 hover:bg-hero-fg/10 hover:text-hero-fg" : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            {language.toUpperCase()}
          </button>

          <BookCallButton variant={onDarkHero ? "inverted" : "default"} className="!h-9 !px-3 !text-xs sm:!px-4 sm:!text-sm">
            {language === "en" ? "Book a call" : "Réserver un appel"}
          </BookCallButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex items-center justify-center rounded-full p-2.5 transition-colors duration-300 lg:hidden",
              onDarkHero ? "text-hero-fg hover:bg-hero-fg/10" : "text-foreground hover:bg-accent",
            )}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 px-6 py-3">
            {ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base transition-colors hover:bg-accent",
                    active ? "bg-accent font-medium text-foreground" : "text-foreground/85",
                  )}
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
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent"
            >
              <Globe className="h-3.5 w-3.5" />
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
