import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { generateSchema } from "@/lib/validators";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = generateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, description } = parsed.data;

        const prompt = `
      Genera contenido optimizado para un producto.
      Producto: ${name}.
      Descripción: ${description}.

      Necesito:
      - Un título atractivo
      - Una descripción SEO-friendly
      - 5 bullet points
      - Categoría sugerida
    `;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
        });


        const result = completion.choices[0].message.content;

        return NextResponse.json({ result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
