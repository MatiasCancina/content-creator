"use client";

import { useState } from "react";
import type { Props } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Clock, Trash2, ChevronRight, AlertTriangle, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

import type { TranslationKey } from "@/lib/translations";

const toneLabels: Record<string, { labelKey: TranslationKey; color: string }> =
  {
    neutral: { labelKey: "neutral", color: "bg-muted text-muted-foreground" },
    formal: {
      labelKey: "formal",
      color: "bg-primary/10 text-primary dark:bg-primary/20",
    },
    divertido: {
      labelKey: "fun",
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    tecnico: {
      labelKey: "technical",
      color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
    },
    ventas: {
      labelKey: "sales",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
  };

export default function HistoryList({ items, onSelect, onDelete }: Props) {
  const { t, locale } = useLanguage();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const canDelete = items.length > 1;

  return (
    <>
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
              {t("history")}
            </h3>
            <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-muted/50 dark:bg-muted/30 text-muted-foreground">
              {items.length} {items.length === 1 ? t("element") : t("elements")}
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
                          toneLabels[item.tone]?.color ||
                          toneLabels.neutral.color
                        }`}
                      >
                        {t(toneLabels[item.tone]?.labelKey || "neutral")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString(
                          locale === "es" ? "es-ES" : "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 group-hover:opacity-0 transition-all duration-300 shrink-0 mt-1" />
                </div>
              </button>

              {/* Delete button */}
              <button
                type="button"
                onClick={() => setDeletingId(item.id)}
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

      {/* Confirmation Modal */}
      {deletingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4
          bg-black/60 backdrop-blur-sm
          animate-in fade-in-0 duration-200"
          onClick={() => setDeletingId(null)}
        >
          <div
            className="relative w-full max-w-sm
            bg-white dark:bg-gray-900
            rounded-2xl shadow-2xl
            border border-gray-200 dark:border-gray-800
            animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDeletingId(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 pb-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-red-50 dark:bg-red-950/30">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("copy") === "Copiar"
                    ? "¿Eliminar elemento?"
                    : "Delete item?"}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                  {!canDelete
                    ? t("deleteMinimum")
                    : t("copy") === "Copiar"
                      ? "Esta acción no se puede deshacer. El elemento será eliminado permanentemente."
                      : "This action cannot be undone. The item will be permanently deleted."}
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 pt-0 pb-6">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl
                text-sm font-medium
                text-gray-700 dark:text-gray-300
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-750
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                {t("copy") === "Copiar" ? "Cancelar" : "Cancel"}
              </button>

              <button
                onClick={() => {
                  if (!canDelete) return;
                  onDelete(deletingId as string);
                  setDeletingId(null);
                }}
                disabled={!canDelete}
                className="flex-1 px-4 py-2.5 rounded-xl
                text-sm font-medium
                text-white
                bg-red-600 hover:bg-red-700
                dark:bg-red-600 dark:hover:bg-red-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                shadow-sm hover:shadow-md"
              >
                {t("copy") === "Copiar" ? "Eliminar" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
