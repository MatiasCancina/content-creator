import GeneratorForm from "@/components/GeneratorForm";

export default function Home() {
  return (
    <main
      className="min-h-screen py-8 md:py-12 lg:py-16
        bg-linear-to-br from-background via-background to-secondary/20
        dark:from-background dark:via-background dark:to-primary/5
        relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 
            bg-primary/5 dark:bg-primary/10 
            rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 
            bg-accent/5 dark:bg-accent/10 
            rounded-full blur-3xl"
        />
        <div
          className="absolute top-1/2 left-0 w-64 h-64 
            bg-secondary/30 dark:bg-secondary/10 
            rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 
          bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-size-[64px_64px]
          pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">
        <GeneratorForm />
      </div>
    </main>
  );
}
