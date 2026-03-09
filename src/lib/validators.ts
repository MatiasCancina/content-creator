import { z } from "zod";
import { translations, type Locale } from "./translations";

export function getGenerateSchema(locale: Locale) {
  return z.object({
    name: z.string().min(2, translations[locale].nameRequired),
    description: z.string().min(10, translations[locale].descriptionRequired),
  });
}

export const generateApiSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  tone: z.enum(["neutral", "formal", "fun", "technical", "sales"]),
});