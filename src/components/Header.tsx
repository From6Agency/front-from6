"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
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
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="w-full max-w-3xl">
        {/* Capsule flottante : nav fixe, centrée, fond translucide + flou. */}
        <div className="flex items-center justify-between gap-2 rounded-full border border-border/70 bg-background/70 py-2 pl-3 pr-2 shadow-lg shadow-black/[0.04] backdrop-blur-xl sm:gap-4 sm:pl-4">
          <Link href="/" aria-label="FROM 6 AGENCY" className="flex shrink-0 items-center gap-2">
            <Image src="/brand/logo-f6a.png" alt="" width={28} height={28} className="rounded-md dark:invert" priority />
          </Link>

          <nav className="hidden items-center gap-0.5 text-sm text-muted-foreground lg:flex">
            {ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 transition-colors duration-200 hover:bg-accent hover:text-foreground",
                    active && "bg-accent text-foreground",
                  )}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "fr" : "en")}
              className="hidden items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground sm:flex"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
              {language.toUpperCase()}
            </button>

            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground sm:flex"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            <div className="hidden lg:block">
              <BookCallButton className="!h-9 !px-4 !text-sm">
                {language === "en" ? "Book a call" : "Réserver un appel"}
              </BookCallButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center justify-center rounded-full p-2.5 text-foreground hover:bg-accent lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-border/70 bg-background/95 p-2 shadow-lg shadow-black/[0.06] backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-0.5">
              {ITEMS.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-base transition-colors hover:bg-accent",
                      active ? "bg-accent font-medium text-foreground" : "text-foreground/85",
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-1 flex items-center justify-between gap-2 border-t border-border/70 px-2 pt-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                  className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language.toUpperCase()}
                </button>
                {mounted && (
                  <button
                    type="button"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full p-2.5 text-muted-foreground hover:bg-accent"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                )}
              </div>
              <BookCallButton className="!h-10 !px-5 !text-sm" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
