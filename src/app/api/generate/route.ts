import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { generateApiSchema } from "@/lib/validators";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = generateApiSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, description, tone = "neutral" } = parsed.data;
        const { locale = "es" } = body as { locale?: string };

        const toneInstructions: Record<string, Record<string, string>> = {
            es: {
                neutral: "con un tono neutral y profesional",
                formal: "con un tono formal y corporativo",
                divertido: "con un tono divertido y casual",
                tecnico: "con un tono técnico y detallado",
                ventas: "con un tono persuasivo orientado a las ventas",
            },
            en: {
                neutral: "with a neutral and professional tone",
                formal: "with a formal and corporate tone",
                divertido: "with a fun and casual tone",
                tecnico: "with a technical and detailed tone",
                ventas: "with a persuasive sales-oriented tone",
            },
        };

        const prompts: Record<string, string> = {
            es: `Genera contenido de marketing para el siguiente producto ${toneInstructions.es[tone] || toneInstructions.es.neutral
                }.

Producto: ${name}
Descripcion: ${description}

Responde UNICAMENTE con el siguiente formato (sin introduccion ni comentarios adicionales):

**Titulo:** [titulo atractivo y conciso]

**Descripcion:** [descripcion detallada de 2-3 oraciones]

**Caracteristicas principales:**
- [caracteristica 1]
- [caracteristica 2]
- [caracteristica 3]
- [caracteristica 4]
- [caracteristica 5]

**Categoria sugerida:** [categoria del producto]`,
            en: `Generate marketing content for the following product ${toneInstructions.en[tone] || toneInstructions.en.neutral
                }.

Product: ${name}
Description: ${description}

Respond ONLY with the following format (no introduction or additional comments):

**Title:** [catchy and concise title]

**Description:** [detailed description of 2-3 sentences]

**Key Features:**
- [feature 1]
- [feature 2]
- [feature 3]
- [feature 4]
- [feature 5]

**Suggested Category:** [product category]`,
        };

        const prompt = prompts[locale] || prompts.es;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
        });

        const result = completion.choices?.[0]?.message?.content ?? "";

        return NextResponse.json({ result });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
