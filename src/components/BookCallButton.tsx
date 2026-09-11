"use client";

import { Calendar } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface BookCallButtonProps {
  children?: React.ReactNode;
  size?: "default" | "lg";
  variant?: "default" | "outline" | "inverted" | "ghost";
  className?: string;
}

/* Réservation d'un créneau de 30 minutes (cal.com). Bouton de marque : Signal
   plein, ou contour ; "ghost" est le contour blanc sur bande noire. */
export function BookCallButton({ children, size = "default", variant = "default", className }: BookCallButtonProps) {
  const { language } = useLanguage();
  const label = children ?? (language === "en" ? "Book a call" : "Réserver un appel");

  return (
    <button
      type="button"
      data-cal-link="from6agency/30min"
      data-cal-namespace="30min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200",
        size === "lg" ? "h-12 px-7 text-base" : "h-11 px-6 text-sm",
        variant === "default" && "bg-signal text-white hover:bg-foreground",
        variant === "outline" && "border border-border bg-transparent hover:border-foreground",
        variant === "inverted" && "bg-signal text-white hover:bg-hero-fg hover:text-hero-bg",
        variant === "ghost" && "border border-hero-fg/30 bg-transparent text-hero-fg hover:border-hero-fg",
        className,
      )}
    >
      <Calendar className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  );
}
