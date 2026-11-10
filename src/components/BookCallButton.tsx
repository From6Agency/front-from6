"use client";

import { Calendar } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Cta, type CtaVariant } from "@/components/Cta";

interface BookCallButtonProps {
  children?: React.ReactNode;
  size?: "default" | "lg" | "sm";
  variant?: "default" | "outline" | "inverted" | "ghost";
  /** L'icône de calendrier ; la capsule de l'en-tête s'en passe. */
  icon?: boolean;
  className?: string;
}

const VARIANT: Record<NonNullable<BookCallButtonProps["variant"]>, CtaVariant> = {
  default: "ink",
  outline: "soft",
  inverted: "paper",
  ghost: "glass",
};

/* Réservation d'un créneau de 30 minutes (cal.com), en pilule : Ink qui se
   remplit de Signal, ou verre sur la bande noire ("ghost"). */
export function BookCallButton({ children, size = "default", variant = "default", icon = true, className }: BookCallButtonProps) {
  const { language } = useLanguage();
  const label = children ?? (language === "en" ? "Book a call" : "Réserver un appel");

  return (
    <Cta
      variant={VARIANT[variant]}
      size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
      className={className}
      attrs={{
        "data-cal-link": "from6agency/30min",
        "data-cal-namespace": "30min",
        "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
      }}
    >
      {icon && <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />}
      {label}
    </Cta>
  );
}
