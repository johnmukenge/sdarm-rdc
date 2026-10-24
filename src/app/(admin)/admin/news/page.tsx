import Link from "next/link";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { DeleteNewsButton } from "@/components/delete-news-button";

export const metadata: Metadata = { title: "Gérer les Actualités | Admin" };

const statusLabel: Record<string, string> = {
  DRAFT: "Brouillon",
  PUBLISHED: "Publié",
  ARCHIVED: "Archivé",
};
const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  DRAFT: "outline",
  PUBLISHED: "default",
  ARCHIVED: "secondary",
};

export default async function AdminNewsPage() {
  const news = await prisma.news
    .findMany({ include: { author: true }, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Actualités</h1>
          <p className="text-[hsl(var(--muted-foreground))]">{news.length} article(s)</p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new"><Plus className="mr-2 h-4 w-4" /> Nouvelle Actualité</Link>
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Titre</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))] hidden md:table-cell">Auteur</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))] hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">Statut</th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">
                    Aucune actualité. <Link href="/admin/news/new" className="text-[hsl(var(--primary))] hover:underline">Créer la première</Link>
                  </td>
                </tr>
              ) : (
                news.map((item: any) => (
                  <tr key={item.id} className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors">
                    <td className="px-4 py-3 font-medium max-w-xs truncate">{item.title}</td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden md:table-cell">{item.author.name}</td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden md:table-cell">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon" title="Voir">
                          <Link href={`/actualites/${item.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="icon" title="Modifier">
                          <Link href={`/admin/news/${item.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteNewsButton newsId={item.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
