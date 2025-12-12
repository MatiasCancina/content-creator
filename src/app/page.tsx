import GeneratorForm from "@/components/GeneratorForm";

export default function Home() {
  return (
    <main className="min-h-screen py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Generador de Contenido con IA
      </h1>

      <GeneratorForm />
    </main>
  );
}
