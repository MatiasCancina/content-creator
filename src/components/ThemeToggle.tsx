"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative group overflow-hidden rounded-full 
        bg-secondary/50 hover:bg-secondary 
        dark:bg-secondary/30 dark:hover:bg-secondary/50
        border border-border/50 dark:border-border/30
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-lg hover:shadow-primary/10
        dark:hover:shadow-primary/20"
      aria-label="Cambiar tema"
    >
      <div className="relative z-10 transition-transform duration-500 ease-out">
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-amber-400 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110" />
        ) : (
          <Moon className="h-5 w-5 text-primary transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
}
