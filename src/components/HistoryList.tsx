"use client";

import type { Props } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Clock, Trash2, ChevronRight } from "lucide-react";

const toneLabels: Record<string, { label: string; color: string }> = {
  neutral: { label: "Neutral", color: "bg-muted text-muted-foreground" },
  formal: {
    label: "Formal",
    color: "bg-primary/10 text-primary dark:bg-primary/20",
  },
  divertido: {
    label: "Divertido",
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  tecnico: {
    label: "Técnico",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  ventas: {
    label: "Ventas",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
};

export default function HistoryList({ items, onSelect, onDelete }: Props) {
  return (
    <Card
      className="relative overflow-hidden p-0
        bg-card/80 dark:bg-card/60
        backdrop-blur-xl
        border border-border/50 dark:border-border/30
        shadow-lg shadow-primary/5 dark:shadow-primary/10
        animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-150"
    >
      {/* Header */}
      <div className="p-4 pb-2 border-b border-border/30 dark:border-border/20">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-secondary dark:bg-secondary/50">
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground/90 dark:text-foreground/80">
            Historial
          </h3>
          <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-muted/50 dark:bg-muted/30 text-muted-foreground">
            {items.length} {items.length === 1 ? "elemento" : "elementos"}
          </span>
        </div>
      </div>

      {/* List */}
      <div className="p-2 space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden
              bg-secondary/30 dark:bg-secondary/20
              border border-transparent
              hover:border-primary/20 dark:hover:border-primary/30
              hover:bg-secondary/50 dark:hover:bg-secondary/40
              transition-all duration-300 ease-out
              hover:shadow-md hover:shadow-primary/5"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <button
              type="button"
              onClick={() => onSelect(item.content)}
              className="w-full p-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/80 dark:text-foreground/75 line-clamp-2 leading-relaxed">
                    {item.content}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        toneLabels[item.tone]?.color || toneLabels.neutral.color
                      }`}
                    >
                      {toneLabels[item.tone]?.label || item.tone}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 group-hover:opacity-0 transition-all duration-300 shrink-0 mt-1" />
              </div>
            </button>

            {/* Delete button */}
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="absolute top-2 right-2 p-2 rounded-lg
                opacity-0 group-hover:opacity-100
                bg-destructive/10 hover:bg-destructive/20
                dark:bg-destructive/20 dark:hover:bg-destructive/30
                text-destructive
                transition-all duration-200 ease-out
                hover:scale-110
                focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50"
              aria-label="Eliminar del historial"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
