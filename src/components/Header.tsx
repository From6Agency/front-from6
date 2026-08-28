"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "home", href: "/" },
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/logo-f6a.png" alt="FROM 6 AGENCY" width={36} height={36} className="rounded-md dark:invert" priority />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm transition-colors hover:bg-accent",
                  active ? "bg-accent font-medium" : "text-foreground/80",
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium hover:bg-accent"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            {language.toUpperCase()}
          </button>

          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 hover:bg-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 hover:bg-accent md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {ITEMS.map((item) => (
              <Link key={item.key} href={item.href} className="rounded-lg px-3 py-2.5 text-base hover:bg-accent">
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
