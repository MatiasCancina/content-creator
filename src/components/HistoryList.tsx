import { Props } from "@/lib/types";

export default function HistoryList({ items, onSelect, onDelete }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Historial</h3>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start justify-between gap-2 border rounded-md p-3 hover:bg-gray-50"
        >
          <button
            onClick={() => onSelect(item.content)}
            className="text-left flex-1 hover:cursor-pointer"
          >
            <p className="text-sm line-clamp-2">{item.content}</p>
            <span className="text-xs text-gray-500 capitalize">
              Tono: {item.tone}
            </span>
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 text-sm font-bold hover:text-red-700 hover:cursor-pointer"
            aria-label="Eliminar"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
