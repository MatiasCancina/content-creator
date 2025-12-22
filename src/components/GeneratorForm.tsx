"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "@/lib/useLocalStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import OutputCard from "./OutputCard";
import HistoryList from "./HistoryList";

type HistoryItem = {
  id: string;
  content: string;
  tone: string;
  createdAt: number;
};
type Tone = "neutral" | "formal" | "divertido" | "tecnico" | "ventas";
type FormData = z.infer<typeof generateSchema>;

export default function GeneratorForm() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [tone, setTone] = useState<Tone>("neutral");
  const [result, setResult] = useLocalStorage<string | null>(
    "lastOutput",
    null
  );
  const [loading, setLoading] = useState(false);

  // Flag para indicar que ya ocurrió la hidratación del cliente
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
    } catch {}
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
    <div className="w-full max-w-xl mx-auto space-y-6">
      <Card className="p-6 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Nombre del producto</label>
            <Input placeholder="PlayStation 5" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label>Descripción</label>
            <Textarea
              placeholder="Consola nueva, incluye control..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label>Tono</label>
            <select
              className="w-full border rounded-md p-2"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
            >
              <option value="neutral">Neutral</option>
              <option value="formal">Formal</option>
              <option value="divertido">Divertido</option>
              <option value="tecnico">Técnico</option>
              <option value="ventas">Orientado a ventas</option>
            </select>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Generando Contenido..." : "Generar contenido"}
          </Button>
        </form>
      </Card>

      {/* Solo renderiza OutputCard después de hidratación y si hay result */}
      {hasHydrated && result && !loading && <OutputCard text={result} />}
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
