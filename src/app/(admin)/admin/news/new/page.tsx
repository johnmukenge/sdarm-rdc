import { NewsForm } from "@/components/news-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nouvelle Actualité | Admin" };

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nouvelle Actualité</h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Créez une nouvelle actualité avec une image et du texte
        </p>
      </div>
      <NewsForm />
    </div>
  );
}
