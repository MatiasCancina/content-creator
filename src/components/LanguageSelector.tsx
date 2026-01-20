"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { Locale } from "@/lib/translations";
import { Globe } from "lucide-react";
import clsx from "clsx";

const languages: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50 dark:bg-secondary/30 border border-border/30 dark:border-border/20 shadow-sm">
      <div className="p-1.5 text-muted-foreground hidden sm:block">
        <Globe className=" h-4 w-4" />
      </div>
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLocale(lang.code)}
          className={clsx(
            "relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            locale === lang.code
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/80 dark:hover:bg-secondary/50",
          )}
        >
          <span className="flex items-center gap-1.5">
            <span>{lang.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
