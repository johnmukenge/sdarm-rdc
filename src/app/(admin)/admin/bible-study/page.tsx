import Link from "next/link";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demandes d'Étude Biblique | Admin",
};

const statusLabel: Record<string, string> = {
  PENDING: "En attente",
  CONTACTED: "Contacté",
  COMPLETED: "Terminé",
  CANCELLED: "Annulé",
};
const statusVariant: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "default",
  CONTACTED: "secondary",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

export default async function AdminBibleStudyPage() {
  const requests = await prisma.bibleStudyRequest
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  const pending = requests.filter((r) => r.status === "PENDING").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Demandes d&apos;Étude Biblique
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            {requests.length} demande(s) —{" "}
            {pending > 0 && (
              <span className="text-amber-600 font-semibold">
                {pending} en attente
              </span>
            )}
          </p>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">
                  Nom
                </th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))] hidden md:table-cell">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))] hidden lg:table-cell">
                  Pays / Ville
                </th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))] hidden md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">
                  Statut
                </th>
                <th className="px-4 py-3 text-right font-medium text-[hsl(var(--muted-foreground))]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]"
                  >
                    Aucune demande reçue.
                  </td>
                </tr>
              ) : (
                requests.map((req: any) => (
                  <tr
                    key={req.id}
                    className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">
                      {req.lastName} {req.firstName}
                    </td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden md:table-cell">
                      <a
                        href={`mailto:${req.email}`}
                        className="hover:text-[hsl(var(--primary))]"
                      >
                        {req.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden lg:table-cell">
                      {req.country}, {req.city}
                    </td>
                    <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] hidden md:table-cell">
                      {formatDate(req.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[req.status]}>
                        {statusLabel[req.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          title="Détails"
                        >
                          <Link href={`/admin/bible-study/${req.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
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
