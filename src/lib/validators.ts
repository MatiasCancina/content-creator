import { z } from "zod";

export const generateSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción es muy corta"),
});
