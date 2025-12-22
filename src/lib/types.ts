import z from "zod";
import { generateSchema } from "./validators";

export type HistoryItem = {
  id: string;
  content: string;
  tone: string;
  createdAt: number;
};

export type Tone = "neutral" | "formal" | "divertido" | "tecnico" | "ventas";

export type FormData = z.infer<typeof generateSchema>;

export type Props = {
    items: HistoryItem[];
    onSelect: (content: string) => void;
    onDelete: (id: string) => void;
};