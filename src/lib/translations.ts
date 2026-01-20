export type Locale = "es" | "en";

export const translations = {
    es: {
        // Header
        title: "Generador de Contenido IA",
        subtitle: "Genera contenido profesional para tus productos",

        // Form labels
        productName: "Nombre del producto",
        productPlaceholder: "PlayStation 5, iPhone 15 Pro, etc.",
        description: "Descripcion",
        descriptionPlaceholder:
            "Describe tu producto: caracteristicas principales, estado, que incluye...",
        contentTone: "Tono del contenido",

        // Tones
        neutral: "Neutral",
        formal: "Formal",
        fun: "Divertido",
        technical: "Tecnico",
        sales: "Ventas",

        // Buttons
        generate: "Generar contenido",
        generating: "Generando contenido...",
        copy: "Copiar",
        copied: "Copiado",
        cancel: "Cancelar",
        delete: "Eliminar",

        // Output
        generatedContent: "Contenido Generado",

        // History
        history: "Historial",
        element: "elemento",
        elements: "elementos",
        deleteConfirm: "Estas seguro de que queres eliminar este contenido del historial?",
        deleteMinimum: "Debe existir al menos un elemento en el historial",
        deleteSuccess: "Elemento eliminado exitosamente",
        deleteTitle: "¿Eliminar elemento?",
        deleteDescription: "Esta acción no se puede deshacer. El elemento será eliminado permanentemente.",

        // Validation
        nameRequired: "El nombre es requerido",
        descriptionRequired: "La descripcion es requerida",
    },
    en: {
        // Header
        title: "Content AI Generator",
        subtitle: "Generate professional content for your products",

        // Form labels
        productName: "Product name",
        productPlaceholder: "PlayStation 5, iPhone 15 Pro, etc.",
        description: "Description",
        descriptionPlaceholder:
            "Describe your product: main features, condition, what's included...",
        contentTone: "Content tone",

        // Tones
        neutral: "Neutral",
        formal: "Formal",
        fun: "Fun",
        technical: "Technical",
        sales: "Sales",

        // Buttons
        generate: "Generate content",
        generating: "Generating content...",
        copy: "Copy",
        copied: "Copied",
        cancel: "Cancel",
        delete: "Delete",

        // Output
        generatedContent: "Generated Content",

        // History
        history: "History",
        element: "item",
        elements: "items",
        deleteConfirm: "Are you sure you want to delete this content from history?",
        deleteMinimum: "There must be at least one item in the history",
        deleteSuccess: "Item deleted successfully",
        deleteTitle: "Delete item?",
        deleteDescription: "This action cannot be undone. The item will be permanently deleted.",

        // Validation
        nameRequired: "Name is required",
        descriptionRequired: "Description is required",
    },
} as const;

export type TranslationKey = keyof (typeof translations)["es"];
