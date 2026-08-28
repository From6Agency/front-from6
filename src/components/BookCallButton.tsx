"use client";

import { Calendar } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface BookCallButtonProps {
  children?: React.ReactNode;
  size?: "default" | "lg";
  variant?: "default" | "outline" | "inverted";
  className?: string;
}

export function BookCallButton({ children, size = "default", variant = "default", className }: BookCallButtonProps) {
  const { language } = useLanguage();
  const label = children ?? (language === "en" ? "Book a Call" : "Réserver un appel");

  return (
    <button
      type="button"
      data-cal-link="from6agency/30min"
      data-cal-namespace="30min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors cursor-pointer",
        size === "lg" ? "h-12 px-7 text-base" : "h-10 px-5 text-sm",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary-hover",
        variant === "outline" && "border border-border bg-transparent hover:bg-accent",
        // Toujours clair sur fond sombre : sections hero/CTA restent noires
        // quel que soit le thème du site, contrairement à bg-primary.
        variant === "inverted" && "bg-hero-fg text-hero-bg hover:bg-hero-fg/85",
        className,
      )}
    >
      <Calendar className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} />
      {label}
    </button>
  );
}
