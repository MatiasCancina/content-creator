"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type HistoryItem = {
  id: string;
  content: string;
  tone: string;
  createdAt: number;
};

export default function HistoryList({
  items,
  onSelect,
}: {
  items: HistoryItem[];
  onSelect: (content: string) => void;
}) {
  if (!items.length) return null;

  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-semibold">Historial</h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Button
              variant="ghost"
              className="w-full justify-start text-left"
              onClick={() => onSelect(item.content)}
            >
              <span className="text-sm truncate">
                [{item.tone}] {item.content.slice(0, 40)}...
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
