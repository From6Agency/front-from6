"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BookCallButton } from "@/components/BookCallButton";
import { LogoHorizontal } from "@/components/brand/Logo";

const ITEMS = [
  { key: "advisory", href: "/advisory" },
  { key: "investments", href: "/investments" },
  { key: "portfolio", href: "/portfolio" },
  { key: "resources", href: "/ressources" },
  { key: "about", href: "/about" },
] as const;

/* En-tête en capsule de verre, détachée du bord : le logo, cinq entrées, la
   langue et la prise de rendez-vous. Elle prend le ton de la section sous
   elle : sombre au-dessus de la bande noire et du pied de page (toute zone
   marquée data-tone="dark"), claire ailleurs. */
export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");

  useEffect(() => setOpen(false), [pathname]);

  // Le menu ouvert est signalé sur <html> pour que le dock mobile des portes
  // (home) se range pendant qu'il est affiché.
  useEffect(() => {
    document.documentElement.dataset.menuOpen = open ? "true" : "false";
    return () => {
      delete document.documentElement.dataset.menuOpen;
    };
  }, [open]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = 80;
      const dark = Array.from(document.querySelectorAll<HTMLElement>('main [data-tone="dark"], footer[data-tone="dark"]')).some((zone) => {
        const box = zone.getBoundingClientRect();
        return box.top <= line && box.bottom >= line;
      });
      setTone(dark ? "dark" : "light");
    };
    const request = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    const late = window.setTimeout(update, 80);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.clearTimeout(late);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".capsule, .mobile-panel")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const callLabel = language === "en" ? "Book a call" : "Réserver un appel";

  const links = ITEMS.map((item) => (
    <Link key={item.key} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
      {t(`nav.${item.key}`)}
    </Link>
  ));

  return (
    <>
      <a className="skip" href="#main">
        {language === "en" ? "Skip to content" : "Aller au contenu"}
      </a>
      <header className="site-header sonho" data-tone={tone}>
        <div className="capsule">
          <Link className="brand" href="/" aria-label="From 6 Agency, accueil">
            <LogoHorizontal className="logo" />
          </Link>
          <nav className="nav" aria-label="Main">
            {links}
          </nav>
          <div className="actions">
            <div className="lang" role="group" aria-label="Language">
              <button type="button" className="lang-btn" lang="en" aria-pressed={language === "en"} aria-label="Switch to English" onClick={() => setLanguage("en")}>
                EN
              </button>
              <button type="button" className="lang-btn" lang="fr" aria-pressed={language === "fr"} aria-label="Passer en français" onClick={() => setLanguage("fr")}>
                FR
              </button>
            </div>
            <BookCallButton size="sm" icon={false} className="capsule-cta">
              {callLabel}
            </BookCallButton>
            <button type="button" className="burger" aria-expanded={open} aria-controls="menu-mobile" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="ic" width={22} height={22} strokeWidth={1.9} aria-hidden="true" /> : <Menu className="ic" width={22} height={22} strokeWidth={1.9} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div className="mobile-panel" id="menu-mobile" hidden={!open}>
          <nav aria-label="Main">{links}</nav>
          <div className="panel-call">
            <span className="panel-note tnum">{language === "en" ? "30-minute call" : "Appel de 30 minutes"}</span>
            <BookCallButton size="sm" icon={false}>
              {callLabel}
            </BookCallButton>
          </div>
        </div>
      </header>
    </>
  );
}
