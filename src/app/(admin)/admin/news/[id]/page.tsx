import { NewsForm } from "@/components/news-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Éditer Actualité | Admin" };

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const news = await prisma.news.findUnique({
    where: { id },
  }).catch(() => null);

  if (!news) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Éditer Actualité</h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Modifiez les détails de cette actualité
        </p>
      </div>
      <NewsForm initialData={news} isEditing />
    </div>
  );
}
