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

type FormData = z.infer<typeof generateSchema>;

export default function GeneratorForm() {
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setLoading(false);

    if (json.result) {
      setResult(json.result);
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

          <Button type="submit" disabled={loading}>
            {loading ? "Generando..." : "Generar contenido"}
          </Button>
        </form>
      </Card>

      {loading && (
        <Card className="p-4 text-center animate-pulse text-lg text-gray-500">
          Generando contenido...
        </Card>
      )}

      {/* Solo renderiza OutputCard después de hidratación y si hay result */}
      {hasHydrated && result && <OutputCard text={result} />}
    </div>
  );
}
