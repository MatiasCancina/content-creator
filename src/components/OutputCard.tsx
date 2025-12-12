"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";

export default function OutputCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 relative space-y-4 whitespace-pre-line">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={copyText}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Copiado
            </>
          ) : (
            <>
              <ClipboardCopy className="mr-2 h-4 w-4" /> Copiar
            </>
          )}
        </Button>
      </div>
      
      <p>{text}</p>
    </Card>
  );
}
