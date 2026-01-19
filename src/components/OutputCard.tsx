"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClipboardCopy, Check, Sparkles } from "lucide-react";

export default function OutputCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      className="relative overflow-hidden p-0 
        bg-card/80 dark:bg-card/60
        backdrop-blur-xl
        border border-border/50 dark:border-border/30
        shadow-xl shadow-primary/5 dark:shadow-primary/10
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20
        animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary),0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary),0.08),transparent_50%)]" />

      <div className="relative z-10 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground/80 dark:text-foreground/70">
              Contenido Generado
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyText}
            className="group relative overflow-hidden
              bg-secondary/50 hover:bg-secondary dark:bg-secondary/30 dark:hover:bg-secondary/50
              border-border/50 dark:border-border/30
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-md"
          >
            <span className="relative z-10 flex items-center gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-accent" />
                  <span className="text-accent font-medium">Copiado</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>Copiar</span>
                </>
              )}
            </span>
          </Button>
        </div>

        {/* Content */}
        <div
          className="whitespace-pre-line text-foreground/90 dark:text-foreground/85
            leading-relaxed text-base
            p-4 rounded-xl
            bg-muted/30 dark:bg-muted/20
            border border-border/30 dark:border-border/20"
        >
          {text}
        </div>
      </div>
    </Card>
  );
}
