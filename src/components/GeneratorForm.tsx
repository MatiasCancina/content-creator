"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "@/lib/useLocalStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import OutputCard from "./OutputCard";
import HistoryList from "./HistoryList";
import type { HistoryItem, Tone, FormData } from "@/lib/types";
import {
  Sparkles,
  Wand2,
  Package,
  FileText,
  Palette,
  PartyPopper,
  Scale,
  Briefcase,
  Wrench,
  DollarSign,
} from "lucide-react";

const toneOptions: {
  value: Tone;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "neutral", label: "Neutral", icon: Scale },
  { value: "formal", label: "Formal", icon: Briefcase },
  { value: "divertido", label: "Divertido", icon: PartyPopper },
  { value: "tecnico", label: "Técnico", icon: Wrench },
  { value: "ventas", label: "Ventas", icon: DollarSign },
];

export default function GeneratorForm() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [tone, setTone] = useState<Tone>("neutral");
  const [result, setResult] = useLocalStorage<string | null>(
    "lastOutput",
    null
  );
  const [loading, setLoading] = useState(false);

  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {
    const rafId = requestAnimationFrame(() => setHasHydrated(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(generateSchema),
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("outputHistory");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        tone,
      }),
    });
    const json = await res.json();
    setLoading(false);

    if (json.result) {
      setResult(json.result);

      // eslint-disable-next-line react-hooks/purity
      const now = Date.now();

      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        content: json.result,
        tone,
        createdAt: now,
      };

      const updatedHistory = [newItem, ...history].slice(0, 10);

      setHistory(updatedHistory);
      localStorage.setItem("outputHistory", JSON.stringify(updatedHistory));
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    if (history.length === 1) {
      alert("Debe existir al menos un elemento en el historial");
      return;
    }

    const confirmed = window.confirm(
      "¿Estás seguro de que querés eliminar este contenido del historial?"
    );

    if (!confirmed) return;

    const itemToDelete = history.find((item) => item.id === id);

    const updatedHistory = history.filter((item) => item.id !== id);

    setHistory(updatedHistory);
    localStorage.setItem("outputHistory", JSON.stringify(updatedHistory));

    if (itemToDelete && result === itemToDelete.content) {
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 px-4">
      {/* Main Generator Card */}
      <Card
        className="relative overflow-hidden p-0
          bg-card/80 dark:bg-card/60
          backdrop-blur-xl
          border border-border/50 dark:border-border/30
          shadow-2xl shadow-primary/10 dark:shadow-primary/20
          transition-all duration-500 ease-out
          hover:shadow-3xl
          animate-in fade-in-0 slide-in-from-bottom-4"
      >
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 shadow-lg shadow-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                  Content AI Generator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Genera contenido profesional para tus productos
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 dark:text-foreground/70"
              >
                <Package className="h-4 w-4 text-primary" />
                Nombre del producto
              </Label>
              <Input
                id="name"
                placeholder="PlayStation 5, iPhone 15 Pro, etc."
                {...register("name")}
                className="h-12
                  bg-secondary/30 dark:bg-secondary/20
                  border-border/50 dark:border-border/30
                  placeholder:text-muted-foreground/50
                  focus:bg-secondary/50 dark:focus:bg-secondary/30
                  focus:border-primary/50
                  transition-all duration-300"
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in-0 slide-in-from-top-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 dark:text-foreground/70"
              >
                <FileText className="h-4 w-4 text-primary" />
                Descripción
              </Label>
              <Textarea
                id="description"
                placeholder="Describe tu producto: características principales, estado, qué incluye..."
                {...register("description")}
                className="min-h-28 resize-none
                  bg-secondary/30 dark:bg-secondary/20
                  border-border/50 dark:border-border/30
                  placeholder:text-muted-foreground/50
                  focus:bg-secondary/50 dark:focus:bg-secondary/30
                  focus:border-primary/50
                  transition-all duration-300"
              />
              {errors.description && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in-0 slide-in-from-top-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Tone Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground/80 dark:text-foreground/70">
                <Palette className="h-4 w-4 text-primary" />
                Tono del contenido
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {toneOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTone(option.value)}
                    className={`group relative p-3 rounded-xl text-sm font-medium
                      border transition-all duration-300 ease-out
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                      flex flex-col items-center justify-center
                      ${
                        tone === option.value
                          ? "bg-primary/10 dark:bg-primary/20 border-primary/50 text-primary shadow-md shadow-primary/10"
                          : "bg-secondary/30 dark:bg-secondary/20 border-border/30 dark:border-border/20 text-foreground/70 hover:bg-secondary/50 dark:hover:bg-secondary/40 hover:border-border/50"
                      }`}
                  >
                    <option.icon className="text-lg mb-1 block" />
                    <span className="text-xs">{option.label}</span>
                    {tone === option.value && (
                      <div className="absolute inset-0 rounded-xl ring-2 ring-primary/30 dark:ring-primary/40 animate-in fade-in-0 zoom-in-95 duration-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold
                bg-linear-to-r from-primary to-primary/90
                hover:from-primary/90 hover:to-primary
                dark:from-primary dark:to-primary/80
                dark:hover:from-primary/90 dark:hover:to-primary/70
                text-primary-foreground
                shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30
                transition-all duration-300 ease-out
                hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Generando contenido...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Generar contenido
                </span>
              )}
            </Button>
          </form>
        </div>
      </Card>

      {/* Output */}
      {hasHydrated && result && !loading && <OutputCard text={result} />}

      {/* History */}
      {history.length > 0 && (
        <HistoryList
          items={history}
          onSelect={setResult}
          onDelete={handleDeleteHistoryItem}
        />
      )}
    </div>
  );
}
